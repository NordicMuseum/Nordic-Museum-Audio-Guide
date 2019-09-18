// *** Action Types ***
export const EDIT_DIGITS = 'EDIT_DIGITS';

// *** Action Creators ***

export function editDigits(digits) {
  return {
    type: EDIT_DIGITS,
    digits,
  };
}
