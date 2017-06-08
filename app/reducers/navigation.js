
import {
  UPDATE_ACTIVE_TAB,
  UPDATE_NEARME_ROOT_STATUS,
  TAB_NEARME,
} from '../actions/navigation';

const initialState = {
  currentAudioRoute: {},
  currentAudioTab: '',
  activeTab: TAB_NEARME,
  atNearMeRoot: true,
};

export function nav(state = initialState, action) {
  switch (action.type) {

    case UPDATE_ACTIVE_TAB: {
      return Object.assign({},
        state,
        {
          activeTab: action.activeTab,
        }
      );
    }

    case UPDATE_NEARME_ROOT_STATUS: {
      return Object.assign({},
        state,
        {
          atNearMeRoot: state.activeTab === TAB_NEARME ? action.atRoot : state.atNearMeRoot,
        }
      );
    }

    default:
      return state;
  }
}
