import {
  HIDE_BOTTOM_PLAYER,
  SHOW_BOTTOM_PLAYER,
} from '../actions/bottomPlayer';

import {
  TOGGLE_PAUSE_PLAY,
  PAUSE_AUDIO,
  PLAY_AUDIO,
  CYCLE_AUDIO_SPEED,
  PLAY_RATE_NORMAL,
  LOAD_AUDIO_SUCCESS,
  LOAD_AUDIO_FAILURE,
  SEEK_AUDIO_TO_TIME,
  REPLAY_AUDIO,
  TOGGLE_AUTOPLAY,
  TOGGLE_AUTOPLAY_INITIAL,
  PLAYER_STATUS_PAUSE,
  PLAYER_STATUS_PLAY,
  PLAYER_STATUS_FINISHED,
  PLAYER_STATUS_NOTLOADED,
  PLAYER_STATUS_UNLOADED,
  PLAYER_STATUS_LOADING,
  PLAYER_STATUS_ERROR,
  UPDATE_AUDIO_CURRENT_TIME,
  AUDIO_DID_FINISH_PLAYING,
} from '../actions/audio';

import { SCREEN_READER_STATUS } from '../actions/accessibility';

import { FIRE_TIMER, STOP_TIMER } from '../actions/audioTimer';

import { RESET } from '../actions/device';

const initialState = {
  tourStop: {},
  audioContent: {},
  stopUUID: '',
  stopTitle: '',
  url: '',
  title: '',
  uuid: '',
  index: 0,
  duration: 0,
  time: 0,
  // TODO: Move this into two properties:
  // 1. Audio Status (Not Loaded, Loading, Failure, Success)
  // 2. Playing Status (Paused, Playing, Done)
  playerStatus: PLAYER_STATUS_NOTLOADED,
  playerOpen: false,
  playRate: PLAY_RATE_NORMAL,
  prevUUID: null,
  nextUUID: null,
  timerStartAt: 5,
  timerNumber: 0,
  timerActive: false,
  autoplayOn: true,
  autoplayInitial: false,
};

export function bottomPlayer(state = initialState, action) {
  switch (action.type) {
    // These two are only used for testing
    case SHOW_BOTTOM_PLAYER: {
      return Object.assign({}, state, {
        playerOpen: true,
      });
    }
    case HIDE_BOTTOM_PLAYER: {
      return Object.assign({}, state, {
        playerOpen: false,
      });
    }

    case RESET: {
      return initialState;
    }

    case SCREEN_READER_STATUS: {
      return Object.assign({}, state, {
        timerStartAt: action.screenReader ? 7 : 5,
        autoplayOn: action.screenReader ? false : state.autoplayOn,
      });
    }

    case LOAD_AUDIO_SUCCESS: {
      const { title, url, uuid } = action.activeAudio;

      return Object.assign({}, state, {
        tourStop: action.tourStop,
        stopUUID: action.stopUUID,
        stopTitle: action.stopTitle,
        audioContent: action.audioContent,
        index: action.activeAudioIndex,
        duration: action.activeAudioDuration,
        time: 0,
        title,
        url,
        uuid,
        playerStatus: action.playAudioAfterLoad
          ? PLAYER_STATUS_PLAY
          : PLAYER_STATUS_PAUSE,
        playerOpen: true,
        prevUUID: action.prevUUID,
        nextUUID: action.nextUUID,
      });
    }

    case PLAYER_STATUS_LOADING: {
      return Object.assign({}, state, {
        playerStatus: PLAYER_STATUS_LOADING,
        playerOpen: false,
      });
    }

    case PLAYER_STATUS_UNLOADED: {
      return Object.assign({}, state, initialState);
    }

    case STOP_TIMER: {
      return Object.assign({}, state, {
        timerActive: false,
      });
    }

    case FIRE_TIMER: {
      if (state.timerActive) {
        return Object.assign({}, state, {
          timerNumber: state.timerNumber - 1,
        });
      }

      return state;
    }

    case TOGGLE_AUTOPLAY: {
      return Object.assign({}, state, {
        autoplayOn: action.autoplayOn,
      });
    }

    case TOGGLE_AUTOPLAY_INITIAL: {
      return Object.assign({}, state, {
        autoplayInitial: action.autoplayInitial,
      });
    }

    case LOAD_AUDIO_FAILURE: {
      return Object.assign({}, state, {
        stopUUID: '',
        playerStatus: PLAYER_STATUS_ERROR,
        playerOpen: false,
        timerActive: false,
      });
    }

    case UPDATE_AUDIO_CURRENT_TIME: {
      return Object.assign({}, state, {
        time: action.time,
      });
    }

    case AUDIO_DID_FINISH_PLAYING: {
      return Object.assign({}, state, {
        time: state.duration,
        playerStatus: PLAYER_STATUS_FINISHED,
        timerActive: state.autoplayOn && action.displayTimer,
        timerNumber: state.timerStartAt,
      });
    }

    case TOGGLE_PAUSE_PLAY: {
      let newStatus;
      let openStatus;
      switch (state.playerStatus) {
        case PLAYER_STATUS_NOTLOADED:
          newStatus = PLAYER_STATUS_NOTLOADED;
          openStatus = false;
          break;

        case PLAYER_STATUS_PLAY:
          newStatus = PLAYER_STATUS_PAUSE;
          openStatus = true;
          break;

        case PLAYER_STATUS_PAUSE:
        case PLAYER_STATUS_FINISHED:
          newStatus = PLAYER_STATUS_PLAY;
          openStatus = true;
          break;

        // no default
      }

      return Object.assign({}, state, {
        playerStatus: newStatus,
        playerOpen: openStatus,
      });
    }

    case PLAY_AUDIO: {
      return Object.assign({}, state, {
        playerStatus: PLAYER_STATUS_PLAY,
      });
    }

    case PAUSE_AUDIO: {
      return Object.assign({}, state, {
        playerStatus: PLAYER_STATUS_PAUSE,
      });
    }

    case REPLAY_AUDIO: {
      return Object.assign({}, state, {
        currentTime: 0,
        playerStatus: PLAYER_STATUS_PLAY,
      });
    }

    case SEEK_AUDIO_TO_TIME: {
      return Object.assign({}, state, {
        currentTime: action.time,
      });
    }

    case CYCLE_AUDIO_SPEED: {
      return Object.assign({}, state, {
        playRate: action.playRate,
      });
    }

    default:
      return state;
  }
}
