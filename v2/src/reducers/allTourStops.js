import { Tour } from '../models/tour';

const stops = Tour.allRealmObjects();

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
