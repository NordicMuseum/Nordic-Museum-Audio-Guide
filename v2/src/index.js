import { Navigation } from 'react-native-navigation';

import { Settings } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { configureStore } from './store';
import registerScreens from './registerScreens';

import { setI18nConfig, translate } from './i18n';

import { showBottomPlayer } from './actions/bottomPlayer';

import { localizationActor } from './actors/localization';

import {
  NAV_BAR_TEXT,
  NAV_BAR_BACKGROUND,
  LIGHT_BLUE,
  GREEN,
  GRAY,
  LIGHT_GRAY,
  OFF_BLACK,
  OFF_WHITE,
  HEADER_BACKGROUND_COLOR,
  HIGHLIGHTS,
  ACTION,
  SELECTED,
  setBottomTabsHeight,
} from './styles';

const appVersion = `${DeviceInfo.getVersion()}.${DeviceInfo.getBuildNumber()}`;
const lastAppVersion = Settings.get('LastAppVersion');
const newVersion = lastAppVersion == null || lastAppVersion !== appVersion;

// Hydrate the DB
import hydrate from './data/hydrate';
hydrate(newVersion || __DEV__);

setI18nConfig();
const store = configureStore();
localizationActor(store);

registerScreens(store);

Navigation.events().registerAppLaunchedListener(async () => {
  await Navigation.setRoot({
    root: {
      bottomTabs: {
        options: {
          bottomTabs: {
            backgroundColor: OFF_BLACK,
          },
        },
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
                  text: translate('nearMeScreen_Title'),
                  icon: require('../src/assets/nearTab.png'),
                  selectedIcon: require('../src/assets/nearTabSelected.png'),
                  textColor: OFF_WHITE,
                  selectedTextColor: 'white',
                  fontSize: 12,
                  badge: '0',
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
                  text: translate('storiesScreen_Title'),
                  icon: require('../src/assets/storiesTab.png'),
                  selectedIcon: require('../src/assets/storiesTabSelected.png'),
                  textColor: OFF_WHITE,
                  selectedTextColor: 'white',
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
                  text: translate('searchScreen_Title'),
                  icon: require('../src/assets/searchTab.png'),
                  selectedIcon: require('../src/assets/searchTabSelected.png'),
                  textColor: OFF_WHITE,
                  selectedTextColor: 'white',
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
                  text: translate('museumScreen_Title'),
                  icon: require('../src/assets/museumTab.png'),
                  selectedIcon: require('../src/assets/museumTabSelected.png'),
                  textColor: OFF_WHITE,
                  selectedTextColor: 'white',
                  fontSize: 12,
                },
              },
            },
          },
        ],
      },
    },
  });

  const constants = await Navigation.constants();
  setBottomTabsHeight(constants.bottomTabsHeight);

  Navigation.showOverlay({
    component: {
      name: 'bottomPlayer',
    },
  });

  // TODO: Only used for testing
  store.dispatch(showBottomPlayer());
});
