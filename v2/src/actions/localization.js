import { setI18nConfig } from '../i18n';

import { restartApp } from './device';

import Analytics from 'appcenter-analytics';

// *** Action Types ***
export const SWITCH_LOCALE = 'SWITCH_LOCALE';

// *** Action Creators ***
export function switchLocale(desiredLocale) {
  return async dispatch => {
    const locale = setI18nConfig(desiredLocale);
    Analytics.trackEvent(`LocaleChanged: ${locale}`);

    // Always restart app on locale change, it's easier this way
    dispatch(restartApp(locale));
  };
}
