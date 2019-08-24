import {Navigation} from 'react-native-navigation';

import registerScreens from './registerScreens';

registerScreens({});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'nearMe',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Near Me',
                  selectedIconColor: 'blue',
                  selectedTextColor: 'blue',
                  fontSize: 12,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'tours',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Browse',
                  selectedIconColor: 'blue',
                  selectedTextColor: 'blue',
                  fontSize: 12,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'search',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Search #',
                  selectedIconColor: 'blue',
                  selectedTextColor: 'blue',
                  fontSize: 12,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'info',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Info',
                  selectedIconColor: 'blue',
                  selectedTextColor: 'blue',
                  fontSize: 12,
                },
              },
            },
          },
        ],
      },
    },
  });
});
