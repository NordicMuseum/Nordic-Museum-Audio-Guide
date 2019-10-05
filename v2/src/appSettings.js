import AsyncStorage from '@react-native-community/async-storage';

const APP_SETTINGS_TYPES = {
  STRING: 'STRING',
  BOOL: 'BOOL',
};

const APP_SETTINGS_KEYS = {
  appVersion: { key: 'appVersion', type: APP_SETTINGS_TYPES.STRING },
  museumMode: { key: 'museumMode', type: APP_SETTINGS_TYPES.BOOL },
  locale: { key: 'locale', type: APP_SETTINGS_TYPES.STRING },
  isRTL: { key: 'isRTL', type: APP_SETTINGS_TYPES.BOOL },
  skipLanguageSelection: {
    key: 'skipLanguageSelection',
    type: APP_SETTINGS_TYPES.BOOL,
  },
};

const appSettingsTypeParse = (keyType, value) => {
  let parsedValue;

  switch (keyType) {
    case APP_SETTINGS_TYPES.STRING: {
      parsedValue = value;
      break;
    }

    case APP_SETTINGS_TYPES.BOOL: {
      parsedValue = value === '1' || value === 'true';
      break;
    }
  }

  return parsedValue;
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
  const setObj = [[APP_SETTINGS_KEYS.museumMode.key, museumMode]];

  try {
    await AsyncStorage.multiSet(setObj);
  } catch (e) {
    console.log(`Failed to save museumMode: ${e}`);
  }
};

export const setDefaultLocaleAndRTL = async () => {
  const setObj = [
    [APP_SETTINGS_KEYS.locale.key, 'en'],
    [APP_SETTINGS_KEYS.isRTL.key, false],
    [APP_SETTINGS_KEYS.skipLanguageSelection.key, false],
  ];

  try {
    await AsyncStorage.multiSet(setObj);

    console.log('SUPER HIT');
  } catch (e) {
    console.log(`Failed to set default locale: ${e}`);
  }
};

// localeObj = { locale, isRTL, skipLanguageSelection }
export const setLocaleAndRTLForReset = async localeObj => {
  const setLocaleObj = Object.keys(localeObj).map(key => {
    return [APP_SETTINGS_KEYS[key].key, localeObj[key]];
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
