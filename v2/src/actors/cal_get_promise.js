function processResult(lines, dayOnly) {
  var today = new Date();
  var date_now_f =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);
  HAR_HITTAT_VEVENT = false;
  found_min_one = false;
  var events = []; /*initalize JS object */
  var events_i = 0; /*COUNTER */

  for (i = 0; i < lines.length; i++) {
    if (lines[i].includes("BEGIN:VEVENT")) {
      HAR_HITTAT_VEVENT = true;
      events[events_i] = { date: "", time: "", title: "", desc: "", URL: "" };
    }
    if (lines[i].includes("DTSTART") && HAR_HITTAT_VEVENT) {
      var date_raw = lines[i].split(":");
      var date_tot = date_raw[1].replace("\r", "").split("T");
      var date_f =
        date_tot[0].slice(0, 4) +
        "-" +
        date_tot[0].slice(4, 6) +
        "-" +
        date_tot[0].slice(6, 8);
      events[events_i]["date"] = date_f;
      if (lines[i].length == 46) {
        var time_f = date_tot[1].slice(0, 2) + ":" + date_tot[1].slice(2, 4);
        events[events_i]["time"] = time_f;
      }
    } else if (lines[i].includes("SUMMARY") && HAR_HITTAT_VEVENT) {
      var title = lines[i].split(":");
      events[events_i]["title"] = title[1].replace("\r", "");
    } else if (lines[i].includes("DESCRIPTION") && HAR_HITTAT_VEVENT) {
      var desc = lines[i].split("DESCRIPTION:");
      events[events_i]["desc"] = desc[1];
    } else if (lines[i].includes("URL;TYPE=URI") && HAR_HITTAT_VEVENT) {
      var URL = lines[i].split("URL;TYPE=URI:");
      events[events_i]["URL"] = URL[1].replace("\r", "");
    } else if (lines[i].includes("END:VEVENT") && HAR_HITTAT_VEVENT) {
      //console.log('_'+events[events_i]["date"]+'_', "IS NOT EQUAL? ", '_'+date_now_f+'_')
      if (dayOnly && events[events_i]["date"] != date_now_f) {
        HAR_HITTAT_VEVENT = false;
      } else {
        events_i++;
        HAR_HITTAT_VEVENT = false;
        if (found_min_one == false) found_min_one = true;
      }
    }
  }
  if (found_min_one) {
    var final = events;
  } else {
    var final = [{ date: "", time: "NO_EVENTS", title: "", desc: "", URL: "" }];
  }
  return final;
}

export const getCalStr = function(debugMode, dayOnly, broken) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    console.log("CAL_GET_PROMISE1");
    url = debugMode
      ? "https://www.calendarlabs.com/ical-calendar/ics/71/Sweden_Holidays.ics"
      : "https://www.nordiskamuseet.se/calendar/ical/ical/calendar-nordiska-museet.ics";
    if (broken) url = "This is not a proper URL";
    request.open("GET", url, true);
    var today = new Date();
    var date_now_f =
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);
    request.send(null);
    request.onreadystatechange = function() {
      console.log("CAL_GET_PROMISE2");
      //checks if response is ready. Takes time.
      setTimeout(function() {
        reject("TEST ERROR"), 1000;
      });
      if (request.readyState === 4 && request.status === 200) {
        console.log("CAL_GET_PROMISE3");
        var type = request.getResponseHeader("Content-Type");
        console.log("CAL_GET_PROMISE4");

        if (type.indexOf("text") !== 1) {
          console.log("CAL_GET_PROMISE5");
          var to_split = request.responseText;
          //console.log("this is before split", to_split);
          var lines = to_split.split("\n");
          lines.forEach(element => element.replace("\n", "\\n"));
          //this is where we process the data given by request.
          final = processResult(lines, dayOnly);
          resolve(final);
          // END OF: if (type.indexOf("text") !== 1)
        }
        // END OF: if (request.readyState === 4 && request.status === 200)
      } else console.log("got after response ready");
      //reject(new error("LOLOLOL"));
    };
  });
};
