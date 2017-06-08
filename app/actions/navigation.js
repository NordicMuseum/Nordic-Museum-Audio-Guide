
// *** Action Types ***
export const UPDATE_ACTIVE_TAB = 'UPDATE_ACTIVE_TAB';
export const UPDATE_NEARME_ROOT_STATUS = 'UPDATE_NEARME_ROOT_STATUS';

// *** Tab Types ***
export const TAB_MUSEUM = 'TAB_MUSEUM';
export const TAB_STORIES = 'TAB_STORIES';
export const TAB_SEARCH = 'TAB_SEARCH';
export const TAB_NEARME = 'TAB_NEARME';

// *** Action Creators ***

export function updateActiveTab(activeTab) {
  return {
    type: UPDATE_ACTIVE_TAB,
    activeTab,
  };
}

export function updateNearMeRootStatus(atRoot) {
  return {
    type: UPDATE_NEARME_ROOT_STATUS,
    atRoot,
  };
}
