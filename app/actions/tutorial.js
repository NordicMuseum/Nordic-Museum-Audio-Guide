
// *** Action Types ***
export const HIDE_TUTORIAL = 'HIDE_TUTORIAL';
export const SHOW_TUTORIAL = 'SHOW_TUTORIAL';

// *** Action Creators ***
export function hideTutorial() {
  return {
    type: HIDE_TUTORIAL,
  };
}

function showTutorial() {
  return {
    type: SHOW_TUTORIAL,
  };
}

export function decideIfToShowTutorial(showTutorialEveryTime, newVersion) {
  return async (dispatch) => {
    if (showTutorialEveryTime || newVersion) {
      return dispatch(
        showTutorial()
      );
    }

    return dispatch(
      hideTutorial()
    );
  };
}
