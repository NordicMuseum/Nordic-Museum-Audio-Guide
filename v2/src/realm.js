import Realm from 'realm';

import { Tour } from './models/tour';
import { Stop } from './models/stop';

const SCHEMAVERSION = 1;

// *** Realm Instance ***
let realmInstance;
export const getRealmInstance = () => {
  if (realmInstance == null) {
    realmInstance = new Realm({
      schema: [Tour, Stop],
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
  const realmObject = realm.objects(realmType).filtered(`uuid == "${uuidKey}"`);

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
  return realm.objects(realmType).filtered(`uuid == "${uuidKey}"`);
}

export function allRealmObjectsHelper(realmType) {
  const realm = getRealmInstance();
  return realm.objects(realmType);
}

export function realmObjectIsInvalidHelper(realmObject) {
  return realmObject == null;
}
