import { NativeEventEmitter, NativeModules } from "react-native";

import { restartApp } from "../actions/device";

class ChargingActor {
  constructor(store) {
    this._store = store;
    this._dispatch = store.dispatch;

    const deviceInfoEmitter = new NativeEventEmitter(
      NativeModules.RNDeviceInfo
    );

    deviceInfoEmitter.addListener(
      "RNDeviceInfo_powerStateDidChange",
      async ({ batteryState }) => {
        const museumMode = this._store.getState().device.museumMode;
        if (batteryState === "charging" && museumMode) {
          this._dispatch(restartApp());
        }
      }
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
