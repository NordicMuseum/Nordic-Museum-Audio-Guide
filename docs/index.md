---
title: Nordic Museum Audio Guide
toc_label: Nordic Museum Audio Guide
toc: true
---

Targets: iOS 10.0 or greater

### Description

![Nordic Museum Audio Guide Screenshots](assets/appScreenshots.png)

The **Nordic Museum Audio Guide** is a stand-alone audio guide app used at the Nordic Museum in Stockholm, Sweden. The app was forked from [Warhol Out Loud](https://github.com/CMP-Studio/TheWarholOutLoud) and expanded with additional functionality during the Spring of 2017. The app was released to the public in June 2017 (see [release schedule](https://github.com/NordicMuseum/Nordic-Museum-Audio-Guide/releases)). In 2019, the app code was rewritten from scratch in the latest version of React Native.

**The app code is open source and any museum with similar needs can use it to build their own audio guide app.**

Additional questions regarding the app can be answered by Aron Ambrosiani at the Nordic Museum. E-mail: aron.ambrosiani@nordiskamuseet.se, phone +46851954564.

### Development Notes

* [Archecture of This Project](architecture.md)
* [Indoor Location](indoorLocation.md)
* [Content Structure](contentStructure.md)
* [Adding Content](addingContent.md)
* [Features & Trade-offs](features.md)
* [Publishing on the App Store](publishing.md)
* [Using Ipods as Loan Devices](ipods.md)
* [Possible improvements](improvements.md)
* [Blog Posts by the Innovation Studio](blogposts.md)

### Building and Running

The current version of the app resides in the [v2](https://github.com/Ambrosiani/Nordic-Museum-Audio-Guide/tree/master/v2) folder.

1. Install all React Native dependencies following the "React Native CLI Quickstart" instructions: 
[React Native getting started guide](https://facebook.github.io/react-native/docs/getting-started.html)

#### iOS
2. Install project dependencies  
  ```
  cd v2 && yarn install && cd ios && pod install && cd ..
  ```  
3. Run on the iOS simulator  
  ```
  npx react-native run-ios
  ```
  or use the XCode buttons for building to an appropriate device/simulator.

There are two schemes: 
- `nordicMuseumAudioGuide` is the debug build with hot reloading
- `nordicMuseumAudioGuide-Release` is the release build used for testing and eventually publishing to the App Store.

#### Android

Work in progress.

### Adding Your Own Data

See the in-depth guide on [adding content](addingContent.md).

### Intellectual Property

All files that are the intellectual property owned by the Nordic Museum and other third-parties have been removed from this repo and replaced with placeholders. This includes all the images and audio files included in the App Bundle. Additional museum information remains in the code to give an overall sense of the app.

### Credits

#### Project manager, Nordic Museum

Aron Ambrosiani

#### Project manager, Carnegie Institute

Ruben Niculcea

#### Development and Design

Ruben Niculcea, Carnegie Institute
Sam Ticknor, Carnegie Institute
Aron Ambrosiani, Nordic Museum
Robert Ziherl, Nordic Museum

#### Advisory Team, Nordic Museum

Vanessa Gandy
Loredana Jelmini
Sven Rentzhog

#### App Icon

Ann-Sofi Marminge Design

#### Translations

BTI Studios