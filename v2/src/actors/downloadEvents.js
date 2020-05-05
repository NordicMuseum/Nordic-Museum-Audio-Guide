import { updateEvents } from "../actions/device";

import { getCalStr } from "./cal_get_promise";

class DownloadEventsActor {
  constructor(store) {
    this._store = store;
    this._dispatch = store.dispatch;

    const period = 1000 * 60 * 10;

    getCal(this._dispatch);

    setInterval(async () => {
      getCal(this._dispatch);
    }, period);
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

async function getCal(dispatch) {
  debugM = false;
  dayOnly = true;
  broken = true;
  console.log("CALL TO getCal");

  server_connected = true;

  try {
    resultstr = await getCalStr(debugM, dayOnly, broken);
    console.log("this is resultstr", resultstr);
  } catch (e) {
    console.log("e: ", +e);
    server_connected = false;
  }

  if (server_connected) {
    var i = 0;
    for (i = 0; i < resultstr.length; i++) {
      var isEmpty = false;
      if (resultstr[0].time == "NO_EVENTS") isEmpty = true;

      if (isEmpty) {
        dispatch(
          updateEvents({
            [i]: ["There are no listed events today."]
          })
        );
      } else {
        if (resultstr[i].time != "")
          timedate = resultstr[i].date + " - " + resultstr[i].time;
        else timedate = resultstr[i].date;
        var title = "\n# " + resultstr[i].title;
        var desc = resultstr[i].desc;
        var url = resultstr[i].URL;
        dispatch(
          updateEvents({
            [i]: [
              resultstr[i].title,
              timedate,
              resultstr[i].desc,
              resultstr[i].URL
            ]
          })
        );
      }
    }
  } else {
    dispatch(
      updateEvents({
        [0]: ["Cannot reach server. The device is most likely offline."]
      })
    );
  }
}
