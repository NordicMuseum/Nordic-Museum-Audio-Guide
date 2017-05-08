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
I18n.fallbacks = false; // TEMPORARY SO WE KNOW WHAT TRANSLATIONS ARE MISSING

export function localization(state = initialState, action) {
  switch (action.type) {
    case SWITCH_LOCALE: {
      I18n.locale = action.locale;
      if (action.locale === 'sv-kids' ||
          action.locale === 'sv-simple' ||
          action.locale === 'se-sme' ||
          action.locale === 'se-smj' ||
          action.locale === 'se-sma'
        ) {
        I18n.defaultLocale = 'sv';
        I18n.fallbacks = true;
      } else {
        I18n.defaultLocale = 'en';
        I18n.fallbacks = false; // TEMPORARY SO WE KNOW WHAT TRANSLATIONS ARE MISSING
      }
      return Object.assign({},
        state,
        {
          locale: action.locale,
          rtl: action.rtl !== undefined ? action.rtl : state.rtl,
        }
      );
    }

    default:
      return state;
  }
}
