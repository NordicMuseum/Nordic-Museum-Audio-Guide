import { Navigation } from "react-native-navigation";

import { setShowWelcomeScreenToFalse } from "../appSettings";

// *** Action Types ***
export const HIDE_TUTORIAL = "HIDE_TUTORIAL";
export const SHOW_TUTORIAL = "SHOW_TUTORIAL";

// *** Action Creators ***
export function hideTutorial() {
  return async dispatch => {
    Navigation.dismissModal("tutorialModal");

    await setShowWelcomeScreenToFalse();

    dispatch({
      type: HIDE_TUTORIAL
    });
  };
}

export function showTutorial({ showWelcomeScreen }) {
  return async dispatch => {
    const children = [
      {
        component: {
          id: "tutorialModal",
          name: "tutorialLanguage"
        }
      }
    ];

    if (showWelcomeScreen) {
      children.push({
        component: {
          name: "tutorialWelcome"
        }
      });
    }

    Navigation.showModal({
      stack: {
        children
      }
    });

    dispatch({
      type: SHOW_TUTORIAL
    });
  };
}
