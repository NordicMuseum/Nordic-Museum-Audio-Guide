import { I18nManager } from 'react-native';

import * as RNLocalize from 'react-native-localize';
import memoize from 'lodash.memoize';
import i18n from 'i18n-js';

const translationGetters = {
  es: () => require('./data/strings/es.json'),
  en: () => require('./data/strings/en.json'),
  sv: () => require('./data/strings/sv.json'),
};

export const setI18nConfig = forceLocale => {
  // fallback if no available language fits
  const tagFallback = { languageTag: 'en', isRTL: false };

  let language = {};
  languageTags = Object.keys(translationGetters);
  if (forceLocale && languageTags.includes(forceLocale)) {
    language = { languageTag: forceLocale, isRTL: forceLocale === 'ar' };
  } else {
    language =
      RNLocalize.findBestAvailableLanguage(languageTags) || tagFallback;
  }

  let stringFallback;
  switch (forceLocale) {
    case 'svKids':
    case 'svSimple':
    case 'seSme':
    case 'seSmj':
    case 'seSma': {
      stringFallback = 'sv';
      i18n.fallbacks = true;
      break;
    }

    default: {
      stringFallback = 'en';
      if (__DEV__) {
        // Display missing translations in development mode
        i18n.fallbacks = false;
      } else {
        i18n.fallbacks = true;
      }
      break;
    }
  }

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(language.isRTL);

  // set i18n-js config
  i18n.translations = {
    [language.languageTag]: translationGetters[language.languageTag](),
    [stringFallback]: translationGetters[stringFallback](),
  };
  i18n.defaultLocale = stringFallback;
  i18n.locale = language.languageTag;

  return language.languageTag;
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const isRTL = () => {
  return I18nManager.isRTL;
};
