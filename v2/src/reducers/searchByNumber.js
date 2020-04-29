import { EDIT_DIGITS, RESET_DIGITS } from "../actions/searchByNumber";

import { RESET } from "../actions/device";

import { audioCodeLength } from "../data/appSettings";

// TODO: In the future load data from a database to prevent memory pressure

const initialState = {
  digits: Array(audioCodeLength).fill(null)
};

export function searchByNumber(state = initialState, action) {
  switch (action.type) {
    case RESET:
    case RESET_DIGITS: {
      return initialState;
    }

    case EDIT_DIGITS: {
      console.log(action.digits);
      return Object.assign({}, state, { digits: action.digits });
    }

    default:
      return state;
  }
}
