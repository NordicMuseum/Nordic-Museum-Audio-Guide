import { I18nManager } from "react-native";

import { Navigation } from "react-native-navigation";

import * as RNLocalize from "react-native-localize";
import memoize from "lodash.memoize";
import i18n from "i18n-js";

const translationGetters = {
  ar: () => require("./data/strings/ar.json"),
  de: () => require("./data/strings/de.json"),
  en: () => require("./data/strings/en.json"),
  es: () => require("./data/strings/es.json"),
  fi: () => require("./data/strings/fi.json"),
  fr: () => require("./data/strings/fr.json"),
  it: () => require("./data/strings/it.json"),
  ru: () => require("./data/strings/ru.json"),
  seSma: () => require("./data/strings/seSma.json"),
  seSme: () => require("./data/strings/seSme.json"),
  seSmj: () => require("./data/strings/seSmj.json"),
  sv: () => require("./data/strings/sv.json"),
  svKids: () => require("./data/strings/svKids.json"),
  svSimple: () => require("./data/strings/svSimple.json"),
  zh: () => require("./data/strings/zh.json")
};

export const setI18nConfig = forceLocale => {
  // fallback if no available language fits
  const tagFallback = { languageTag: "en", isRTL: false };

  let language = {};
  const languageTags = Object.keys(translationGetters);
  if (forceLocale && languageTags.includes(forceLocale)) {
    language = { languageTag: forceLocale, isRTL: forceLocale === "ar" };
  } else {
    language =
      RNLocalize.findBestAvailableLanguage(languageTags) || tagFallback;
  }

  let stringFallback;
  i18n.fallbacks = true;
  switch (forceLocale) {
    case "svKids":
    case "svSimple":
    case "seSme":
    case "seSmj":
    case "seSma": {
      stringFallback = "sv";
      break;
    }

    default: {
      stringFallback = "en";
      break;
    }
  }

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.allowRTL(language.isRTL);
  I18nManager.forceRTL(language.isRTL);

  // set i18n-js config
  i18n.translations = {
    [language.languageTag]: translationGetters[language.languageTag](),
    [stringFallback]: translationGetters[stringFallback]()
  };
  i18n.defaultLocale = stringFallback;
  i18n.locale = language.languageTag;

  return {
    setLocale: language.languageTag,
    setRTL: language.isRTL
  };
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const isRTL = I18nManager.getConstants().isRTL;
