
import { SHOW_AMENITIES_FLOOR } from '../actions/amenities';

// TODO: In the future load data from a database to prevent memory pressure
import { allAmenities } from '../data/amenities';

const initialState = {
  allAmenities,
  currentFloor: 0,
};

export function amenities(state = initialState, action) {
  switch (action.type) {
    case SHOW_AMENITIES_FLOOR: {
      return (Object.assign({}, state, { currentFloor: action.floor }));
    }

    default:
      return state;
  }
}
