import { updateEvents } from "../actions/device";

class DownloadEventsActor {
  constructor(store) {
    this._store = store;
    this._dispatch = store.dispatch;

    // const tenMins = 1000 * 60 * 10;
    const tenMins = 1000;

    setInterval(() => {
      const currentTime = new Date();
      const currentTimeStr = currentTime.toISOString();

      this._dispatch(
        updateEvents({
          //Download and store the current dates events
          //as an array of strings.
          [currentTimeStr]: ["football", "playdate"]
        })
      );
    }, tenMins);
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
