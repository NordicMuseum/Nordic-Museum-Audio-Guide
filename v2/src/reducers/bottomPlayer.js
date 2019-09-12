import {HIDE_BOTTOM_PLAYER} from '../actions/bottomPlayer';

const initialState = {
  show: true,
};

export function bottomPlayer(state = initialState, action) {
  switch (action.type) {
    case HIDE_BOTTOM_PLAYER: {
      return Object.assign({}, state, {
        show: false,
      });
    }

    default:
      return state;
  }
}
