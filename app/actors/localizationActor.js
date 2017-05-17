import {
  AppState,
  NativeModules,
  Settings,
} from 'react-native';

const { RNI18n } = NativeModules;

import {
  switchLocale,
} from '../actions/localization';

export class LocalizationActor {
  constructor(store) {
    this.store = store;
    this.dispatch = store.dispatch;

    const reloadAppForRTLSwitch = Settings.get('reloadAppForRTLSwitch');

    if (reloadAppForRTLSwitch) {
      this.locale = Settings.get('reloadAppForRTLSwitchLocale');
      Settings.set({ reloadAppForRTLSwitch: false });
    } else {
      // stripping region FOR NOW, this will need to be handled
      this.locale = RNI18n.locale.slice(0, 2);
    }

    store.dispatch(switchLocale(this.locale));

    AppState.addEventListener('change', () => {
      // CHECK IF THE DEVICE LANGUAGE WAS CHANGED.
      const deviceLocale = RNI18n.locale.slice(0, 2);
      if (deviceLocale !== this.locale) {
        store.dispatch(switchLocale(deviceLocale));
      }
    });
  }
}
