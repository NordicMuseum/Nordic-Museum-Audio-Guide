import React from 'react';
import { Settings } from 'react-native';
import { Provider } from 'react-redux';

import RootContainer from './containers/root';
import { configureStore } from './store';

import DeviceInfo from 'react-native-device-info';

import GoogleAnalytics from 'react-native-google-analytics-bridge';
import { trackingID } from './data/trackingID';

import { WayfindingActor } from './actors/wayfindingActor';
import { LocalizationActor } from './actors/localizationActor';

import { decideIfToShowTutorial } from './actions/tutorial';
import { analyticsTrackDeviceType } from './actions/analytics';

const appVersion = `${DeviceInfo.getVersion()}.${DeviceInfo.getBuildNumber()}`;
const lastAppVersion = Settings.get('LastAppVersion');
const showTutorialEveryTime = Settings.get('ShowTutorialEveryTime');
const localeChangedFromSettings = Settings.get('localeChangedFromSettings');

const newVersion = lastAppVersion == null || lastAppVersion !== appVersion;

// Hydrate the DB
import hydrate from './data/hydrate';
hydrate(newVersion || __DEV__);
const store = configureStore();
store.dispatch(
  decideIfToShowTutorial(showTutorialEveryTime && !localeChangedFromSettings, newVersion)
);

Settings.set({ localeChangedFromSettings: false });

if (newVersion) {
  Settings.set({ LastAppVersion: appVersion });
}

GoogleAnalytics.setTrackerId(trackingID);
GoogleAnalytics.setDryRun(__DEV__);

analyticsTrackDeviceType(!showTutorialEveryTime);

const localizationActor = new LocalizationActor(store);
const wayfindingActor = new WayfindingActor(store);
wayfindingActor.startListening();

const App = () => {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
};

export default App;
