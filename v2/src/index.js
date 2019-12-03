import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';

import DeviceInfo from 'react-native-device-info';

import { configureStore } from './store';
import registerScreens from './registerScreens';

import hydrate from './hydrate';
import { setI18nConfig, translate } from './i18n';

import { getAppSettings, setAppVersion } from './appSettings';

import { showTutorial } from './actions/tutorial';
// import { updateBeacons } from './actions/beacon';

import { audioActor } from './actors/audio';
import { chargingActor } from './actors/charging';
import { beaconActor } from './actors/beacon';

import { OFF_BLACK, OFF_WHITE, setBottomTabsHeight } from './styles';

// Fire so that the data is ready by "registerAppLaunchedListener"
const currentAppVersionPromise = DeviceInfo.getVersion();
const appSettingsPromise = getAppSettings();

Navigation.events().registerAppLaunchedListener(async () => {
  const {
    isRTL,
    museumMode,
    appVersion,
    locale,
    showWelcomeScreen,
  } = await appSettingsPromise;

  const defaultOptions = {
    layout: {
      orientation: ['portrait'],
      direction: isRTL ? 'rtl' : 'ltr',
    },
  };

  if (Platform.OS === 'android') {
    defaultOptions.animations = {
      push: { enabled: 'false' },
      pop: { enabled: 'false' },
      setRoot: { enabled: 'false' },
      showModal: { enabled: 'false' },
      dismissModal: { enabled: 'false' },
    };
  }

  Navigation.setDefaultOptions(defaultOptions);

  const currentAppVersion = await currentAppVersionPromise;
  const newVersion = appVersion == null || appVersion !== currentAppVersion;

  hydrate(newVersion || __DEV__);

  if (newVersion) {
    setAppVersion(currentAppVersion);
  }

  const { setLocale, setRTL } = setI18nConfig(locale);
  const store = configureStore({
    device: { locale: setLocale, isRTL: setRTL, appVersion, museumMode },
  });

  audioActor(store);
  chargingActor(store);
  beaconActor(store);

  registerScreens(store);

  await Navigation.setRoot({
    root: {
      bottomTabs: {
        options: {
          bottomTabs: {
            backgroundColor: OFF_BLACK,
            currentTabIndex: 1,
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

  const shouldShowTutorial = museumMode || newVersion || showWelcomeScreen;
  if (shouldShowTutorial) {
    store.dispatch(showTutorial({ showWelcomeScreen }));
  }
});
