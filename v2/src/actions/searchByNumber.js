// *** Action Types ***
export const EDIT_DIGITS = 'EDIT_DIGITS';
export const RESET_DIGITS = 'RESET_DIGITS';

// *** Action Creators ***

export function resetDigits(digits) {
  return {
    type: RESET_DIGITS,
    digits,
  };
}

export function deleteDigit(digits) {
  const updatedDigits = [];
  let digitDeleted = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] !== null && !digitDeleted) {
      updatedDigits[i] = null;
      digitDeleted = true;
    } else {
      updatedDigits[i] = digits[i];
    }
  }

  return {
    type: EDIT_DIGITS,
    digits: updatedDigits,
  };
}

export function addDigit(digits, newDigit) {
  const updatedDigits = [];
  let digitAdded = false;
  let digitIndex = 0;
  for (let i = 0; i < digits.length; i++) {
    if (digits[i] !== null) {
      updatedDigits[i] = digits[i];
    } else if (!digitAdded) {
      updatedDigits[i] = newDigit;
      digitAdded = true;
      digitIndex = i;
    } else {
      updatedDigits[i] = null;
    }
  }

  return {
    type: EDIT_DIGITS,
    digits: updatedDigits,
  };
}
