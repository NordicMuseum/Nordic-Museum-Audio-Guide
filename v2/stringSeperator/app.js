const express = require('express')
const app = express()
const path = require('path');
const port = 3000
const fs = require('fs');

// load in strings
const stringFile = require('./data/strings.js');
const languages = Object.keys(strings);
// load in tour stops
const contentFile = require('./data/tourStops.js')
const audioContent = {};

app.use(express.static(__dirname + '/public'));

function getLangStrings(keyword) {
	var newValue = {};
	for (var l in languages) {
		var langID = languages[l];
		var langStrings = strings[langID];
		if (langStrings[keyword] !== undefined) {
			newValue[langID] = langStrings[keyword];
			// Remove the strings from strings
			delete strings[langID][keyword];
		}
	}
	return newValue;
}

app.get('/',function(req,res){
	try {
		for (var i in tourStops) {
			var fields = Object.keys(tourStops[i]);
			for (var j in fields) {
				var field = fields[j];
				var value = tourStops[i][field];
				switch (field) {
					// Unchanged fields
					case 'floor':
					case 'order':
					case 'regions':
					case 'imageURL':
					case 'imageWidth':
					case 'imageHeight':
					case 'duration':
						break;

					// Fields To Delete
					case 'shortTitle':
					case 'tags':
					case 'initialAudio':
						// delete from tourStops
						delete tourStops[i][field];
						// delete from strings
						for (var l in languages) {
							var langID = languages[l];
							var langStrings = strings[langID];
							if (langStrings[value] !== undefined) {
								delete strings[langID][value];
							}
						}
						break;

					// Fields To Fill In
					case 'imageAccessibilityLabel':
					case 'longCredit':
						tourStops[i][field] = getLangStrings(value);
						break;

					// Three Special Cases:

					// 1) UUID --> TO DO CORRECTLY

					// 2) 'LongTitle' --> record as 'Title'
					case 'longTitle':
						tourStops[i]['title'] = getLangStrings(value); 
						delete tourStops[i]['longTitle'];
						break;

					// 3) 'Short Credit' --> Short Credit Value currently exsits with extra HTML markup 
					// 						 (ex. <i>SwedishFolkArt_shortCredit</i>)
					//                       that needs to be removed before lookup 
					case 'shortCredit':
						var strippedShortCreditValue = value.match(/<i>(.*?)<\/i>/)[1];
						tourStops[i]["shortCredit"] = getLangStrings(strippedShortCreditValue); 
						break;

					// 4) Case Audio Content --> Deeper Dive
					case 'audioContent':
						for (var a in value) {
							var audio = value[a];
							writeAudioContentObject(audio.title, audio);
							
							tourStops[i]['audioContent'][a] = audio.title;
						}
						break;

					default:
						break;
				}
			}
			console.log(JSON.stringify(tourStops[i], null, 4));
		}

		// console.log(strings["en"]);
		console.log(audioContent);

		fs.writeFile("output/strings.json", JSON.stringify(strings, null, '\t'), 'utf8', function(err) {
			if (err) { res.send("ERROR writing to strings JSON file " + err); }
			else { 
				fs.writeFile("output/tourStops.json", JSON.stringify(tourStops, null, '\t'), 'utf8', function(err) {
					if (err) { res.send("ERROR writing to tourStop JSON file " + err); }
					else { 
						fs.writeFile("output/audioContent.json", JSON.stringify(audioContent, null, '\t'), 'utf8', function(err) {
							if (err) { res.send("ERROR writing to audioContent JSON file " + err); }
							else { res.send("SUCCESS writing to JSON files! Restart server to run again"); }
						});
					}
				});
			}
		}); 

		// res.send('OK');

	} catch (e) {
		res.send("ERROR ---> " + e);
	}
});

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))