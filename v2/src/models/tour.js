import {
  realmDeleteHelper,
  realmDeleteAllHelper,
  realmObjectHelper,
  allRealmObjectsHelper,
  realmObjectIsInvalidHelper,
} from '../realm';

import { Stop } from './stop';
import { StringValue } from './stringValue';

export class Tour {
  static NAME = 'Tour';

  static schema = {
    name: Tour.NAME,
    primaryKey: 'uuid',
    properties: {
      uuid: { type: 'string' },
      floor: { type: 'string' },
      order: { type: 'int' },
      title: { type: 'string' },
      // Realm does not allow advanced queries on primitive types
      // So we are wrapped a primitive type in an object type
      regions: { type: `${StringValue.NAME}[]` },
      category: { type: 'string?' },
      url: { type: 'string?' },
      imageAccessibilityLabel: { type: 'string?' },
      imageWidth: { type: 'int' },
      imageHeight: { type: 'int' },
      shortCredit: { type: 'string' },
      longCredit: { type: 'string' },
      duration: { type: 'string' },
      audioContent: { type: `${Stop.NAME}[]` },
    },
  };

  // inserting is omitted on purpose because realm inserts are expensive
  // so should be done as a single block.

  static realmDelete(uuidKey) {
    return realmDeleteHelper(Tour.NAME, uuidKey);
  }

  static realmDeleteAll() {
    return realmDeleteAllHelper(Tour.NAME);
  }

  static realmObject(uuidKey) {
    return realmObjectHelper(Tour.NAME, uuidKey);
  }

  static allRealmObjects() {
    return allRealmObjectsHelper(Tour.NAME);
  }

  static jsonStop(realmObject) {
    console.log('');
    console.log('Converting stop');
    console.log(realmObject);
    console.log(realmObject.audioContent);
    return realmObject.audioContent.split(',').map(content => {
      console.log(content);
      return Stop.json(content);
    });
  }

  static json(uuidKey) {
    const realmObject = Tour.realmObject(uuidKey);

    if (realmObjectIsInvalidHelper(realmObject)) {
      return {};
    }

    return {
      uuid: realmObject.uuid,
      order: realmObject.order,
      floor: realmObject.floor,
      title: realmObject.shortTitle,
      regions: realmObject.regions,
      category: realmObject.category,
      imageURL: realmObject.imageURL,
      imageAccessibilityLabel: realmObject.imageAccessibilityLabel,
      imageWidth: realmObject.imageWidth,
      imageHeight: realmObject.imageHeight,
      shortCredit: realmObject.shortCredit,
      longCredit: realmObject.longCredit,
      duration: realmObject.duration,
      audioContent: Tour.jsonStop(realmObject),
    };
  }
}
