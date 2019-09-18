import {TourStop} from '../models/tourStop';

const stops = TourStop.allRealmObjects();

const initialState = {
  tourStops: stops,
};

export function allTourStops(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
