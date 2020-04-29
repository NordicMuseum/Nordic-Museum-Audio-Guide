import { DeviceEventEmitter, Platform } from "react-native";
import Beacons from "react-native-beacons-manager";

// import { reset } from '../actions/device';
import { updateBeacons } from "../actions/beacon";

class BeaconActor {
  constructor(store) {
    this.store = store;
    this.dispatch = store.dispatch;

    const { rangingUUID, rangingIdentifier } = store.getState().beacon;

    const region = {
      identifier: rangingIdentifier,
      uuid: rangingUUID
    };

    Platform.select({
      ios: () => {
        Beacons.getAuthorizationStatus(status => {
          console.log({ status });
        });

        Beacons.requestWhenInUseAuthorization();

        Beacons.startRangingBeaconsInRegion(region);
        Beacons.startUpdatingLocation();
      },
      android: () => {
        // Tells the library to detect iBeacons
        Beacons.detectIBeacons();

        // Start detecting all iBeacons in the nearby
        try {
          Beacons.startRangingBeaconsInRegion(region);
          console.log(`Beacons ranging started succesfully!`);
        } catch (err) {
          console.log(`Beacons ranging not started, error: ${error}`);
        }
      }
    })();

    const subscription = DeviceEventEmitter.addListener(
      "beaconsDidRange",
      this.detectedBeacons
    );
  }

  detectedBeacons = data => {
    const beacons = data.beacons.map(beacon => {
      return `${beacon.major}:${beacon.minor}`;
    });

    this.dispatch(updateBeacons(beacons));
  };
}

let _beaconActor;
export const beaconActor = store => {
  if (_beaconActor) {
    return _beaconActor;
  }

  _beaconActor = new BeaconActor(store);
  return _beaconActor;
};
