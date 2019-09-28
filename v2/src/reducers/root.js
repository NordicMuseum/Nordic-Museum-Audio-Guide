import { combineReducers } from 'redux';

import { beacon } from './beacon';
import { closeTourStops } from './closeTourStops';
import { allTourStops } from './allTourStops';
import { bottomPlayer } from './bottomPlayer';
import { accessibility } from './accessibility';
import { device } from './device';
import { searchByNumber } from './searchByNumber';

const rootReducer = combineReducers({
  beacon,
  closeTourStops,
  allTourStops,
  bottomPlayer,
  accessibility,
  device,
  searchByNumber,
});

export default rootReducer;
