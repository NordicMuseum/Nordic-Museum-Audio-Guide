import { DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';

// import { reset } from '../actions/device';
import { updateBeacons } from '../actions/beacon';

class BeaconActor {
  constructor(store) {
    this.store = store;
    this.dispatch = store.dispatch;

    const { rangingUUID, rangingIdentifier } = store.getState().beacon;

    Beacons.getAuthorizationStatus(status => {
      console.log({ status });
    });

    const region = {
      identifier: rangingIdentifier,
      uuid: rangingUUID,
    };

    console.log(region);

    // Request for authorization while the app is open
    Beacons.requestWhenInUseAuthorization();

    Beacons.startRangingBeaconsInRegion(region);
    Beacons.startUpdatingLocation();

    const subscription = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      this.detectedBeacons,
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
