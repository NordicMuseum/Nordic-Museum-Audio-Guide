import { setMuseumMode } from '../appSettings';

// *** Action Types ***
export const UPDATE_MUSEUM_MODE = 'UPDATE_MUSEUM_MODE';

// *** Action Creators ***
export function updateMuseumMode(museumMode) {
  setMuseumMode(museumMode);

  return {
    type: UPDATE_MUSEUM_MODE,
    museumMode,
  };
}
