import { SWITCH_LOCALE } from '../actions/localization';

import { RESET } from '../actions/device';

const initialState = {
  locale: 'en',
  appVersion: '',
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

    default:
      return state;
  }
}
