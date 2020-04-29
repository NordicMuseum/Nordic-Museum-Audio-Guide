import { SWITCH_LOCALE } from "../actions/localization";
import { RESET, UPDATE_MUSEUM_MODE } from "../actions/device";
import { HIDE_TUTORIAL, SHOW_TUTORIAL } from "../actions/tutorial";

const initialState = {
  locale: "en",
  isRTL: false,
  appVersion: "",
  museumMode: false,
  tutorialHidden: false
};

export function device(state = initialState, action) {
  switch (action.type) {
    case RESET: {
      return initialState;
    }

    case SWITCH_LOCALE: {
      return Object.assign({}, state, {
        locale: action.locale,
        isRTL: action.isRTL
      });
    }

    case UPDATE_MUSEUM_MODE: {
      return Object.assign({}, state, {
        museumMode: action.museumMode
      });
    }

    case SHOW_TUTORIAL: {
      return Object.assign({}, state, {
        tutorialHidden: false
      });
    }

    case HIDE_TUTORIAL: {
      return Object.assign({}, state, {
        tutorialHidden: true
      });
    }

    default:
      return state;
  }
}
