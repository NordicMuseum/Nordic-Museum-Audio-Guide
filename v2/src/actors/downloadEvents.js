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
    const tenMins = 1000 * 10 * 5;
    const debugMode = false;
    var count = 0;
    var testModule = new XMLHttpRequest();

    urlS = debugMode
      ? "https://www.calendarlabs.com/ical-calendar/ics/71/Sweden_Holidays.ics"
      : "https://www.nordiskamuseet.se/calendar/ical/ical/calendar-nordiska-museet.ics";
    //const file = fs.createWriteStream("cal_raw.txt");

    //

    updateEvents();

    //

    setInterval(async () => {
      resultstr = await getCalStr(true, true);
      ++count;

      for (i = 0; i < resultstr.length; i++) {
        // THIS IS WHERE WE PROCESS OUTPUT STRING(S)
        var isEmpty = false;
        if (resultstr[0].time == "NO_EVENTS") isEmpty = true;

        //END OF ABOVE
        console.log("for-loop iteration is currently: ", i);
        if (isEmpty) {
          this._dispatch(
            updateEvents({
              [i]: [count] //"There are no more events today."]
            })
          );
        } else {
          this._dispatch(
            updateEvents({
              [i]: [
                resultstr[i].title,
                resultstr[i].date,
                resultstr[i].time,
                resultstr[i].desc,
                resultstr[i].URL
              ]
            })
          );
        }
      } // end of for-loop.
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

let downloadEvents = async () => {
  resultstr = await getCalStr(true, true);

  for (i = 0; i < resultstr.length; i++) {
    // THIS IS WHERE WE PROCESS OUTPUT STRING(S)
    var isEmpty = false;
    if (resultstr[0].time == "NO_EVENTS") isEmpty = true;

    //END OF ABOVE
    console.log("for-loop iteration is currently: ", i);
    if (isEmpty) {
      this._dispatch(
        updateEvents({
          [i]: [count] //"There are no more events today."]
        })
      );
    } else {
      this._dispatch(
        updateEvents({
          [i]: [
            resultstr[i].title,
            resultstr[i].date,
            resultstr[i].time,
            resultstr[i].desc,
            resultstr[i].URL
          ]
        })
      );
    }
  }
};
