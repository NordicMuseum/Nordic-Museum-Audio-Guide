---
title: Nordic Museum Audio Guide
toc_label: Nordic Museum Audio Guide
toc: true
---

Targets: iOS 9.0 or greater

### Description

![Nordic Museum Audio Guide Screenshots](assets/appScreenshots.png)

A new audio guide for the Nordic Museum, forked from [Warhol Out Loud](https://github.com/CMP-Studio/TheWarholOutLoud). The app was released to the public in June 2017 (see [release schedule](https://github.com/NordicMuseum/Nordic-Museum-Audio-Guide/releases)).

### Development Notes

* [Archecture of this project](architecture.md)
* [Indoor Location](indoorLocation.md)
* [Content structure](contentStructure.md)
* [Features & trade-offs](features.md)
* [Publishing on the App Store](publishing.md)
* [Using ipods as loan devices](ipods.md)
* [Blog Posts by the Innovation Studio](blogposts.md)

### Building and Running

For now, use [XCode 9.4.1](https://developer.apple.com/download/more/) and Node 9.11.1 (multiple Node versions can be handled using [NVM](https://github.com/nvm-sh/nvm)).

1. Install all React Native dependencies  
[React Native getting started guide](https://facebook.github.io/react-native/docs/getting-started.html)
2. Install project dependencies  
  ```
  npm i
  ```  
3. Run on the iOS simulator  
  ```
  react-native run-ios
  ```

Building on a device is an exercise left to the reader. However, here are some minimal adjustments that need to be made (assuming you already have an Apple developer account):

1. Open ios/AndyWarholAccessibilityProject.xcworkspace in XCode.
2. Select the project ("AndyWarholAccessibilityProject") in the top left.
3. In the main window, select the target and the "General" tab.
4. Change the bundle identifier to match your app signing settings in your developer account.
5. Under "Signing", select your team from the drop down menu.
6. Now you should be ready to select your device in the menu bar and choose "Build" from the Product menu.

### Intellectual Property

All files that are the intellectual property owned by the Nordic Museum and other third-parties have been removed from this repo and replaced with placeholders. This includes all the images and audio files included in the App Bundle. Additional museum information remains in the code to give an overall sense of the app.


