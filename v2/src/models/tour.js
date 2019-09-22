import {
  realmDeleteHelper,
  realmDeleteAllHelper,
  realmObjectHelper,
  allRealmObjectsHelper,
  realmObjectIsInvalidHelper,
} from '../realm';

import { Stop } from './stop';

export class Tour {
  static NAME = 'Tour';

  static schema = {
    name: Tour.NAME,
    primaryKey: 'uuid',
    properties: {
      uuid: { type: 'string', optional: true },
      floor: { type: 'string' },
      order: { type: 'int' },
      title: { type: 'string' },
      regions: { type: 'string?[]', optional: true },
      category: { type: 'string', optional: true },
      url: { type: 'string', optional: true },
      imageaccessibilitylabel: { type: 'string', optional: true },
      imagewidth: { type: 'int' },
      imageheight: { type: 'int' },
      shortcredit: { type: 'string' },
      longcredit: { type: 'string' },
      duration: { type: 'string' },
      audiocontent: { type: 'list', objectType: Stop.NAME },
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
