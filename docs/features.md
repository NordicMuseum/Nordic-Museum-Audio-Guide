---
title: Features and Trade-offs
toc_label: Features and Trade-offs
toc: true
---


As with all software products, there are a number of assumptions, design decisions and trade-offs that impact the feature set and end user experience. 

## Audio Guide basics
The basic user story for a museum audio guide is this: during the museum visit, the user listens to audio tracks that in some way enhance the museum experience. The tracks are (usually) tied to specific locations, rooms, display cases and/or artefacts. Audio guides have been around since at least the 1940s. [Read more about audio tours on Wikipedia](https://en.wikipedia.org/wiki/Audio_tour).

## Core functional demands
The Nordic Museum Audio Guide has three core functional demands
1 The audio tracks need to be available offline
2 The audio guide needs to handle multiple languages
3 The user should be able to select audio tracks by entering digits

These demands are explained in detail below.

### Offline use
Because the Nordic Museum has thick stone walls limiting cell phone signal strength combined with limited wifi coverage, the tracks need to be available offline. All audio is included in the app download. Further, the museum offers loan ipods preloaded with the app.

Further reading: [configuring ipods](configuringIpods.md).

### Multiple languages
The app supports multiple languages. All interface strings have been professionally translated into the following ten languages:

* Arabic / العربية
* English
* Finnish / Suomi
* French / Français
* German / Deutsch
* Italian / Italiano
* Mandarin / 简体中文
* Russian / Русский
* Spanish / Español
* Swedish / Svenska

All screens and compoments have been designed to handle both left-to-right and right-to-left scripts. There is an [open issue on the actual switch between LTR and RTL](https://github.com/NordicMuseum/Nordic-Museum-Audio-Guide/issues/13) which we hope to address during May 2019.

Language is selected when first launching the app (using the device locale as default if available) and can also be changed from the Info tab.

The app also uses localization fallbacks; if a track is not available in the selected language, the app will instead display and play the same track in a specified fallback language.

### Select tracks by entering digits
Entering digits to select a track is used by most museum audio guides, which means that it's something even a casual museum visitor has probably encountered. In this app, the codes need to be 3 digits long (awaiting [Issue#14](https://github.com/NordicMuseum/Nordic-Museum-Audio-Guide/issues/14)). By enforcing the same length for all codes, we can jump directly to the track without the need of an enter button.