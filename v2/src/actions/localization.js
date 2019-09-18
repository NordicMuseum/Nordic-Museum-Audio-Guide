import { setI18nConfig } from '../i18n';

import { localizationActor } from '../actors/localization';

import Analytics from 'appcenter-analytics';

// *** Action Types ***
export const SWITCH_LOCALE = 'SWITCH_LOCALE';

import { playTrack } from './audio';

// *** Action Creators ***
function updateRTL(rtl) {
  // I18nManager.forceRTL(rtl);
  // NativeModules.CMSRTLManager.forceRTL(rtl);
}

export function switchLocale(desiredLocale, screen) {
  return async (dispatch, getState) => {
    const locale = setI18nConfig(desiredLocale);
    Analytics.trackEvent(`LocaleChanged: ${locale}`);
    localizationActor().changedLocaleEvent(locale);

    dispatch({ type: SWITCH_LOCALE, locale });
  };
}

// export function switchLocale(locale, screen) {
//   return async (dispatch, getState) => {
//     const rtl = locale === 'ar';
//     const prevRTL = I18nManager.isRTL;

//     analyticsTrackLanguageSelected(locale);

//     if (rtl !== prevRTL && prevRTL != null) {
//       switch (screen) {
//         case 'tutorial': {
//           await Settings.set({
//             advanceLanguageTutorialScreenOnLoad: true,
//             reloadAppForRTLSwitchLocale: locale,
//             reloadAppForRTLSwitch: true,
//           });
//           break;
//         }
//         case 'settings': {
//           await Settings.set({
//             localeChangedFromSettings: true,
//             reloadAppForRTLSwitchLocale: locale,
//             reloadAppForRTLSwitch: true,
//           });
//           break;
//         }
//         default:
//           break;
//       }
//       updateRTL(rtl, locale);
//     }

//     const state = getState();
//     if (state.bottomPlayer.uuid !== '') {
//       dispatch({type: SWITCH_LOCALE, locale});

//       dispatch(
//         playTrack(
//           state.bottomPlayer.tourStop,
//           state.bottomPlayer.uuid,
//           false,
//           false,
//         ),
//       );
//     } else {
//       dispatch({type: SWITCH_LOCALE, locale});
//     }
//   };
// }
