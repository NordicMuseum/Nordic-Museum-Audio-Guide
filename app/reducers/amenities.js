
import { allAmenities } from '../data/amenities';

const initialState = {
  allAmenities,
};

export function amenities(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
