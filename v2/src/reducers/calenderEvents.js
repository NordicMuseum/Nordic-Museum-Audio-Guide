import { UPDATE_EVENTS } from "../actions/device";

const initialState = {
  events: {}
};

export function calenderEvents(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }

    case UPDATE_EVENTS: {
      return Object.assign({}, state, {
        events: Object.assign({}, state.events, action.newEvents)
      });
    }
  }
}
