import { combineReducers } from "redux";

import { beacon } from "./beacon";
import { closeTourStops } from "./closeTourStops";
import { allTourStops } from "./allTourStops";
import { bottomPlayer } from "./bottomPlayer";
import { accessibility } from "./accessibility";
import { device } from "./device";
import { searchByNumber } from "./searchByNumber";
import { calenderEvents } from "./calenderEvents";

const rootReducer = combineReducers({
  beacon,
  closeTourStops,
  allTourStops,
  bottomPlayer,
  accessibility,
  device,
  searchByNumber,
  calenderEvents
});

export default rootReducer;
