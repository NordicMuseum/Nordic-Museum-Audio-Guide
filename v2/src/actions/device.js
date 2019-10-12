import RNRestart from 'react-native-restart';

import {
  setMuseumMode,
  setLocaleAndRTLForReset,
  setDefaultLocaleAndRTL,
} from '../appSettings';

import { audioActor } from '../actors/audio';

// *** Action Types ***
export const UPDATE_MUSEUM_MODE = 'UPDATE_MUSEUM_MODE';
export const RESTART_APP = 'RESTART_APP';

// *** Action Creators ***
export function updateMuseumMode(museumMode) {
  setMuseumMode(museumMode);

  return {
    type: UPDATE_MUSEUM_MODE,
    museumMode,
  };
}

export function restartApp(locale) {
  return async () => {
    audioActor().unloadAudio();

    if (locale) {
      const { setLocale, setRTL } = locale;

      await setLocaleAndRTLForReset({
        locale: setLocale,
        isRTL: setRTL,
        showWelcomeScreen: true,
      });
    } else {
      await setDefaultLocaleAndRTL();
    }

    RNRestart.Restart();
  };
}
