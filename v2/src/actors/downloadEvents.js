// import { updateEvents } from '../actions/device';

class DownloadEventsActor {
  constructor(store) {
    this._store = store;
    this._dispatch = store.dispatch;

    // this._dispatch(updateEvents());
  }
}

let _downloadEventsActor;
export const downloadEventsActor = store => {
  if (_downloadEventsActor) {
    return _downloadEventsActor;
  }

  _downloadEventsActor = new DownloadEventsActor(store);
  return _downloadEventsActor;
};
