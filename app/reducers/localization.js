import I18n from 'react-native-i18n';
import { strings } from '../data/strings';

import {
  SWITCH_LOCALE,
} from '../actions/localization';

const initialState = {
  locale: 'en',
};

I18n.translations = strings;
I18n.defaultLocale = 'en';
I18n.locale = initialState.locale;
I18n.fallbacks = false;

export function localization(state = initialState, action) {
  switch (action.type) {
    case SWITCH_LOCALE: {
      I18n.locale = action.locale;
      return Object.assign({},
        state,
        {
          locale: action.locale,
        }
      );
    }

    default:
      return state;
  }
}
