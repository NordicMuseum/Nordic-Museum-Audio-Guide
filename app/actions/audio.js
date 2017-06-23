// import store from '../store';

import {
  NativeModules,
} from 'react-native';

import I18n from 'react-native-i18n';

import {
  setAudioManagerEventListeners,
} from './audioEvents';

import {
  clearTimer,
} from './audioTimer';

import {
  analyticsTrackAudioPartialListen,
} from './analytics';

const AudioManager = NativeModules.CMSAudioManager;

import { _ } from 'lodash';

// *** Action Types ***
export const TOGGLE_PAUSE_PLAY = 'TOGGLE_PAUSE_PLAY';
export const PAUSE_AUDIO = 'PAUSE_AUDIO';
export const PLAY_AUDIO = 'PLAY_AUDIO';
export const TOGGLE_TRANSCRIPT = 'TOGGLE_TRANSCRIPT';
export const CYCLE_AUDIO_SPEED = 'CYCLE_AUDIO_SPEED';
export const REWIND_AUDIO = 'REWIND_AUDIO';
export const SEEK_AUDIO_TO_TIME = 'SEEK_AUDIO_TO_TIME';
export const REPLAY_AUDIO = 'REPLAY_AUDIO';
export const UPDATE_PREV_UUIDS = 'UPDATE_PREV_UUIDS';

export const TOGGLE_AUDIO_TRANSCRIPT = 'TOGGLE_AUDIO_TRANSCRIPT';

export const LOAD_AUDIO_FAILURE = 'LOAD_AUDIO_FAILURE';
export const LOAD_AUDIO_SUCCESS = 'LOAD_AUDIO_SUCCESS';
export const LOAD_AUDIO_CONTENT_SUCCESS = 'LOAD_AUDIO_CONTENT_SUCCESS';

export const UPDATE_AUDIO_CURRENT_TIME = 'UPDATE_AUDIO_CURRENT_TIME';
export const AUDIO_DID_FINISH_PLAYING = 'AUDIO_DID_FINISH_PLAYING';

export const TOGGLE_AUTOPLAY = 'TOGGLE_AUTOPLAY';
export const TOGGLE_AUTOPLAY_INITIAL = 'TOGGLE_AUTOPLAY_INITIAL';

// *** Play Rate Types ***
export const PLAY_RATE_NORMAL = 'PLAY_RATE_NORMAL';
export const PLAY_RATE_FAST = 'PLAY_RATE_FAST';
export const PLAY_RATE_FASTEST = 'PLAY_RATE_FASTEST';

// *** Player Status Types ***
export const PLAYER_STATUS_PLAY = 'PLAYER_STATUS_PLAY';
export const PLAYER_STATUS_PAUSE = 'PLAYER_STATUS_PAUSE';
export const PLAYER_STATUS_FINISHED = 'PLAYER_STATUS_FINISHED';
export const PLAYER_STATUS_NOTLOADED = 'PLAYER_STATUS_NOTLOADED';
export const PLAYER_STATUS_UNLOADED = 'PLAYER_STATUS_UNLOADED';
export const PLAYER_STATUS_LOADING = 'PLAYER_STATUS_LOADING';
export const PLAYER_STATUS_ERROR = 'PLAYER_STATUS_ERROR';

// *** Action Creators ***
function loadAudioSuccess(
  tourStop,
  stopUUID,
  stopTitle,
  audioContent,
  activeAudio,
  activeAudioIndex,
  activeAudioDuration,
  prevUUID,
  nextUUID,
) {
  return {
    type: LOAD_AUDIO_SUCCESS,
    tourStop,
    stopUUID,
    stopTitle,
    audioContent,
    activeAudio,
    activeAudioIndex,
    activeAudioDuration,
    prevUUID,
    nextUUID,
  };
}

function loadAudioFailure(error) {
  return {
    type: LOAD_AUDIO_FAILURE,
  };
}

