
import {
  UPDATE_BEACONS,
  START_SCANNING_FOR_BEACONS_SUCCESS,
  START_SCANNING_FOR_BEACONS_FAILURE,
  UPDATE_WAYFINDING_STATUS,
  LOCATION_SERVICES_STATUS_NOTDETERMINED,
} from '../actions/beacon';

export const initialState = {
  bluetoothOn: false,
  locationServicesStatus: LOCATION_SERVICES_STATUS_NOTDETERMINED,
  tracking: null,
  rangingUUID: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
  rangingIdentifier: 'Warhol Accessibility Project App',
  // beacons is only useful for debugging
  beacons:
  [
    // "majorNumber:minorNumber",
  ],
};

export function beacon(state = initialState, action) {
  switch (action.type) {
    case UPDATE_WAYFINDING_STATUS: {
      return Object.assign({},
        state,
        {
          tracking: false,
          bluetoothOn: action.bluetoothOn,
          locationServicesStatus: action.locationServicesStatus,
        }
      );
    }

    case START_SCANNING_FOR_BEACONS_SUCCESS: {
      return Object.assign({},
        state,
        {
          tracking: true,
          rangingIdentifier: action.rangingIdentifier,
          rangingUUID: action.rangingUUID,
        }
      );
    }

    case START_SCANNING_FOR_BEACONS_FAILURE: {
      return Object.assign({},
        state,
        {
          tracking: false,
        }
      );
    }

    case UPDATE_BEACONS: {
      if (__DEV__) {
        return Object.assign({},
          state,
          {
            beacons: action.newBeacons,
          }
        );
      }

      return state;
    }

    default:
      return state;
  }
}
