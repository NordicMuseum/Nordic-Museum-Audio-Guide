import { Navigation } from 'react-native-navigation';

// *** Action Types ***
export const HIDE_TUTORIAL = 'HIDE_TUTORIAL';
export const SHOW_TUTORIAL = 'SHOW_TUTORIAL';

// *** Action Creators ***
export function hideTutorial() {
  Navigation.dismissModal('tutorialModal');

  return {
    type: HIDE_TUTORIAL,
  };
}

export function showTutorial() {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'tutorialModal',
            name: 'tutorialLanguage',
          },
        },
      ],
    },
  });

  return {
    type: SHOW_TUTORIAL,
  };
}