export function playTrack(tourStop, trackUUID, autoplay = false) {
  clearTimer();

  return async (dispatch, getState) => {

    const state = getState();

    if (state.bottomPlayer.uuid !== '' &&
        state.bottomPlayer.time !== state.bottomPlayer.duration) {
      analyticsTrackAudioPartialListen(
        state.bottomPlayer.stopTitle,
        state.bottomPlayer.title,
        state.bottomPlayer.time / state.bottomPlayer.duration,
      );
    }

    const activeAudio = tourStop.audioContent.filtered(`uuid = "${trackUUID}"`)[0];

    let activeAudioIndex;
    for (let i = 0; i < tourStop.audioContent.length; i++) {
      if (tourStop.audioContent[i].uuid === activeAudio.uuid) {
        activeAudioIndex = i;
      }
    }

    let prevUUID = null;
    if (activeAudioIndex - 1 >= 0) {
      prevUUID = tourStop.audioContent[activeAudioIndex - 1].uuid;
    }

    let nextUUID = null;
    if (activeAudioIndex + 1 < tourStop.audioContent.length) {
      nextUUID = tourStop.audioContent[activeAudioIndex + 1].uuid;
    }

    setAudioManagerEventListeners(dispatch, autoplay, nextUUID !== null);

    let url = activeAudio.audioURL;
    if (activeAudio.audioURL.length === 3) {
      //If available, play audio in chosen language. Else play audio in fallback language. Else play audio in Swedish.
      if (activeAudio.duration[I18n.locale]) {
        url = (activeAudio.audioURL).concat('/', I18n.locale);
      } else {
        if (activeAudio.duration[I18n.defaultLocale]) {
          url = (activeAudio.audioURL).concat('/', I18n.defaultLocale);
        }
        else {
          url = (activeAudio.audioURL).concat('/', 'sv');
        }
      }
    }

    let activeAudioDuration;
    AudioManager.loadLocalAudio(
      url,
      activeAudio.uuid,
      true,
    ).then((results) => {
      activeAudioDuration = Math.round(results[1]);

      dispatch(
        loadAudioSuccess(
          tourStop,
          tourStop.uuid,
          tourStop.shortTitle,
          tourStop.audioContent,
          activeAudio,
          activeAudioIndex,
          activeAudioDuration,
          prevUUID,
          nextUUID,
        )
      );
    })
    .catch((e) => {
      console.log(e.message);
      clearTimer();
      dispatch(
        loadAudioFailure(e),
      );
    });
  };
}

export function unloadAudio() {
  AudioManager.changeRate(1);
  AudioManager.unloadAudio();
  return {
    type: PLAYER_STATUS_UNLOADED,
  };
}

export function updateAudioCurrentTime(uuid, time) {
  return {
    type: UPDATE_AUDIO_CURRENT_TIME,
    uuid,
    time,
  };
}

export function audioDidFinishPlaying(uuid, time, displayTimer) {
  return {
    type: AUDIO_DID_FINISH_PLAYING,
    uuid,
    time,
    displayTimer,
  };
}


export function togglePausePlay() {
  AudioManager.togglePlayPause();

  return {
    type: TOGGLE_PAUSE_PLAY,
  };
}

export function pauseAudio() {
  AudioManager.pause();

  return {
    type: PAUSE_AUDIO,
  };
}

export function playAudio() {
  AudioManager.play();

  return {
    type: PLAY_AUDIO,
  };
}

export function cycleAudioSpeed(currentPlayRate) {
  let newRate;

  switch (currentPlayRate) {
    case PLAY_RATE_NORMAL: {
      newRate = PLAY_RATE_FAST;
      AudioManager.changeRate(1.5);
      break;
    }

    case PLAY_RATE_FAST: {
      newRate = PLAY_RATE_FASTEST;
      AudioManager.changeRate(2);
      break;
    }

    case PLAY_RATE_FASTEST: {
      newRate = PLAY_RATE_NORMAL;
      AudioManager.changeRate(1);
      break;
    }

    // no default
  }

  return {
    type: CYCLE_AUDIO_SPEED,
    playRate: newRate,
  };
}

export function rewindAudio(seconds) {
  AudioManager.rewind(seconds);

  return {
    type: REWIND_AUDIO,
    seconds,
  };
}

export function seekAudioToTime(time) {
  AudioManager.seekToTime(time);

  return {
    type: SEEK_AUDIO_TO_TIME,
    time,
  };
}

export function replayAudio() {
  AudioManager.replay();

  return {
    type: REPLAY_AUDIO,
  };
}
