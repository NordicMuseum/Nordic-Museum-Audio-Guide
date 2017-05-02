// *** Action Types ***
export const ALL_TOUR_STOPS = 'ALL_TOUR_STOPS';
export const TOGGLE_STOPS_EXPANDED = 'TOGGLE_STOPS_EXPANDED';

// *** Action Creators ***
export function showAllTourStops() {
  return {
    type: ALL_TOUR_STOPS,
  };
}

export function toggleStopsExpanded(floor) {
  return {
    type: TOGGLE_STOPS_EXPANDED,
    floor,
  };
}
