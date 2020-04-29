import RNRestart from "react-native-restart";

import {
  setMuseumMode,
  setLocaleAndRTLForReset,
  setDefaultLocaleAndRTL
} from "../appSettings";

import { audioActor } from "../actors/audio";

// *** Action Types ***
export const UPDATE_MUSEUM_MODE = "UPDATE_MUSEUM_MODE";
export const RESTART_APP = "RESTART_APP";
export const UPDATE_EVENTS = "UPDATE_EVENTS";

// *** Action Creators ***
export function updateMuseumMode(museumMode) {
  setMuseumMode(museumMode);

  return {
    type: UPDATE_MUSEUM_MODE,
    museumMode
  };
}

//Updating the events
export function updateEvents(newEvents) {
  return {
    type: UPDATE_EVENTS,
    newEvents
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
        showWelcomeScreen: true
      });
    } else {
      await setDefaultLocaleAndRTL();
    }

    RNRestart.Restart();
  };
}
