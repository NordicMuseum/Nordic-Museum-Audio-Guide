
import Realm from 'realm';

import { TourStop } from './models/tourStop';
import { AudioContent } from './models/audioContent';
import { Durations } from './models/durations';

const SCHEMAVERSION = 1;


/* eslint-disable */
if (__DEV__) {
  // !Undocumented will most likely break in the future!
  // Used to delete DB from disk
  Realm.clearTestState();
  // !End Undocumented will most likely break in the future!
  console.log(`Realm DB path is: ${Realm.defaultPath}`);
}
/* eslint-enable */


// *** Realm Instance ***
let realmInstance;
export const getRealmInstance = () => {
  if (realmInstance == null) {
    realmInstance = new Realm({
      schema: [TourStop, AudioContent, Durations],
      schemaVersion: SCHEMAVERSION,
      migration(oldRealm, newRealm) {
        newRealm.deleteAll();
      },
    });
  }

  return realmInstance;
};


// *** Realm Helper Functions ***
export function realmDeleteHelper(realmType, uuidKey) {
  const realm = getRealmInstance();
  const realmObject = realm
    .objects(realmType)
    .filtered(`uuid == "${uuidKey}"`);

  realm.write(() => {
    realm.delete(realmObject);
  });

  return true;
}

export function realmDeleteAllHelper(realmType) {
  const realm = getRealmInstance();
  const realmObjects = realm.objects(realmType);

  realm.write(() => {
    realm.delete(realmObjects);
  });

  return true;
}

export function realmObjectHelper(realmType, uuidKey) {
  const realm = getRealmInstance();
  return realm
    .objects(realmType)
    .filtered(`uuid == "${uuidKey}"`);
}

export function allRealmObjectsHelper(realmType) {
  const realm = getRealmInstance();
  return realm.objects(realmType);
}

export function realmObjectIsInvalidHelper(realmObject) {
  return realmObject == null;
}
