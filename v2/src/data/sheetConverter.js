const port = 3000;
const fs = require("fs");
const _ = require("lodash");

// load in sheet
const sheetData = require("./raw.json");

var localizationStrings = {};
processStringsSheet();

var beacons = {};
processBeaconsSheet();

var amenities = {};
var amenitiesList = processSheet("Amenities");
var amenitiesByFloor = _.groupBy(amenitiesList, "floor");
for (floorNum in amenitiesByFloor) {
  var floor = {};
  floor["floor"] = floorNum;
  floor["label"] = "floor" + floorNum + "_label";
  floor["amenities"] = amenitiesByFloor[floorNum];
  amenities[floorNum] = floor;
}

var tours = processSheet("Tours");
var stops = processSheet("Stops");

tours.map(tour => {
  //console.log(tour);
  tour.audioContent = tour.audioContent.split(",").map(stopID => {
    try {
      return stops.filter(stop => {
        return stop.id == stopID;
      })[0];
    } catch (e) {
      console.log(
        "TOURS (" +
          tour.title +
          ") referenced stop " +
          stopID +
          " which does not exist in STOPS"
      );
    }
  });
  if (tour.regions !== undefined) tour.regions = tour.regions.split(",");
  return tour;
});

exportFiles();

// PROCESS GENERIC SHEET
function processSheet(sheetName) {
  try {
    var result = [];

    _.map(sheetData[sheetName], (row, i) => {
      var data = {};
      var label = _.camelCase(sheetName) + "_" + _.camelCase(row["title__en"]);

      for (var header in row) {
        string = row[header];
        header = header.split("__");
        if (header.length == 2) {
          // multipart split by __ means this data is a translation
          lang = header[1];
          uilabel = label + "_" + header[0];
          addToLocalizationStrings(lang, uilabel, string);
          data[header[0]] = label + "_" + header[0];
        } else {
          // otherwise just copy it over
          data[header[0]] = row[header[0]];
        }
      }

      result.push(data);
    });

    console.log("SUCCESS reading " + sheetName);
    return result;
  } catch (e) {
    console.log("ERROR reading tours " + sheetName + ": " + e);
  }
}

// PROCESS SPECIAL CASE SHEET - Beacons
function processBeaconsSheet() {
  try {
    for (var row in sheetData["Beacons"]) {
      var beaconData = sheetData["Beacons"][row];
      if (beaconData.blocks !== undefined) {
        beaconData.blocks = beaconData.blocks.split(",");
      } else {
        beaconData.blocks = [];
      }
      beacons[beaconData.beacon] = beaconData;
    }
    console.log("SUCCESS reading beacon block rules");
  } catch (e) {
    console.log("ERROR reading beacon block rules! " + e);
  }
}

// PROCESS SPECIAL CASE SHEET - Strings
function processStringsSheet() {
  try {
    for (var row in sheetData["UI Strings"]) {
      var stringData = sheetData["UI Strings"][row];
      var uilabel = stringData.UIString;
      var translations = _.omit(stringData, "UIString");
      _.map(translations, function(string, lang) {
        addToLocalizationStrings(lang, uilabel, string);
      });
    }
    console.log("SUCCESS reading strings");
  } catch (e) {
    console.log("ERROR reading strings! " + e);
  }
}

function addToLocalizationStrings(lang, uilabel, string) {
  if (localizationStrings[lang] === undefined) localizationStrings[lang] = {};
  localizationStrings[lang][uilabel] = string;
}

///////// SAVE TO FILES /////////

function exportFiles() {
  fs.writeFile(
    "beaconBlockRules.json",
    JSON.stringify(beacons, null, "\t"),
    "utf8",
    function(err) {
      if (err) {
        console.log("ERROR writing data/beaconBlockRules.json!" + err);
      } else {
        console.log("SUCCESS writing data/beaconBlockRules.json!");
      }
    }
  );

  fs.writeFile(
    "amenities.json",
    JSON.stringify(amenities, null, "\t"),
    "utf8",
    function(err) {
      if (err) {
        console.log("ERROR writing data/amenities.json! " + err);
      } else {
        console.log("SUCCESS writing data/amenities.json!");
      }
    }
  );

  fs.writeFile(
    "tours.json",
    JSON.stringify(tours, null, "\t"),
    "utf8",
    function(err) {
      if (err) {
        console.log("ERROR writing data/tours.json! " + err);
      } else {
        console.log("SUCCESS writing data/tours.json!");
      }
    }
  );

  for (var lang in localizationStrings) {
    fs.writeFile(
      "strings/" + lang + ".json",
      JSON.stringify(localizationStrings[lang], null, "\t"),
      "utf8",
      function(err) {
        if (err) {
          console.log("ERROR writing data/strings/" + lang + ".json! " + err);
        } else {
          console.log("SUCCESS writing data/strings/" + lang + ".json!");
        }
      }
    );
  }
}
