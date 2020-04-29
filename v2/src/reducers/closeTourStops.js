import { UPDATE_BEACONS } from "../actions/beacon";

import { RESET } from "../actions/device";

// TODO: In the future load data from a database to prevent memory pressure
import blockRules from "../data/beaconBlockRules.json";

import { Tour } from "../models/tour";
const tourStopsWithRegions = Tour.allRealmObjects()
  .sorted("order")
  .filtered("regions.@count > 0");

import { Stop } from "../models/stop";
const audioContentWithRegions = Stop.allRealmObjects().filtered(
  "region != null AND region != ''"
);

import allAmenities from "../data/amenities";

import { _, includes } from "lodash";

export const initialState = {
  regions: [],
  previousRegions: [],
  detectedFloor: null,
  detectedAmenities: [],
  tourStops: [],
  audioContent: []
};

export function closeTourStops(state = initialState, action) {
  switch (action.type) {
    case RESET: {
      return initialState;
    }

    case UPDATE_BEACONS: {
      if (action.newBeacons.length === 0) {
        return Object.assign({}, state, {
          regions: [],
          detectedFloor: null,
          tourStops: [],
          detectedAmenities: [],
          audioContent: []
        });
      }

      // 1. Filter out blocked beacons
      const beaconsToBlock = [];
      const beacons = _.chain(action.newBeacons)
        .reduce((beaconList, beaconUUID) => {
          const foundBeacon = blockRules[beaconUUID];

          if (foundBeacon != null) {
            beaconList.push(foundBeacon);

            for (const block of foundBeacon.blocks) {
              if (!includes(beaconsToBlock, block)) {
                beaconsToBlock.push(block);
              }
            }
          }

          return beaconList;
        }, [])
        .filter(beacon => {
          return !includes(beaconsToBlock, beacon.uuid);
        })
        .value();

      // 2. Find out the users floor and regions by the remaining beacons
      // A. Detect the floor the user is on
      const detectedFloors = _(beacons)
        .flatMap("floor")
        .uniq()
        .value();

      // Only update floor if unanimous
      let detectedFloor;
      if (detectedFloors.length !== 1) {
        detectedFloor = state.detectedFloor;
      } else {
        detectedFloor = detectedFloors[0];
      }

      // B. Detect the regions
      const previousRegions = _(beacons)
        .flatMap("region")
        .uniq()
        .value();

      // Only update regions if detected twice in a row
      let regions;
      if (state.regions.length === 0) {
        regions = previousRegions;
      } else {
        regions = _(state.previousRegions)
          .filter(region => {
            return includes(previousRegions, region);
          })
          .value();
      }

      if (regions.length === 0) {
        return Object.assign({}, state, {
          regions: state.regions,
          previousRegions,
          detectedFloor,
          detectedAmenities: state.detectedAmenities,
          tourStops: state.tourStops,
          audioContent: state.audioContent
        });
      }

      // 3. Find the tour stops with the returned regions
      const tourStopQuery = regions
        .map(region => {
          return `ANY regions.value = "${region}"`;
        }, "")
        .join(" OR ");
      const showTourStops = tourStopsWithRegions.filtered(tourStopQuery);

      const audioContentQuery = regions
        .map(region => {
          return `region = "${region}"`;
        }, "")
        .join(" OR ");
      const showAudioContent = audioContentWithRegions.filtered(
        audioContentQuery
      );

      const detectedAmenities = allAmenities[detectedFloor].amenities;

      return Object.assign({}, state, {
        regions,
        previousRegions,
        detectedFloor,
        detectedAmenities,
        tourStops: showTourStops,
        audioContent: _.uniqBy(showAudioContent, "id")
      });
    }

    default:
      return state;
  }
}
