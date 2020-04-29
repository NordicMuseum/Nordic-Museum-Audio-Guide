import { Platform } from "react-native";

import Sound from "react-native-sound";

import i18n from "i18n-js";

import {
  audioDidFinishPlaying,
  updateAudioCurrentTime
} from "../actions/audio";

class AudioActor {
  constructor(store) {
    this._store = store;
    this._dispatch = store.dispatch;
    this._watchAudioTimeInterval;
    this._loadedSound;

    // Enable playback in silence mode
    Sound.setCategory("Playback");
  }

  loadAudio = ({
    audioID,
    audioUUID,
    localeOrder,
    playAudioAfterLoad,
    autoPlay
  }) => {
    if (localeOrder == null) {
      // Fallback to default locale, else play audio in Swedish.
      localeOrder = [i18n.locale, i18n.defaultLocale, "sv"];
    }

    return new Promise((resolve, reject) => {
      const locale = localeOrder.shift();
      const audioUrl = Platform.select({
        ios: `audio/${audioID}/${audioID}${locale}.mp3`,
        android: `audio_${audioID}${locale.toLowerCase()}.mp3`
      });

      this.unloadAudio();
      this._loadedSound = new Sound(audioUrl, Sound.MAIN_BUNDLE, error => {
        if (error) {
          this.unloadAudio();

          if (localeOrder.length === 0) {
            reject(`Cannot load file: ${audioUrl}`);
            return;
          }

          resolve(
            this.loadAudio({
              audioID,
              localeOrder,
              playAudioAfterLoad
            })
          );
        }

        clearInterval(this._watchAudioTimeInterval);
        this._watchAudioTimeInterval = setInterval(() => {
          if (this._loadedSound) {
            this._loadedSound.getCurrentTime(currentTime => {
              this._dispatch(
                updateAudioCurrentTime(audioUUID, Math.round(currentTime))
              );
            });
          }
        }, 250);

        const duration = Math.round(this._loadedSound.getDuration());
        if (playAudioAfterLoad) {
          this._loadedSound.play(success => {
            if (success) {
              this._dispatch(
                audioDidFinishPlaying(audioUUID, duration, autoPlay)
              );
            }
          });
        }

        resolve({
          locale,
          duration
        });
      });
    });
  };

  togglePlayPauseAudio = () => {
    if (this._loadedSound) {
      if (this._loadedSound.isPlaying()) {
        this._loadedSound.pause();
      } else {
        this._loadedSound.play();
      }
    }
  };

  playAudio = () => {
    if (this._loadedSound) {
      this._loadedSound.play();
    }
  };

  pauseAudio = () => {
    if (this._loadedSound) {
      this._loadedSound.pause();
    }
  };

  replayAudio = () => {
    if (this._loadedSound) {
      this._loadedSound.setCurrentTime(0.0);
      this._loadedSound.play();
    }
  };

  unloadAudio = () => {
    if (this._loadedSound) {
      clearInterval(this._watchAudioTimeInterval);
      this._loadedSound.release();
      this._loadedSound == null;
    }
  };
}

let _audioActor;
export const audioActor = store => {
  if (_audioActor) {
    return _audioActor;
  }

  _audioActor = new AudioActor(store);
  return _audioActor;
};
