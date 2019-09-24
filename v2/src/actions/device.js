import AsyncStorage from '@react-native-community/async-storage';

// *** Action Types ***
export const RESET = 'RESET';
export const UPDATE_MUSEUM_MODE = 'UPDATE_MUSEUM_MODE';

// *** Action Creators ***
export function reset() {
  return {
    type: RESET,
  };
}

export function updateMuseumMode(museumMode) {
  AsyncStorage.setItem('museumMode', museumMode);

  return {
    type: UPDATE_MUSEUM_MODE,
    museumMode,
  };
}
