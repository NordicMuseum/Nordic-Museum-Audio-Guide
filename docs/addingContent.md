---
title: Adding Content
toc_label: Adding Content
toc: true
---

## Configure supported languages
**v2/src/i18n.js**
1. remove the languages you don't need `translationGetters`
2. remove unnecessary fallbacks from `stringFallback`

**v2/src/components/buttons/languageSwitcherButtons.js**
1. remove the languages you don't need in `languages` and put them in the desired order

## Use the Google Spreadsheet
1. Copy the [demo spreadsheet with Nordic Museum data](ADDLINK) into a desired location.
2. Remove the columns of languages you don't need in the worksheets **UI Strings**, **Tours**, **Stops** and **Amenities**

After updating to fit your needs, complete the following steps:
1. Select **Export JSON>Export JSON for all sheets** in the Google Sheet menu (to the right of "Help"). This either runs or prompts a security dialog box (see below)
2. If the dialog box titled **Copy/Paste the following content into ../src/data.raw.JSON** appears, you’re good to go! Copy the content in the text area.
3. Paste the data into v2/src/data.raw.JSON
4. In the folder v2/src, run the following command in a terminal: `npm i && node sheetConverter.js`. If a bunch of SUCCESS strings are written into the console the data is now copied into the app!

If needed, complete the following steps, then return to step 1 and try again:
1. Select **Continue** in the dialog box
2. Log in
3. Select **Advanced**, then **Open ExportData (unsafe)**
4. Select **Allow**

## Images
The app needs multiple image assets: tour images, a welcome image, a museum image, amenity icons, an app icon & a splash screen. All images should be PNGs.

### TourStops
Each tour needs an image. The default resolution is 750 by 345 pixels but can be changed. Image file names and resolutions are specified in the Google spreadsheet on the **Tours** worksheet (see above). Place the correctly named and sized image files in the `v2/src/assets/images` folder.

### Welcome Image
The welcome image is shown after the splash screen when opening the app for the first time and after switching language. Place an image (in portrait proportions – not all devices have the same screen proportions so make sure it looks good on different devices) in the `v2/src/assets/images` folder with file name **welcome.png**

### Museum Image
The museum image is shown on the Info tab above the menu items. Place an image (in fairly square proportions – not all devices have the same screen proportions so make sure it looks good on different devices) in the `v2/src/assets/images` folder with file name **museumBackground.png**

### Amenity Icons
Image file names and resolutions are specified in the Google spreadsheet on the **Amenities** worksheet (see above). Place the correctly named and sized image files in the `v2/src/assets/images` folder.

### App Icon
For iOS, add the app icon in XCode. There are plenty of web sites & apps that can create the icon set for you. Then drag & drop it into the existing **Images.xcassets>AppIcon** image set.

For Android, TBD

### Splash Screen
For iOS, the splash screen/launch screen is shown while the app is launching. The first launch is longer since the local database is built. On subsequent launches the splash screen is displayed for just a brief moment. There are plenty of web sites & apps that can create the splash screen for you. Then drag & drop it into the existing **Images.xcassets>LaunchImage** image set.

For Android, TBD

## Audio on iOS
Place audio files in the `v2/src/assets/audio` folder. Each stop (listed in the Google spreadsheet on the **Stops** worksheet) needs its own folder. Within the folder the files should be named `{id}{language}.mp3` using ISO language shortcodes (the same as in src/components/buttons/languageSwitcher.js), for instance "001/001sv.mp3".

If your files are named {id}/{language}.mp3 there’s a [python script](https://askubuntu.com/questions/759422/rename-files-adding-their-parent-folder-name) to help with renaming.

### Audio on Android
## Text Files
### About the App
### About the Museum
## Supporting Scripts
## XCode & Android Studio settings
### XCode
App name, bundle identifier, Display name, Version number & development team needs to be set in XCode.
## Appcenter.ms
### Build Settings
### Analytics