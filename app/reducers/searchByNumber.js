import { EDIT_DIGITS } from '../actions/searchByNumber';

import {
  RESET,
} from '../actions/device';

// TODO: In the future load data from a database to prevent memory pressure

const initialState = {
  digits: [null, null, null],
};

export function searchByNumber(state = initialState, action) {
  switch (action.type) {

    case RESET: {
      return initialState;
    }

    case EDIT_DIGITS: {
      return (Object.assign({}, state, { digits: action.digits }));
    }

    default:
      return state;
  }
}
