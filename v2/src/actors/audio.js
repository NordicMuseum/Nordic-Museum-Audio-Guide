import { Platform } from 'react-native';

import Sound from 'react-native-sound';
Sound.setCategory('Playback');

class AudioActor {
  constructor(store) {
    this._store = store;
    this._dispatch = store.dispatch;
    this._loadedSound;
  }

  loadAudio = ({ audioID, localeOrder, playAudioAfterLoad }) => {
    return new Promise((resolve, reject) => {
      const locale = localeOrder.shift();
      const audioUrl = Platform.select({
        ios: `audio/${audioID}/${audioID}${locale}.mp3`,
        android: `audio_${audioID}${locale.toLowerCase()}.mp3`,
      });

      this._loadedSound = new Sound(audioUrl, Sound.MAIN_BUNDLE, error => {
        if (error) {
          this._loadedSound.release();

          if (localeOrder.length === 0) {
            reject(`Cannot load file: ${audioUrl}`);
            return;
          }

          resolve(
            this.loadAudio({
              audioID,
              localeOrder,
              playAudioAfterLoad,
            }),
          );
        }

        if (playAudioAfterLoad) {
          this._loadedSound.play(success => {
            if (success) {
              console.log(`successfully finished playing: ${audioUrl}`);
            }
          });
        }

        resolve({
          locale,
          duration: Math.round(this._loadedSound.getDuration()),
        });
      });
    });
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
