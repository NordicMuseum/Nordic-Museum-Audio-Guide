import {
  NativeModules,
  I18nManager,
} from 'react-native';

// *** Action Types ***
export const SWITCH_LOCALE = 'SWITCH_LOCALE';

// *** Action Creators ***
function setRTL(rtl) {
  try {
    I18nManager.forceRTL(rtl);
    return NativeModules.CMSRTLManager.setRTL(rtl);
  } catch (e) {
    return undefined;
  }
}

export function switchLocale(locale) {
  let rtl;
  if (locale === 'ar') {
    console.log('SHOULD BE RTL!!');
    rtl = setRTL(true);
  } else {
    console.log('SHOULD NOT BE RTL!!');
    rtl = setRTL(false);
  }
  console.log(rtl);
  return {
    type: SWITCH_LOCALE,
    locale,
    rtl,
  };
}
