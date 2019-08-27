import React, { PropTypes } from 'react';

// import I18n from 'react-native-i18n';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';

import StickyHeader from './stickyHeader';

import { parseDisplayText, parseVoiceoverText } from '../utilities';

import { LIGHT_GRAY, HIGHLIGHTS } from '../styles';

const SPACING = 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cellContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: SPACING,
    backgroundColor: '#ccc',
  },
  cellImage: {
    resizeMode: 'stretch',
    flex: 1,
  },
  cellTitleText: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontWeight: '600',
    position: 'absolute',
    bottom: SPACING * 2,
    left: SPACING * 2,
    fontSize: 18,
  },
  cellDuration: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: SPACING * 2,
    right: SPACING * 2,
    flexDirection: 'row',
    flex: 0.4,
    alignItems: 'flex-end',
  },
  cellDurationIcon: {
    height: 16,
    width: 16,
    marginRight: SPACING,
    tintColor: LIGHT_GRAY,
  },
  cellDurationText: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'right',
    fontSize: 16,
    lineHeight: 16,
    marginRight: 2,
  },
});

const { width, height } = Dimensions.get('window');
const cellHeight = (height / 4);
export const totalCellHeight = cellHeight + SPACING;

const dummyItems = [
  {
    "uuid": "07dc96fb-7bad-421b-a016-64e338987fcc",
    "floor": "2–4",
    "order": 0,
    "regions": [],
    "category": "HIGHLIGHTS",
    "imageURL": "highlights.png",
    "imageWidth": 750,
    "imageHeight": 345,
    "imageAccessibilityLabel": {
      "en": "Highlights",
      "sv": "Höjdpunkter",
      "it": "Le parti salienti",
      "ar": "مقتطفات",
      "es": "Atracciones principales",
      "fi": "Kohokohtia",
      "de": "Höhepunkte",
      "ru": "Реликвии",
      "fr": "Les incontournables",
      "zh": "Highlights",
      "svKids": "Barnens audioguide"
    },
    "shortCredit": {
      "en": "<i>Highlights</i>",
      "sv": "<i>Höjdpunkter</i>",
      "it": "<i>Le parti salienti</i>",
      "ar": "<i>مقتطفات</i>",
      "es": "<i>Atracciones principales</i>",
      "fi": "<i>Kohokohtia</i>",
      "de": "<i>Höhepunkte</i>",
      "ru": "<i>Реликвии</i>",
      "fr": "<i>Les incontournables</i>",
      "zh": "<i>Highlights</i>",
      "svKids": "<i>Barnens audioguide</i>"
    },
    "longCredit": {
      "en": "Photo: Karolina Kristensson\n<i>Highlights</i>",
      "sv": "Foto: Karolina Kristensson\n<i>Höjdpunkter</i>",
      "it": "Foto: Karolina Kristensson\n<i>Le parti salienti</i>",
      "ar": "Foto: Karolina Kristensson\n<i>مقتطفات</i>",
      "es": "Foto: Karolina Kristensson\n<i>Atracciones principales</i>",
      "fi": "Foto: Karolina Kristensson\n<i>Kohokohtia</i>",
      "de": "Foto: Karolina Kristensson\n<i>Höhepunkte</i>",
      "ru": "Foto: Karolina Kristensson\n<i>Реликвии</i>",
      "fr": "Foto: Karolina Kristensson\n<i>Les incontournables</i>",
      "zh": "Foto: Karolina Kristensson\n<i>Highlights</i>",
      "svKids": "Foto: Karolina Kristensson\n<i>Barnens audioguide</i>"
    },
    "duration": {
      "ar": 2863,
      "de": 2841,
      "en": 2851,
      "es": 2874,
      "fi": 2986,
      "fr": 2775,
      "it": 2861,
      "ru": 3473,
      "sv": 2894,
      "seSma": 2894,
      "seSme": 2894,
      "seSmj": 2894,
      "svKids": 2286,
      "svSimple": 2756,
      "zh": 2863
    },
    "audioContent": [
      "201",
      "401",
      "408",
      "413",
      "424",
      "425",
      "434",
      "426",
      "423",
      "469",
      "456",
      "451",
      "301",
      "302",
      "316",
      "328",
      "330",
      "355",
      "333",
      "357",
      "356",
      "202"
    ],
    "title": {
      "en": "Highlights",
      "sv": "Höjdpunkter",
      "it": "Le parti salienti",
      "ar": "مقتطفات",
      "es": "Atracciones principales",
      "fi": "Kohokohtia",
      "de": "Höhepunkte",
      "ru": "Реликвии",
      "fr": "Les incontournables",
      "zh": "Highlights",
      "svKids": "Barnens audioguide"
    }
  },
  {
    "uuid": "db0afda8-a668-472c-8792-54175add2d9f",
    "floor": "3",
    "order": 1,
    "regions": [
      "Traditions"
    ],
    "imageURL": "traditions.png",
    "imageWidth": 750,
    "imageHeight": 345,
    "imageAccessibilityLabel": {
      "en": "Traditions",
      "sv": "Traditioner"
    },
    "shortCredit": {
      "en": "<i>Traditions</i>",
      "sv": "<i>Traditioner</i>"
    },
    "longCredit": {
      "en": "Photo: Karolina Kristensson\n<i>Traditions</i>",
      "sv": "Foto: Karolina Kristensson\n<i>Traditioner</i>"
    },
    "duration": {
      "ar": 4620,
      "de": 4620,
      "en": 4620,
      "es": 4620,
      "fi": 4620,
      "fr": 4620,
      "it": 4620,
      "ru": 4620,
      "sv": 5040,
      "seSma": 5040,
      "seSme": 5040,
      "seSmj": 5040,
      "svKids": 5040,
      "svSimple": 5040,
      "zh": 4620
    },
    "audioContent": [
      "333",
      "355",
      "331",
      "332",
      "334",
      "335",
      "336",
      "337",
      "338",
      "339",
      "340",
      "341",
      "342",
      "343",
      "344",
      "345",
      "346",
      "347",
      "348",
      "349",
      "350",
      "351",
      "352",
      "353",
      "354"
    ],
    "title": {
      "en": "Traditions",
      "sv": "Traditioner"
    }
  },
  {
    "uuid": "f68078b5-b67e-450c-8e03-7748c37af824",
    "floor": "3",
    "order": 2,
    "regions": [
      "Table Settings"
    ],
    "imageURL": "tableSettings.png",
    "imageWidth": 750,
    "imageHeight": 345,
    "imageAccessibilityLabel": {
      "en": "Table Settings",
      "sv": "Dukade bord",
      "de": "Tischdekorationen"
    },
    "shortCredit": {
      "en": "<i>Table Settings</i>",
      "sv": "<i>Dukade bord</i>",
      "de": "<i>Tischdekorationen</i>"
    },
    "longCredit": {
      "en": "Photo: Karolina Kristensson\n<i>Table Settings</i>",
      "sv": "Foto: Karolina Kristensson\n<i>Dukade bord</i>",
      "de": "Photo: Karolina Kristensson\n<i>Tischdekorationen</i>"
    },
    "duration": {
      "ar": 2160,
      "de": 2280,
      "en": 2160,
      "es": 2160,
      "fi": 2160,
      "fr": 2160,
      "it": 2160,
      "ru": 2160,
      "sv": 2340,
      "seSma": 2340,
      "seSme": 2340,
      "seSmj": 2340,
      "svKids": 2340,
      "svSimple": 2340,
      "zh": 2160
    },
    "audioContent": [
      "316",
      "328",
      "312",
      "313",
      "314",
      "315",
      "317",
      "318",
      "319",
      "320",
      "321",
      "322",
      "323",
      "324",
      "325",
      "326",
      "327",
      "398",
      "399"
    ],
    "title": {
      "en": "Table Settings",
      "sv": "Dukade bord",
      "de": "Tischdekorationen"
    }
  },
  {
    "uuid": "8ee10c5f-4d34-4437-a164-6ec7400f8647",
    "floor": "4",
    "order": 1,
    "regions": [
      "Homes and Interiors W",
      "Homes and Interiors E"
    ],
    "imageURL": "homesAndInteriors.png",
    "imageWidth": 750,
    "imageHeight": 345,
    "imageAccessibilityLabel": {
      "en": "Homes and Interiors",
      "sv": "Hem och bostad"
    },
    "shortCredit": {
      "en": "<i>Homes and Interiors</i>",
      "sv": "<i>Hem och bostad</i>"
    },
    "longCredit": {
      "en": "Photo: Karolina Kristensson\n<i>Homes and Interiors</i>",
      "sv": "Foto: Karolina Kristensson\n<i>Hem och bostad</i>"
    },
    "duration": {
      "ar": 3420,
      "de": 3420,
      "en": 3420,
      "es": 3420,
      "fi": 3420,
      "fr": 3420,
      "it": 3420,
      "ru": 3420,
      "sv": 3420,
      "seSma": 3420,
      "seSme": 3420,
      "seSmj": 3420,
      "svKids": 3420,
      "svSimple": 3420,
      "zh": 3420
    },
    "audioContent": [
      "401",
      "408",
      "413",
      "424",
      "425",
      "402",
      "403",
      "404",
      "405",
      "406",
      "407",
      "409",
      "410",
      "411",
      "412",
      "414",
      "415",
      "416",
      "417",
      "418",
      "419",
      "420",
      "421",
      "422"
    ],
    "title": {
      "en": "Homes and Interiors",
      "sv": "Hem och bostad"
    }
  },
  {
    "uuid": "19a84090-13ce-4bb8-900e-549b74eade19",
    "floor": "4",
    "order": 2,
    "regions": [
      "Sapmi"
    ],
    "imageURL": "sapmi.png",
    "imageWidth": 750,
    "imageHeight": 345,
    "imageAccessibilityLabel": {
      "en": "Sápmi",
      "sv": "Sápmi"
    },
    "shortCredit": {
      "en": "<i>Sápmi</i>",
      "sv": "<i>Sápmi</i>"
    },
    "longCredit": {
      "en": "Photo: Karolina Kristensson\n<i>Sápmi</i>",
      "sv": "Foto: Karolina Kristensson\n<i>Sápmi</i>"
    },
    "duration": {
      "ar": 1260,
      "de": 1260,
      "en": 1260,
      "es": 1260,
      "fi": 1260,
      "fr": 1260,
      "it": 1260,
      "ru": 1260,
      "seSma": 2880,
      "seSme": 2700,
      "seSmj": 2700,
      "sv": 2640,
      "svKids": 2640,
      "svSimple": 2640,
      "zh": 1260
    },
    "audioContent": [
      "426",
      "434",
      "427",
      "428",
      "429",
      "430",
      "431",
      "432",
      "433",
      "435",
      "436",
      "437",
      "438",
      "439",
      "440",
      "441",
      "442",
      "443",
      "444",
      "445",
      "446",
      "447"
    ],
    "title": {
      "en": "Sápmi",
      "sv": "Sápmi"
    }
  },
  {
    "uuid": "14839566-ba39-4f05-8711-7d1af9ec9b04",
    "floor": "4",
    "order": 3,
    "regions": [
      "Textile Gallery"
    ],
    "imageURL": "textileGallery.png",
    "imageWidth": 750,
    "imageHeight": 345,
    "imageAccessibilityLabel": {
      "en": "Textile Gallery",
      "sv": "Textilgalleriet"
    },
    "shortCredit": {
      "en": "<i>Textile Gallery</i>",
      "sv": "<i>Textilgalleriet</i>"
    },
    "longCredit": {
      "en": "Photo: Karolina Kristensson\n<i>Textile Gallery</i>",
      "sv": "Foto: Karolina Kristensson\n<i>Textilgalleriet</i>"
    },
    "duration": {
      "ar": 900,
      "de": 900,
      "en": 900,
      "es": 900,
      "fi": 900,
      "fr": 900,
      "it": 900,
      "ru": 900,
      "sv": 660,
      "seSma": 660,
      "seSme": 660,
      "seSmj": 660,
      "svKids": 660,
      "svSimple": 660,
      "zh": 900
    },
    "audioContent": [
      "469",
      "470",
      "471",
      "472",
      "473",
      "474",
      "475",
      "476"
    ],
    "title": {
      "en": "Textile Gallery",
      "sv": "Textilgalleriet"
    }
  },
  {
    "uuid": "ce4ca387-3da4-48bd-9d2f-2219009ace36",
    "floor": "4",
    "order": 4,
    "regions": [
      "Swedish Folk Art"
    ],
    "imageURL": "swedishFolkArt.png",
    "imageWidth": 750,
    "imageHeight": 345,
    "imageAccessibilityLabel": {
      "en": "Swedish Folk Art",
      "sv": "Folkkonst"
    },
    "shortCredit": {
      "en": "<i>Swedish Folk Art</i>",
      "sv": "<i>Folkkonst</i>"
    },
    "longCredit": {
      "en": "Photo: Karolina Kristensson\n<i>Swedish Folk Art</i>",
      "sv": "Foto: Karolina Kristensson\n<i>Folkkonst</i>"
    },
    "duration": {
      "ar": 1320,
      "de": 1320,
      "en": 1320,
      "es": 1320,
      "fi": 1320,
      "fr": 1320,
      "it": 1320,
      "ru": 1320,
      "sv": 1260,
      "seSma": 1260,
      "seSme": 1260,
      "seSmj": 1260,
      "svKids": 1260,
      "svSimple": 1260,
      "zh": 1320
    },
    "audioContent": [
      "451",
      "456",
      "448",
      "449",
      "450",
      "452",
      "453",
      "454",
      "455",
      "457",
      "458",
      "459",
      "460"
    ],
    "title": {
      "en": "Swedish Folk Art",
      "sv": "Folkkonst"
    }
  }
]

