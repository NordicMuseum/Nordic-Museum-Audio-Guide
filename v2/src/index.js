import { Navigation } from 'react-native-navigation';

import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';

import { configureStore } from './store';
import registerScreens from './registerScreens';

import hydrate from './hydrate';
import { setI18nConfig, translate } from './i18n';

import { localizationActor } from './actors/localization';
import { audioActor } from './actors/audio';

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

// Fire so that the data is ready by "registerAppLaunchedListener"
let appVersion = DeviceInfo.getReadableVersion();
let lastAppVersion = AsyncStorage.getItem('appVersion');

Navigation.events().registerAppLaunchedListener(async () => {
  appVersion = await appVersion;
  lastAppVersion = await lastAppVersion;
  const newVersion = lastAppVersion == null || lastAppVersion !== appVersion;

  console.log({ newVersion }, { lastAppVersion });
  hydrate(newVersion || __DEV__);

  if (newVersion) {
    AsyncStorage.setItem('appVersion', appVersion);
  }

  const locale = setI18nConfig();

  const store = configureStore({ localization: { locale, appVersion } });
  localizationActor(store);
  audioActor(store);

  registerScreens(store);

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
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
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
});
