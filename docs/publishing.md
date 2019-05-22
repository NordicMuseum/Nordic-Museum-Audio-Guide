---
title: Publishing on the App Store
toc_label: Publishing on the App Store
toc: true
---

Several steps are needed to make the app available on the App Store.

## Developer Account
To publish apps on the App Store, your museum needs an Apple developer account. Register at [developer.apple.com](https://developer.apple.com/account/). There is a yearly fee to make apps available to the public. If you're building to your own devices in limited numbers, you can do this with a free account and building directly from XCode.

## App Icons & Launch Images
App icons and launch images are added in XCode (find Images.xcassets > AppIcon > drag and drop) and end up in [ios/AndyWarholAccessibilityProject/Images.xcassets](https://github.com/NordicMuseum/Nordic-Museum-Audio-Guide/tree/master/ios/AndyWarholAccessibilityProject/Images.xcassets). There are multiple free services to generate all the needed sizes from high-resolution originals; I recommend [appicon.build](https://appicon.build) (works fine in Chrome but not Safari).

## App Name
The app display name is set in XCode (Targets > General > Display Name) or directly in the info.plist. Keep the diplay name short (12–13 characters at most) to avoid it getting truncated. Here's a [brief guide to localizing the display name](https://hackernoon.com/localize-an-application-name-in-react-native-c36c4b2be7c3).

You can use a longer name as the App Store title.

## Screen Shots for the App Store
The App Store needs a bunch of screen shots in different sizes. These can for the most part be taken directly from the iOS Simulator. However, to demonstrate the indoor location "Near Me" screen you need to actually screen shot from a device running the app (until we figure out how to trigger simulated locations in the simulator, that is…)

## Publishing from XCode
To be continued…

## To Be Continued: Google Play
Right now the app is iOS only but we hope to add an android production build down the road.

