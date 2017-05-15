
// *** Action Types ***
export const SHOW_AMENITIES_FLOOR = 'SHOW_AMENITIES_FLOOR';

// *** Action Creators ***
export function showFloor(floor) {
  return {
    type: SHOW_AMENITIES_FLOOR,
    floor,
  };
}
