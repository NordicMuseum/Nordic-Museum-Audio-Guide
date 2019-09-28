import { getRealmInstance } from './realm';
import { Tour } from './models/tour';
import { StringValue } from './models/stringValue';

const uuid = require('uuid');
const tours = require('./data/tours');
const realm = getRealmInstance();

function saveToRealm(tour) {
  const regions =
    tour.regions == null
      ? []
      : tour.regions.map(str => {
          return realm.create(StringValue.NAME, {
            value: str,
          });
        });

  realm.create(Tour.NAME, {
    ...tour,
    uuid: uuid.v1(),
    floor: tour.floor.toString(),
    regions,
    audioContent: tour.audioContent.map(audio => {
      audio.uuid = uuid.v4();
      audio.id = audio.id.toString();
      return audio;
    }),
  });
}

export default function hydrate(newVersion) {
  if (newVersion) {
    realm.write(() => {
      realm.deleteAll();

      for (const tour of tours) {
        saveToRealm(tour);
      }
    });
  }
}
