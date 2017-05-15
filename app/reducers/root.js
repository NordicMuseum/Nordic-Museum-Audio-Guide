
import { combineReducers } from 'redux';

import { beacon } from './beacon';
import { closeTourStops } from './closeTourStops';
import { filteredTourStops } from './filteredTourStops';
import { bottomPlayer } from './bottomPlayer';
import { audioContent } from './audioContent';
import { amenities } from './amenities';
import { accessibility } from './accessibility';
import { nav } from './navigation';
import { preferences } from './preferences';
import { tutorial } from './tutorial';
import { localization } from './localization';
import { searchByNumber } from './searchByNumber';

const rootReducer = combineReducers({
  beacon,
  closeTourStops,
  filteredTourStops,
  bottomPlayer,
  audioContent,
  amenities,
  accessibility,
  nav,
  preferences,
  tutorial,
  localization,
  searchByNumber,
});

export default rootReducer;
