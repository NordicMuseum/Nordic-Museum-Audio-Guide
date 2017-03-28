import I18n from 'react-native-i18n';
import { strings } from '../data/strings';

I18n.translations = strings;
I18n.locale = 'en';
I18n.fallbacks = true;

const initialState = {
};

export function localization(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
