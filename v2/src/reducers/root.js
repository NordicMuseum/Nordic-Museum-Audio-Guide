import { combineReducers } from 'redux';

// import { beacon } from './beacon';
// import { closeTourStops } from './closeTourStops';
import { allTourStops } from './allTourStops';
import { bottomPlayer } from './bottomPlayer';
import { accessibility } from './accessibility';
// import { nav } from './navigation';
import { tutorial } from './tutorial';
import { localization } from './localization';
// import { searchByNumber } from './searchByNumber';

const rootReducer = combineReducers({
  // beacon,
  // closeTourStops,
  allTourStops,
  bottomPlayer,
  // amenities,
  accessibility,
  // nav,
  tutorial,
  localization,
  // searchByNumber,
});

export default rootReducer;
