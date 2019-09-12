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

const HARDWARE_BACK_BUTTON_EVENT = 'hardwareBackPress';

const sceneCreator = (SceneComp, store) => {
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
        // TODO: Analytics for screen show

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
        console.log(this.props);

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
  Navigation.registerComponent('nearMe', sceneCreator(NearMe, store));
  Navigation.registerComponent('tours', sceneCreator(Tours, store));
  Navigation.registerComponent('tourStop', sceneCreator(TourStop, store));
  Navigation.registerComponent('search', sceneCreator(Search, store));
  Navigation.registerComponent('info', sceneCreator(Info, store));
  Navigation.registerComponent('settings', sceneCreator(Settings, store));
  Navigation.registerComponent('amenities', sceneCreator(Amenities, store));
  Navigation.registerComponent('welcome', sceneCreator(Welcome, store));
  Navigation.registerComponent('aboutMuseum', sceneCreator(AboutMuseum, store));
  Navigation.registerComponent('aboutApp', sceneCreator(AboutApp, store));
};

export default registerScreens;
