import React, {Component} from 'react';
import {BackHandler} from 'react-native';

import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import NearMe from './containers/nearMe';
import Tours from './containers/tours';
import TourStop from './containers/tourStop';
import Search from './containers/search';
import Info from './containers/info';
import Settings from './containers/settings';
import Amenities from './containers/amenities';
import Welcome from './containers/welcome';
import AboutMuseum from './containers/aboutMuseum';
import AboutApp from './containers/aboutApp';
import BottomPlayer from './containers/bottomPlayer';

import Analytics from 'appcenter-analytics';

const HARDWARE_BACK_BUTTON_EVENT = 'hardwareBackPress';

const sceneCreator = (SceneComp, screenName, store) => {
  return () =>
    class SceneWrapper extends Component {
      static get options() {
        return {...SceneComp.options};
      }

      constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
      }

      componentDidAppear() {
        Analytics.trackEvent(screenName, {Category: 'ScreenViewed'});

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

      handleHardwareBack = () => {
        // TODO: Logic for Android back button
      };

      render() {
        return (
          <Provider store={store}>
            <SceneComp {...this.props} />
            <BottomPlayer />
          </Provider>
        );
      }
    };
};

const registerScreens = store => {
  Navigation.registerComponent('nearMe', sceneCreator(NearMe, 'nearMe', store));
  Navigation.registerComponent('tours', sceneCreator(Tours, 'tours', store));
  Navigation.registerComponent(
    'tourStop',
    sceneCreator(TourStop, 'tourStop', store),
  );
  Navigation.registerComponent('search', sceneCreator(Search, 'search', store));
  Navigation.registerComponent('info', sceneCreator(Info, 'info', store));
  Navigation.registerComponent(
    'settings',
    sceneCreator(Settings, 'settings', store),
  );
  Navigation.registerComponent(
    'amenities',
    sceneCreator(Amenities, 'amenities', store),
  );
  Navigation.registerComponent(
    'welcome',
    sceneCreator(Welcome, 'welcome', store),
  );
  Navigation.registerComponent(
    'aboutMuseum',
    sceneCreator(AboutMuseum, 'aboutMuseum', store),
  );
  Navigation.registerComponent(
    'aboutApp',
    sceneCreator(AboutApp, 'aboutApp', store),
  );
};

export default registerScreens;
