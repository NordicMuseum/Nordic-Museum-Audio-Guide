import { UPDATE_BEACONS } from '../actions/beacon';

import { RESET } from '../actions/device';

// TODO: In the future load data from a database to prevent memory pressure
import blockRules from '../data/beaconBlockRules.json';

import { Tour } from '../models/tour';
const tourStops = [
  {
    floor: 4,
    order: 4,
    uuid: 1,
    regions: ['Swedish Folk Art'],
    title: 'tours_swedishFolkArt_title',
    audioContent: [
      {
        id: '451',
        uuid: '451',
        region: 'Swedish Folk Art',
        category: 'HIGHLIGHT',
        title: 'stops_theShapesOfTheGrandfatherClocks_title',
        duration: 'stops_theShapesOfTheGrandfatherClocks_duration',
      },
      {
        id: '456',
        uuid: '456',
        region: 'Swedish Folk Art',
        category: 'HIGHLIGHT',
        title: 'stops_thePowerOfTheChair_title',
        duration: 'stops_thePowerOfTheChair_duration',
      },
      {
        id: '448',
        uuid: '448',
        category: 'INTRODUCTION',
        title: 'stops_aJourneyOfDiscoveryInTheWorldOfVernacularArt_title',
        duration: 'stops_aJourneyOfDiscoveryInTheWorldOfVernacularArt_duration',
      },
      {
        id: '449',
        uuid: '449',
        category: 'CONTEXT',
        title: 'stops_fromProposalToWedding_title',
        duration: 'stops_fromProposalToWedding_duration',
      },
      {
        id: '450',
        uuid: '450',
        category: 'CONTEXT',
        title: 'stops_deathsAndFunerals_title',
        duration: 'stops_deathsAndFunerals_duration',
      },
      {
        id: '452',
        uuid: '452',
        category: 'CONTEXT',
        title: 'stops_theImageOfMan_title',
        duration: 'stops_theImageOfMan_duration',
      },
      {
        id: '453',
        uuid: '453',
        category: 'CONTEXT',
        title: 'stops_natureAsASourceOfInspiration_title',
        duration: 'stops_natureAsASourceOfInspiration_duration',
      },
      {
        id: '454',
        uuid: '454',
        category: 'CONTEXT',
        title: 'stops_dalecarlianFlowerPainting_title',
        duration: 'stops_dalecarlianFlowerPainting_duration',
      },
      {
        id: '455',
        uuid: '455',
        category: 'CONTEXT',
        title: 'stops_decorativeShelvesInPlacesOfHonour_title',
        duration: 'stops_decorativeShelvesInPlacesOfHonour_duration',
      },
      {
        id: '457',
        uuid: '457',
        category: 'CONTEXT',
        title: 'stops_bibleStoriesOnCottageWalls_title',
        duration: 'stops_bibleStoriesOnCottageWalls_duration',
      },
      {
        id: '458',
        uuid: '458',
        category: 'CONTEXT',
        title: 'stops_preciousTextiles_title',
        duration: 'stops_preciousTextiles_duration',
      },
      {
        id: '459',
        uuid: '459',
        category: 'CONTEXT',
        title: 'stops_coatsOfArmsAndRoyalMonograms_title',
        duration: 'stops_coatsOfArmsAndRoyalMonograms_duration',
      },
      {
        id: '460',
        uuid: '460',
        category: 'CONTEXT',
        title: 'stops_vernacularArtToday_title',
        duration: 'stops_vernacularArtToday_duration',
      },
    ],
    imageURL: 'swedishFolkArt.png',
    imageWidth: 750,
    imageHeight: 345,
    imageAccessibilityLabel: 'tours_swedishFolkArt_imageAccessibilityLabel',
    shortCredit: 'tours_swedishFolkArt_shortCredit',
    longCredit: 'tours_swedishFolkArt_longCredit',
    duration: 'tours_swedishFolkArt_duration',
  },
];

import { Stop } from '../models/stop';
const audioContent = [
  {
    uuid: '451',
    id: '451',
    region: 'Swedish Folk Art',
    category: 'HIGHLIGHT',
    title: 'stops_theShapesOfTheGrandfatherClocks_title',
    duration: 'stops_theShapesOfTheGrandfatherClocks_duration',
  },
  {
    uuid: '456',
    id: '456',
    region: 'Swedish Folk Art',
    category: 'HIGHLIGHT',
    title: 'stops_thePowerOfTheChair_title',
    duration: 'stops_thePowerOfTheChair_duration',
  },
];

import { _, includes } from 'lodash';

export const initialState = {
  regions: ['Traditions'],
  previousRegions: [],
  detectedFloor: 2,
  tourStops: tourStops, // .filtered(`regions CONTAINS 'Traditions'`),
  audioContent: audioContent, // audioContent.filtered(`regions CONTAINS "Traditions"`),
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
          audioContent: [],
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
        .flatMap('floor')
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
        .flatMap('region')
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
          tourStops: state.tourStops,
          audioContent: state.audioContent,
        });
      }

      // 3. Find the tour stops with the returned regions
      const query = `regions CONTAINS "${regions.join(
        '" OR regions CONTAINS "',
      )}"`;
      const showTourStops = tourStops.filtered(query);
      const showAudioContent = audioContent.filtered(query);

      return Object.assign({}, state, {
        regions,
        previousRegions,
        detectedFloor,
        tourStops: showTourStops,
        audioContent: showAudioContent,
      });
    }

    default:
      return state;
  }
}
