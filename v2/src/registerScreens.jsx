import React, { Component } from 'react';
import { BackHandler } from 'react-native';

import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import { translate } from './i18n';
import { localizationActor } from './actors/localization';

import NearMe from './containers/nearMe';
import Tours from './containers/tours';
import TourStop from './containers/tourStop';
import Search from './containers/search';
import Info from './containers/info';
import Settings from './containers/settings';
import Amenities from './containers/amenities';
import TutorialWelcome from './containers/tutorialWelcome';
import TutorialLanguage from './containers/tutorialLanguage';
import AboutMuseum from './containers/aboutMuseum';
import AboutApp from './containers/aboutApp';
import BottomPlayer from './containers/bottomPlayer';

import { OFF_BLACK } from './styles';

import Analytics from 'appcenter-analytics';

const HARDWARE_BACK_BUTTON_EVENT = 'hardwareBackPress';

const sceneCreator = (
  SceneComp,
  store,
  { screenName, screenType, titleTranslationsKey },
) => {
  return () =>
    class SceneWrapper extends Component {
      static get options() {
        return { ...SceneComp.options };
      }

      constructor(props) {
        super(props);
        this.sceneCompRef = React.createRef();

        if (screenType !== SCREEN_TYPES.overlay) {
          Navigation.events().bindComponent(this);
        }

        localizationActor().addListener(this.localeChanged);
      }

      componentDidAppear() {
        Analytics.trackEvent('Screen Viewed', { screenName });

        BackHandler.addEventListener(
          HARDWARE_BACK_BUTTON_EVENT,
          this.handleHardwareBack,
        );
      }

      componentDidDisappear() {
        BackHandler.removeEventListener(
          HARDWARE_BACK_BUTTON_EVENT,
          this.handleHardwareBack,
        );
      }

      componentWillUnmount() {
        localizationActor().removeListener(this.localeChanged);
      }

      handleHardwareBack = () => {
        // TODO: Logic for Android back button
      };

      render() {
        return (
          <Provider store={store}>
            <SceneComp ref={this.sceneCompRef} {...this.props} />
          </Provider>
        );
      }

      localeChanged = () => {
        let newOptions;

        switch (screenType) {
          case SCREEN_TYPES.bottomTab: {
            newOptions = {
              bottomTab: {
                text: translate(titleTranslationsKey),
              },
              bottomTabs: {
                backgroundColor: OFF_BLACK,
              },
            };
            break;
          }

          case SCREEN_TYPES.bottomTabWithNavBar: {
            newOptions = {
              topBar: {
                title: {
                  text: translate(titleTranslationsKey),
                },
              },
              bottomTab: {
                text: translate(titleTranslationsKey),
              },
              bottomTabs: {
                backgroundColor: OFF_BLACK,
              },
            };
            break;
          }

          case SCREEN_TYPES.screenWithNavBar: {
            newOptions = {
              topBar: {
                title: {
                  text: translate(titleTranslationsKey),
                },
              },
              bottomTabs: {
                backgroundColor: OFF_BLACK,
              },
            };
            break;
          }

          case SCREEN_TYPES.screen: {
            break;
          }

          case SCREEN_TYPES.overlay: {
            break;
          }

          default:
            break;
        }

        if (newOptions) {
          Navigation.mergeOptions(this.props.componentId, newOptions);
        }

        if (this.sceneCompRef.current) {
          this.sceneCompRef.current.forceUpdate();
        }
      };
    };
};

const SCREEN_TYPES = {
  bottomTab: 'bottomTab',
  bottomTabWithNavBar: 'bottomTabWithNavBar',
  screenWithNavBar: 'screenWithNavBar',
  screen: 'screen',
  overlay: 'overlay',
};

const registerScreens = store => {
  Navigation.registerComponent(
    'nearMe',
    sceneCreator(NearMe, store, {
      screenName: 'nearMe',
      screenType: SCREEN_TYPES.bottomTabWithNavBar,
      titleTranslationsKey: 'nearMeScreen_Title',
    }),
    () => NearMe,
  );

  Navigation.registerComponent(
    'tours',
    sceneCreator(Tours, store, {
      screenName: 'tours',
      screenType: SCREEN_TYPES.bottomTabWithNavBar,
      titleTranslationsKey: 'storiesScreen_Title',
    }),
    () => Tours,
  );

  Navigation.registerComponent(
    'tourStop',
    sceneCreator(TourStop, store, {
      screenName: 'tourStop',
      screenType: SCREEN_TYPES.screen,
      // TODO: This changes dynamically by the tourStop selected
      titleTranslationsKey: 'storiesScreen_Title',
    }),
    () => TourStop,
  );

  Navigation.registerComponent(
    'search',
    sceneCreator(Search, store, {
      screenName: 'search',
      screenType: SCREEN_TYPES.bottomTabWithNavBar,
      titleTranslationsKey: 'searchScreen_Title',
    }),
    () => Search,
  );

  Navigation.registerComponent(
    'info',
    sceneCreator(Info, store, {
      screenName: 'info',
      screenType: SCREEN_TYPES.bottomTab,
      titleTranslationsKey: 'museumScreen_Title',
    }),
    () => Info,
  );

  Navigation.registerComponent(
    'settings',
    sceneCreator(Settings, store, {
      screenName: 'settings',
      screenType: SCREEN_TYPES.screenWithNavBar,
      titleTranslationsKey: 'settingsScreen_Title',
    }),
    () => Settings,
  );

  Navigation.registerComponent(
    'amenities',
    sceneCreator(Amenities, store, {
      screenName: 'amenities',
      screenType: SCREEN_TYPES.screenWithNavBar,
      titleTranslationsKey: 'amenitiesScreen_Title',
    }),
    () => Amenities,
  );

  Navigation.registerComponent(
    'tutorialWelcome',
    sceneCreator(TutorialWelcome, store, {
      screenName: 'tutorialWelcome',
      screenType: SCREEN_TYPES.screenWithNavBar,
    }),
    () => TutorialWelcome,
  );

  Navigation.registerComponent(
    'tutorialLanguage',
    sceneCreator(TutorialLanguage, store, {
      screenName: 'tutorialLanguage',
      screenType: SCREEN_TYPES.screenWithNavBar,
      titleTranslationsKey: 'settingsScreen_Title',
    }),
    () => TutorialLanguage,
  );

  Navigation.registerComponent(
    'aboutMuseum',
    sceneCreator(AboutMuseum, store, {
      screenName: 'aboutMuseum',
      screenType: SCREEN_TYPES.screenWithNavBar,
      titleTranslationsKey: 'aboutScreen_Title',
    }),
    () => AboutMuseum,
  );

  Navigation.registerComponent(
    'aboutApp',
    sceneCreator(AboutApp, store, {
      screenName: 'aboutApp',
      screenType: SCREEN_TYPES.screenWithNavBar,
      titleTranslationsKey: 'aboutScreen_Title',
    }),
    () => AboutApp,
  );

  Navigation.registerComponent(
    'bottomPlayer',
    sceneCreator(BottomPlayer, store, {
      screenName: 'bottomPlayer',
      screenType: SCREEN_TYPES.overlay,
    }),
    () => BottomPlayer,
  );
};

export default registerScreens;
