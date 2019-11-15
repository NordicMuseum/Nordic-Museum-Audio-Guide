---
title: Nordic Museum Audio Guide
toc_label: Nordic Museum Audio Guide
toc: true
---

Targets: iOS 10.0 or greater

### Description

![Nordic Museum Audio Guide Screenshots](assets/appScreenshots.png)

A new audio guide for the Nordic Museum, forked from [Warhol Out Loud](https://github.com/CMP-Studio/TheWarholOutLoud). The app was released to the public in June 2017 (see [release schedule](https://github.com/NordicMuseum/Nordic-Museum-Audio-Guide/releases)).

### Development Notes

* [Archecture of This Project](architecture.md)
* [Indoor Location](indoorLocation.md)
* [Content Structure](contentStructure.md)
* [Adding Content](addingContent.md)
* [Features & Trade-offs](features.md)
* [Publishing on the App Store](publishing.md)
* [Using Ipods as Loan Devices](ipods.md)
* [Blog Posts by the Innovation Studio](blogposts.md)

### Building and Running

The current version of the app resides in the [v2](https://github.com/Ambrosiani/Nordic-Museum-Audio-Guide/tree/master/v2) folder.

1. Install all React Native dependencies following the "React Native CLI Quickstart" instructions: 
[React Native getting started guide](https://facebook.github.io/react-native/docs/getting-started.html)

#### iOS
2. Install project dependencies  
  ```
  cd v2 && npm i && cd ios && pod install && cd ..
  ```  
3. Run on the iOS simulator  
  ```
  npx react-native run-ios
  ```
  or use the XCode buttons for building to an appropriate device/simulator.

There are two schemes: `nordicMuseumAudioGuide` is the debug build with hot reloading while `nordicMuseumAudioGuide-Release` is the release build used for testing and eventually publishing to the App Store.

#### Android

### Adding Your Own Data

See the in-depth guide on [adding content](addingContent.md).

### Intellectual Property

All files that are the intellectual property owned by the Nordic Museum and other third-parties have been removed from this repo and replaced with placeholders. This includes all the images and audio files included in the App Bundle. Additional museum information remains in the code to give an overall sense of the app.