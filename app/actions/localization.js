import {
  NativeModules,
  I18nManager,
  Settings,
} from 'react-native';

// *** Action Types ***
export const SWITCH_LOCALE = 'SWITCH_LOCALE';

import {
  playTrack,
} from './audio';

// *** Action Creators ***
function updateRTL(rtl) {
  I18nManager.forceRTL(rtl);
  NativeModules.CMSRTLManager.forceRTL(rtl);
}

export function switchLocale(locale, screen) {
  return async (dispatch, getState) => {
    const rtl = locale === 'ar';
    const prevRTL = I18nManager.isRTL;

    if (rtl !== prevRTL && prevRTL != null) {
      switch (screen) {
        case ('tutorial') : {
          await Settings.set({
            advanceLanguageTutorialScreenOnLoad: true,
            reloadAppForRTLSwitchLocale: locale,
            reloadAppForRTLSwitch: true,
          });
          break;
        } case ('settings') : {
          await Settings.set({
            localeChangedFromSettings: true,
            reloadAppForRTLSwitchLocale: locale,
            reloadAppForRTLSwitch: true,
          });
          break;
        }
        default: break;
      }
      updateRTL(rtl, locale);
    }

    const state = getState();
    if (state.bottomPlayer.uuid !== '') {
      await dispatch(playTrack(state.bottomPlayer.tourStop, state.bottomPlayer.uuid, false));
      dispatch({ type: SWITCH_LOCALE, locale });
    } else {
      dispatch({ type: SWITCH_LOCALE, locale });
    }
  };
}
