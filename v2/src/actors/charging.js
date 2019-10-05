import { NativeEventEmitter, NativeModules } from 'react-native';
import RNRestart from 'react-native-restart';

import { setDefaultLocaleAndRTL } from '../appSettings';

class ChargingActor {
  constructor(store) {
    this.store = store;
    this.dispatch = store.dispatch;

    const deviceInfoEmitter = new NativeEventEmitter(
      NativeModules.RNDeviceInfo,
    );

    deviceInfoEmitter.addListener(
      'RNDeviceInfo_powerStateDidChange',
      async ({ batteryState }) => {
        const museumMode = this.store.getState().device.museumMode;
        if (batteryState === 'charging' && museumMode) {
          await setDefaultLocaleAndRTL();

          RNRestart.Restart();
        }
      },
    );
  }
}

let _chargingActor;
export const chargingActor = store => {
  if (_chargingActor) {
    return _chargingActor;
  }

  _chargingActor = new ChargingActor(store);
  return _chargingActor;
};
