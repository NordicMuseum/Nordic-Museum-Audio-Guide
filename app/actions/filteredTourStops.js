// *** Action Types ***
export const ALL_TOUR_STOPS = 'ALL_TOUR_STOPS';
export const SHOW_FLOOR = 'SHOW_FLOOR';

// *** Action Creators ***
export function showAllTourStops() {
  return {
    type: ALL_TOUR_STOPS,
  };
}

export function showFloor(floor) {
  return {
    type: SHOW_FLOOR,
    floor,
  };
}
