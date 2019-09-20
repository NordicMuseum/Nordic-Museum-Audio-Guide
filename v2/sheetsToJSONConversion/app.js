const port = 3000;
const fs = require('fs');
const uuid = require('uuid');
const _ = require('lodash');

// load in sheet
const sheetData = require('./raw.json');

var localizationStrings = {};
processStringsSheet();

var beacons = {};
var amenities = {};
var tours = {};
var stops = {};
processBeaconsSheet();
processAmenitiesSheet();

exportFiles();

function exportFiles() {
  fs.writeFile(
    'data/beaconBlockRules.json',
    JSON.stringify(beacons, null, '\t'),
    'utf8',
    function(err) {
      if (err) {
        console.log('ERROR writing data/beaconBlockRules.json!' + err);
      } else {
        console.log('SUCCESS writing data/beaconBlockRules.json!');
      }
    },
  );

  fs.writeFile(
    'data/amenities.json',
    JSON.stringify(amenities, null, '\t'),
    'utf8',
    function(err) {
      if (err) {
        console.log('ERROR writing data/amenities.json! ' + err);
      } else {
        console.log('SUCCESS writing data/amenities.json!');
      }
    },
  );

  for (var lang in localizationStrings) {
    fs.writeFile(
      'data/strings/' + lang + '.json',
      JSON.stringify(localizationStrings[lang], null, '\t'),
      'utf8',
      function(err) {
        if (err) {
          console.log('ERROR writing data/strings/' + lang + '.json! ' + err);
        } else {
          console.log('SUCCESS writing data/strings/' + lang + '.json!');
        }
      },
    );
  }
}

function processStringsSheet() {
  try {
    for (var row in sheetData['UI Strings']) {
      var stringData = sheetData['UI Strings'][row];
      var uilabel = stringData.uistring;
      var translations = _.omit(stringData, 'uistring');
      _.map(translations, function(string, lang) {
        addToLocalizationStrings(lang, uilabel, string);
      });
      console.log(localizationStrings);
    }
    console.log('SUCCESS reading strings');
  } catch (e) {
    console.log('ERROR reading strings! ' + e);
  }
}

function processAmenitiesSheet() {
  try {
    var amenitiesList = [];

    _.map(sheetData['Amenities'], (row, i) => {
      var amenity = {};

      amenity['uuid'] = uuid.v1();
      amenity['floor'] = row['floor'];
      amenity['icon'] = row['icon'];

      var label = 'amenity_' + _.camelCase(row['title__en']);
      amenity['title'] = label + '_title';
      amenity['description'] = label + '_description';

      // Also, add translations to localizationStrings
      for (var header in row) {
        string = row[header];
        header = header.split('__');
        if (header.length == 2) {
          lang = header[1];
          uilabel = label + '_' + header[0];
          addToLocalizationStrings(lang, uilabel, string);
        }
      }

      amenitiesList.push(amenity);
    });

    var amenitiesByFloor = _.groupBy(amenitiesList, 'floor');
    for (floorNum in amenitiesByFloor) {
      var floor = {};
      floor['floor'] = floorNum;
      floor['label'] = 'floor' + floorNum + '_label';
      floor['amenities'] = amenitiesByFloor[floorNum];
      amenities[floorNum] = floor;
    }
    console.log('SUCCESS reading amenities');
  } catch (e) {
    console.log('ERROR reading amenities! ' + e);
  }
}

// LOCALIZATION HELPERS
function addToLocalizationStrings(lang, uilabel, string) {
  if (localizationStrings[lang] === undefined) localizationStrings[lang] = {};
  localizationStrings[lang][uilabel] = string;
}

function processBeaconsSheet() {
  try {
    for (var row in sheetData['Beacons']) {
      var beaconData = sheetData['Beacons'][row];
      beaconData.uuid = uuid.v1();
      if (beaconData.blocks !== undefined) {
        beaconData.blocks = beaconData.blocks.split(',');
      } else {
        beaconData.blocks = [];
      }
      beacons[beaconData.beacon] = beaconData;
    }
    console.log('SUCCESS reading beacon block rules');
  } catch (e) {
    console.log('ERROR reading beacon block rules! ' + e);
  }
}

function makeLocalizationFiles(keyword) {
  for (var category in sheetData) {
    switch (category) {
      case 'Beacons':
        break;
      case 'Tours':
      case 'Stops':
      case 'Amenities':
        for (var row in sheetData[category]) {
          var headers = Object.keys(sheetData[category][row]);
          for (var i in headers) {
            var header = headers[i].split('__');
            console.log(header);
            console.log(sheetData[category][row]);
            // _.camelCase('Foo Bar');
            if (header.length == 2) {
              langCode = header[1];
            }
          }
        }
        break;
      case 'UI Strings':
        console.log("dsfsf'");
        break;
    }
  }

  // var newValue = {};
  // for (var l in languages) {
  // 	var langID = languages[l];
  // 	var langStrings = strings[langID];
  // 	if (langStrings[keyword] !== undefined) {
  // 		newValue[langID] = langStrings[keyword];
  // 		// Remove the strings from strings
  // 		delete strings[langID][keyword];
  // 	}
  // }
  // return newValue;
}

function writeAudioContentObject(id, audioObject) {
  if (audioContent[id] === undefined) {
    var audioContentObject = Object.assign({}, audioObject);
    audioContentObject.id = id;

    // . uuid --> TO DO CORRECTLY ?
    // . category --> uncahnged
    // . duration --> unchanged
    // . audioURL --> unchanged

    // . title ***
    // . transcript ***
    var titleLangStrings = getLangStrings(audioObject.title);
    audioContentObject.title = titleLangStrings;

    var transcriptLangStrings = getLangStrings(audioObject.transcript);
    audioContentObject.transcript = transcriptLangStrings;

    // . speaker ** REMOVE
    // . depth ** REMOVE
    delete audioContentObject.speaker;
    delete audioContentObject.depth;

    audioContent[id] = audioContentObject;
  }
}
