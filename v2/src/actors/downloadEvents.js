import { updateEvents } from "../actions/device";

import { getCalStr } from "./cal_get_promise";

// require("./cal_get_promise.js")();
//const https = require("https");
//const fs = require("fs");

class DownloadEventsActor {
  constructor(store) {
    this._store = store;
    this._dispatch = store.dispatch;

    // const tenMins = 1000 * 60 * 10;
    const tenMins = 1500;
    var count = 0;
    const debugMode = true;

    var testModule = new XMLHttpRequest();

    urlS = debugMode
      ? "https://www.calendarlabs.com/ical-calendar/ics/71/Sweden_Holidays.ics"
      : "https://www.nordiskamuseet.se/calendar/ical/ical/calendar-nordiska-museet.ics";
    //const file = fs.createWriteStream("cal_raw.txt");

    setInterval(async () => {
      const currentTime = new Date();
      const currentTimeStr = await currentTime.toISOString();
      ++count;
      resultstr = await getCalStr(false, true);

      this._dispatch(
        updateEvents({
          //Download and store the current dates events
          //as an array of strings

          ["test"]: [resultstr]
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
