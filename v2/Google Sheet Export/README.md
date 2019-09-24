_This gs script is adapted from Pamela Fox's work. [See Gist on GitHub.](https://gist.github.com/pamelafox/1878143)_

This export script can be added to a Google Sheet.
To do this:

- Open your Google Sheet
- Go to `Tools > Script Editor`
- Paste the contents of GoogleSheetExport.gs into the editor
- Save and run, you may need to allow certain permissions
- Refresh the Google Sheet

When the script is successfully added to your Google Sheet:

- Select the new menu item `Export JSON > Export JSON for all sheets`
- Copy the full results into `/src/data/raw.json`
- From that data folder, you can run `node sheetConverter.js` which will convert the raw data into the following files:
  - `beaconBlockRules.json`
  - `tours.json`
  - `amenities.json`
  - `strings/sv.json` & other localization json files
