import {
  realmDeleteHelper,
  realmDeleteAllHelper,
  realmObjectHelper,
  allRealmObjectsHelper,
  realmObjectIsInvalidHelper
} from "../realm";

export class Stop {
  static NAME = "Stop";

  static schema = {
    name: Stop.NAME,
    primaryKey: "uuid",
    properties: {
      id: { type: "string" },
      uuid: { type: "string" },
      region: { type: "string?" },
      category: { type: "string" },
      title: { type: "string" },
      transcript: { type: "string?" }
    }
  };

  // inserting is omitted on purpose because realm inserts are expensive
  // so should be done as a single block.

  static realmDelete(uuidKey) {
    return realmDeleteHelper(Stop.NAME, uuidKey);
  }

  static realmDeleteAll() {
    return realmDeleteAllHelper(Stop.NAME);
  }

  static realmObject(uuidKey) {
    return realmObjectHelper(Stop.NAME, uuidKey);
  }

  static allRealmObjects() {
    return allRealmObjectsHelper(Stop.NAME);
  }

  static json(realmObject) {
    if (realmObjectIsInvalidHelper(realmObject)) {
      return {};
    }

    return {
      id: realmObject.id,
      uuid: realmObject.uuid,
      category: realmObject.category,
      title: realmObject.title,
      duration: realmObject.duration,
      audioURL: realmObject.audioURL,
      transcript: realmObject.transcript
    };
  }
}
