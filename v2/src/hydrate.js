import { getRealmInstance } from './realm';
import { Tour } from './models/tour';

const uuid = require('uuid');
const tours = require('./data/tours');
const realm = getRealmInstance();

function saveToRealm(tour) {
  realm.create(Tour.NAME, {
    ...tour,
    uuid: uuid.v1(),
    floor: tour.floor.toString(),
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
      var realmObjects = realm.objects(Tour.NAME);
      realm.delete(realmObjects);

      for (const tour of tours) {
        saveToRealm(tour);
      }
    });
  }
}
