import { SWITCH_LOCALE } from '../actions/localization';

import { RESET, UPDATE_MUSEUM_MODE } from '../actions/device';

const initialState = {
  locale: 'en',
  appVersion: '',
  museumMode: false,
};

// TODO: Rename this "Device" and combine a lot of states
export function localization(state = initialState, action) {
  switch (action.type) {
    case RESET: {
      return initialState;
    }

    case SWITCH_LOCALE: {
      return Object.assign({}, state, {
        locale: action.locale,
      });
    }

    case UPDATE_MUSEUM_MODE: {
      return Object.assign({}, state, {
        museumMode: action.museumMode,
      });
    }

    default:
      return state;
  }
}
