import React, { Component } from "react";
import { BackHandler } from "react-native";

import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import NearMe from "./containers/nearMe";
import Tours from "./containers/tours";
import TourStop from "./containers/tourStop";
import Search from "./containers/search";
import Info from "./containers/info";
import Settings from "./containers/settings";
import Amenities from "./containers/amenities";
import TutorialWelcome from "./containers/tutorialWelcome";
import TutorialLanguage from "./containers/tutorialLanguage";
import AboutMuseum from "./containers/aboutMuseum";
import AboutApp from "./containers/aboutApp";
import BottomPlayer from "./containers/bottomPlayer";
import DownloadAudio from "./containers/downloadAudio";

import Analytics from "appcenter-analytics";

const HARDWARE_BACK_BUTTON_EVENT = "hardwareBackPress";

const sceneCreator = (
  SceneComp,
  store,
  { screenName, screenType, titleTranslationsKey }
) => {
  return () =>
    class SceneWrapper extends Component {
      static get options() {
        return { ...SceneComp.options };
      }

      constructor(props) {
        super(props);
        this.sceneCompRef = React.createRef();

        if (screenName !== "bottomPlayer") {
          Navigation.events().bindComponent(this);
        }
      }

      componentDidAppear() {
        Analytics.trackEvent("Screen Viewed", { screenName });

        BackHandler.addEventListener(
          HARDWARE_BACK_BUTTON_EVENT,
          this.handleHardwareBack
        );
      }

      componentDidDisappear() {
        BackHandler.removeEventListener(
          HARDWARE_BACK_BUTTON_EVENT,
          this.handleHardwareBack
        );
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
    };
};

const registerScreens = store => {
  Navigation.registerComponent(
    "nearMe",
    sceneCreator(NearMe, store, {
      screenName: "nearMe"
    }),
    () => NearMe
  );

  Navigation.registerComponent(
    "tours",
    sceneCreator(Tours, store, {
      screenName: "tours"
    }),
    () => Tours
  );

  Navigation.registerComponent(
    "tourStop",
    sceneCreator(TourStop, store, {
      screenName: "tourStop"
    }),
    () => TourStop
  );

  Navigation.registerComponent(
    "search",
    sceneCreator(Search, store, {
      screenName: "search"
    }),
    () => Search
  );

  Navigation.registerComponent(
    "info",
    sceneCreator(Info, store, {
      screenName: "info"
    }),
    () => Info
  );

  Navigation.registerComponent(
    "settings",
    sceneCreator(Settings, store, {
      screenName: "settings"
    }),
    () => Settings
  );

  Navigation.registerComponent(
    "amenities",
    sceneCreator(Amenities, store, {
      screenName: "amenities"
    }),
    () => Amenities
  );

  Navigation.registerComponent(
    "tutorialWelcome",
    sceneCreator(TutorialWelcome, store, {
      screenName: "tutorialWelcome"
    }),
    () => TutorialWelcome
  );

  Navigation.registerComponent(
    "tutorialLanguage",
    sceneCreator(TutorialLanguage, store, {
      screenName: "tutorialLanguage"
    }),
    () => TutorialLanguage
  );

  Navigation.registerComponent(
    "aboutMuseum",
    sceneCreator(AboutMuseum, store, {
      screenName: "aboutMuseum"
    }),
    () => AboutMuseum
  );

  Navigation.registerComponent(
    "aboutApp",
    sceneCreator(AboutApp, store, {
      screenName: "aboutApp"
    }),
    () => AboutApp
  );

  Navigation.registerComponent(
    "downloadAudio",
    sceneCreator(DownloadAudio, store, {
      screenName: "downloadAudio"
    }),
    () => DownloadAudio
  );

  Navigation.registerComponent(
    "bottomPlayer",
    sceneCreator(BottomPlayer, store, {
      screenName: "bottomPlayer"
    }),
    () => BottomPlayer
  );
};

export default registerScreens;