export const renderItem = (item, index, onPress, selected, locale, items) => {
  const cellWidth = width;
  const gridLength = dummyItems.length;

  let traits = [];

  if (item.uuid === selected) {
    traits = ['button', 'startsMedia', 'selected'];
  } else {
    traits = ['button', 'startsMedia'];
  }

  let imageURL = item.imageURL;
  if (locale === 'svKids' && item.regions.length === 0) {
    imageURL = 'highlightsKids.png';
  }

  return (
    <View
      style={[
        styles.cellContainer,
        {
          width: cellWidth,
          flex: 1,
        },
      ]}
      key={item.uuid}
      accessible={true}
      accessibilityTraits={traits}
      accessibilityLabel={
        `${parseVoiceoverText("longTitle")}, ${index} of ${gridLength}.` +
        ` Plays audio for ${"shortTitle"} story.`
      }
    >
      <TouchableOpacity activeOpacity={0.6} onPress={() => onPress(item)}>
        <View>
          <ImageBackground
            style={[
              styles.cellImage,
              {
                width: cellWidth,
                height: cellHeight,
              },
            ]}
          >
            <View style={{ flex: 0.6 }}>
              <Text
                style={[
                  styles.cellTitleText,
                  item.category === 'HIGHLIGHTS' ? {
                    backgroundColor: HIGHLIGHTS,
                    paddingHorizontal: 5,
                    paddingVertical: 3,
                  } : {},
                ]}
              >
                {parseDisplayText("longTitle").toUpperCase()}
              </Text>
            </View>
            <View style={styles.cellDuration}>
              <Image style={styles.cellDurationIcon} source={require('../assets/ClockIcon.png')} />
              <Text style={styles.cellDurationText}>
                {Math.floor(item.duration[locale] / 60)}
              </Text>
              <Text style={[styles.cellDurationText, { fontSize: 12 }]}>
                {('min').toUpperCase()}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Grid = props => {
  let totalIndex = 0;
  let content = [];
  let stickyHeaders = [];
  let lastFloorSeen;

  dummyItems.forEach((tourStop, index) => {
    if (lastFloorSeen !== tourStop.floor) {
      stickyHeaders.push(totalIndex);
      content.push(
        <StickyHeader key={totalIndex} title={`${'floor'} ${tourStop.floor}`} />
      );
      totalIndex++;
      lastFloorSeen = tourStop.floor;
    }

    content.push(
      renderItem(tourStop, index, props.onCellPress, props.selected, props.locale, props.items)
    );
    totalIndex++;
  });

  return (
    <View style={styles.container}>
      <ScrollView automaticallyAdjustContentInsets={false} stickyHeaderIndices={stickyHeaders}>
        {content}
      </ScrollView>
    </View>
  );
};

Grid.propTypes = {
  // items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  // selected: PropTypes.string,
  // onCellPress: PropTypes.func.isRequired,
  // locale: PropTypes.string.isRequired,
};

export default Grid;
