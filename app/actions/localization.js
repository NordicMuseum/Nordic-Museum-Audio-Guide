import {
  NativeModules,
  I18nManager,
  Settings,
} from 'react-native';

// *** Action Types ***
export const SWITCH_LOCALE = 'SWITCH_LOCALE';

// *** Action Creators ***
function updateRTL(rtl) {
  I18nManager.forceRTL(rtl);
  NativeModules.CMSRTLManager.forceRTL(rtl);
}

export function switchLocale(locale) {
  return async (dispatch, getState) => {
    const rtl = locale === 'ar';
    const prevRTL = getState().localization.rtl;

    if (rtl !== prevRTL && prevRTL != null) {
      Settings.set({
        reloadAppForRTLSwitchLocale: locale,
        reloadAppForRTLSwitch: true,
      });
      updateRTL(rtl, locale);
    }

    dispatch({
      type: SWITCH_LOCALE,
      locale,
      rtl,
    });
  };
}
