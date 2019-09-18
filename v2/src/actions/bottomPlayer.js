// *** Action Types ***
export const HIDE_BOTTOM_PLAYER = 'HIDE_BOTTOM_PLAYER';
export const SHOW_BOTTOM_PLAYER = 'SHOW_BOTTOM_PLAYER';

// *** Action Creators ***
export function hideBottomPlayer() {
  return {
    type: HIDE_BOTTOM_PLAYER,
  };
}

export function showBottomPlayer() {
  return {
    type: SHOW_BOTTOM_PLAYER,
  };
}
