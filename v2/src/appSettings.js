import AsyncStorage from "@react-native-community/async-storage";

const APP_SETTINGS_TYPES = {
  STRING: "STRING",
  BOOL: "BOOL"
};

const APP_SETTINGS_KEYS = {
  appVersion: { key: "appVersion", type: APP_SETTINGS_TYPES.STRING },
  museumMode: { key: "museumMode", type: APP_SETTINGS_TYPES.BOOL },
  locale: { key: "locale", type: APP_SETTINGS_TYPES.STRING },
  isRTL: { key: "isRTL", type: APP_SETTINGS_TYPES.BOOL },
  showWelcomeScreen: {
    key: "showWelcomeScreen",
    type: APP_SETTINGS_TYPES.BOOL
  }
};

const boolToString = bool => {
  return bool ? "true" : "false";
};

const appSettingsTypeParse = (keyType, value) => {
  let parsedValue;

  switch (keyType) {
    case APP_SETTINGS_TYPES.STRING: {
      parsedValue = value == null ? "" : value;
      break;
    }

    case APP_SETTINGS_TYPES.BOOL: {
      parsedValue = value === "1" || value === "true";
      break;
    }
  }

  return parsedValue;
};

export const setShowWelcomeScreenToFalse = async () => {
  const setObj = [
    [APP_SETTINGS_KEYS.showWelcomeScreen.key, boolToString(false)]
  ];

  try {
    await AsyncStorage.multiSet(setObj);
  } catch (e) {
    console.log(`Failed to save showWelcomeScreen: ${e}`);
  }
};

export const setAppVersion = async appVersion => {
  const setObj = [[APP_SETTINGS_KEYS.appVersion.key, appVersion]];

  try {
    await AsyncStorage.multiSet(setObj);
  } catch (e) {
    console.log(`Failed to save appVersion: ${e}`);
  }
};

export const setMuseumMode = async museumMode => {
  const setObj = [[APP_SETTINGS_KEYS.museumMode.key, boolToString(museumMode)]];

  try {
    await AsyncStorage.multiSet(setObj);
  } catch (e) {
    console.log(`Failed to save museumMode: ${e}`);
  }
};

export const setDefaultLocaleAndRTL = async () => {
  const setObj = [
    [APP_SETTINGS_KEYS.locale.key, "en"],
    [APP_SETTINGS_KEYS.isRTL.key, "false"],
    [APP_SETTINGS_KEYS.showWelcomeScreen.key, "false"]
  ];

  try {
    await AsyncStorage.multiSet(setObj);
  } catch (e) {
    console.log(`Failed to set default locale: ${e}`);
  }
};

// localeObj = { locale, isRTL, showWelcomeScreen }
export const setLocaleAndRTLForReset = async localeObj => {
  const setLocaleObj = Object.keys(localeObj).map(key => {
    const value =
      APP_SETTINGS_KEYS[key].type === APP_SETTINGS_TYPES.BOOL
        ? boolToString(localeObj[key])
        : localeObj[key];

    return [APP_SETTINGS_KEYS[key].key, value];
  });

  try {
    await AsyncStorage.multiSet(setLocaleObj);
  } catch (e) {
    console.log(`Failed to save locale: ${e}`);
  }
};

export const getAppSettings = async () => {
  let appSettings;
  const settingKeys = Object.keys(APP_SETTINGS_KEYS);

  try {
    const values = await AsyncStorage.multiGet(settingKeys);

    appSettings = values.reduce((acc, [key, value]) => {
      acc[key] = appSettingsTypeParse(APP_SETTINGS_KEYS[key].type, value);
      return acc;
    }, {});
  } catch (e) {
    console.log(`Failed to get app settings: ${e}`);
    return;
  }

  return appSettings;
};
