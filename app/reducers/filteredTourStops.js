
import {
  ALL_TOUR_STOPS,
  SHOW_FLOOR,
 } from '../actions/filteredTourStops';

import { TourStop } from '../models/tourStop';

const stops = TourStop.allRealmObjects();

const initialState = {
  currentFloor: 1,
  tourStops: [
    {
      floor: 1,
      floorTitle: 'floor1_Label',
      expanded: true,
      stops: stops.filtered('floor = 1'),
    },
    {
      floor: 2,
      expanded: true,
      floorTitle: 'floor2_Label',
      stops: stops.filtered('floor = 2'),
    },
    {
      floor: 3,
      expanded: true,
      floorTitle: 'floor3_Label',
      stops: stops.filtered('floor = 3'),
    },
    {
      floor: 4,
      expanded: true,
      floorTitle: 'floor4_Label',
      stops: stops.filtered('floor = 4'),
    },
  ],
};

export function filteredTourStops(state = initialState, action) {
  switch (action.type) {
    case ALL_TOUR_STOPS: {
      return initialState;
    }

    case SHOW_FLOOR: {
      return Object.assign({}, state, { currentFloor: action.floor });
    }

    default:
      return state;
  }
}
