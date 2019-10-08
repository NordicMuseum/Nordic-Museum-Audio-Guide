import { setI18nConfig } from '../i18n';

import { setLocaleAndRTLForReset } from '../appSettings';

import RNRestart from 'react-native-restart';
import Analytics from 'appcenter-analytics';

// *** Action Types ***
export const SWITCH_LOCALE = 'SWITCH_LOCALE';

// *** Action Creators ***
export function switchLocale(desiredLocale) {
  return async () => {
    const { setLocale, setRTL } = setI18nConfig(desiredLocale);
    Analytics.trackEvent(`LocaleChanged: ${setLocale}`);

    await setLocaleAndRTLForReset({
      locale: setLocale,
      isRTL: setRTL,
      showWelcomeScreen: true,
    });

    // Always restart app on locale change, it's easier this way
    RNRestart.Restart();
  };
}
