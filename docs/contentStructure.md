---
title: Content Structure
toc_label: Content Structure
toc: true
---

## Overview

The main content is structured in two levels: tour stops and audio content. In addition to the main audio guide content, the app includes a list of amenities & two about pages (one for the museum, one for the app itself)

## Audio Guide Content

Each **tour stop** item contains the following properties:

* Title (I18n)
* Header image
* Duration (I18n)
* Floor
* Included audio content (in a sorted list)
* Regions where the tour stop should be displayed
* Category (used to avoid displaying highlights twice)

There are some related properties as well. The data model is located at [app/models/tourStop.js](../app/models/tourStop.js).

Each **audio content** item contains the following properties:

* Title (I18n)
* 3 digit ID
* Category (used to display highlights differently)
* Speaker (used in transcripts)
* Duration (I18n)
* Transcript (I18n)

There are some related properties as well. The data model is located at [app/models/audioContent.js](../app/models/audioContent.js).

Everything marked I18n is localized using the [app/data/strings.js](../app/data/strings.js) file, see below.

Until a CMS is implemented, the content is fetched from a static file: [app/data/tourStops.js](../app/data/tourStops.js). This file contains a javascript object (not a strict JSON) which is pulled into a Realm database when the app is launched for the first time & every time the app is updated (see [app/data/hydrate.js](../app/data/hydrate.js)).

## Amenities

Amenities are listed in a separate js file: [app/data/amenities.js](../app/data/amenities.js). Amenities have three properties:

* Title (I18n)
* Description (I18n)
* Icon (in png format)

## About Pages

There are two about pages in the app. These are regular components in the app/components folder: [aboutScreen.js](../app/components/aboutScreen.js) and [aboutTheAppScreen.js](../app/components/aboutTheAppScreen.js). The components contain variables for headings and paragraphs which are then pulled from strings.js after localization.

## Localization

The app is localized using [react-native-i18n](https://github.com/AlexanderZaytsev/react-native-i18n). Localized strings are put in [app/data/strings.js](../app/data/strings.js). In app components, localized strings are fetched using the I18n.t function. Example:
```
<Text style={styles.floorText}>
  {`${I18n.t('floor').toUpperCase()} ${this.props.floor}`}
</Text>
```