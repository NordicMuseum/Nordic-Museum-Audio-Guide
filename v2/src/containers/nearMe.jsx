import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BluetoothButton from '../components/buttons/bluetoothButton';
import LocationServicesButton from '../components/buttons/locationServicesButton';

import StickyHeader from '../components/stickyHeader';

import { renderItem, totalCellHeight } from '../components/grid';

import AudioContentItem from '../components/audioContentItem';
import TourStop from '../containers/tourStop';
import AmenitiesItem from '../components/amenitiesItem';

import { togglePausePlay, playTrack, unloadAudio } from '../actions/audio';

import { translate } from '../i18n';

import {
  globalStyles,
  NAV_BAR_TEXT,
  NAV_BAR_BACKGROUND,
  BOTTOM_PLAYER_HEIGHT,
  LIGHT_BLUE,
  getBottomTabsHeight,
} from '../styles';

const uuid = require('uuid');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  messageContainer: {
    flex: 1,
    marginHorizontal: 10,
    paddingTop: 25,
    paddingBottom: 15,
  },
  buttonsContainer: {
    marginTop: 15,
  },
  settingContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  storiesMessageText: {
    textAlign: 'center',
  },
});

class NearMe extends Component {
  static get options() {
    return {
      topBar: {
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        title: {
          text: translate('nearMeScreen_Title'),
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
        noBorder: true,
      },
    };
  }

  render() {
    let contentView;
    let debugView;

    const storiesMessage = translate('nearMeScreen_StoriesMessage');

    if (this.props.tracking === false) {
      contentView = (
        <View style={[styles.messageContainer, styles.settingContainer]}>
          <Text style={[globalStyles.body, styles.storiesMessageText]}>
            {`${storiesMessage}\n\n${translate('nearMeScreen_LocationNeeds')}`}
          </Text>
          <View style={styles.buttonsContainer}>
            <LocationServicesButton
              locationServicesStatus={this.props.locationServicesStatus}
            />
            <BluetoothButton bluetoothOn={this.props.bluetoothOn} />
          </View>
        </View>
      );
    } else if (this.props.tracking === true) {
      const tourStops = this.props.closeTourStops;
      const tourStopsNum = tourStops.length;
      const amenities = this.props.amenities;
      const audioContent = this.props.audioContent;
      let voiceOverMessage;

      // if (this.props.floor !== null) {
      //   if (tourStopsNum === 0) {
      //     voiceOverMessage = translate('nearMeScreen_StoriesMessageNone');
      //   } else if (tourStopsNum === 1) {
      //     voiceOverMessage = translate('nearMeScreen_StoriesMessageSingular');
      //   } else {
      //     voiceOverMessage = translate('nearMeScreen_StoriesMessagePlural');
      //     voiceOverMessage = voiceOverMessage.replace(
      //       ' x ',
      //       ` ${tourStopsNum} `,
      //     );
      //   }
      // }

      // Only announce changes when:
      // 1. The Near Me Tab is active
      // 2. The navigator is at the root view
      // 3. The number of stops has changed
      // 4. The autoplay timer is not active
      // 5. The player is not currently playing
      // if (
      //   this.props.activeTab === TAB_NEARME &&
      //   this.props.atNearMeRoot &&
      //   lastSeenNumber !== tourStopsNum &&
      //   !this.props.timerActive &&
      //   this.props.playerStatus !== PLAYER_STATUS_PLAY
      // ) {
      //   lastSeenNumber = tourStopsNum;
      //   if (voiceOverMessage) {
      //     screenReaderScreenChanged(voiceOverMessage);
      //   }
      // }

      const regionsDetected = this.props.regions
        ? this.props.regions.join(', ')
        : '';

      if (regionsDetected) {
        analyticsTrackBeaconRegion(regionsDetected, this.props.locale);

        if (__DEV__) {
          debugView = (
            <View
              style={{
                height: 25,
                backgroundColor: LIGHT_BLUE,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                {`Regions: ${regionsDetected}`}
              </Text>
            </View>
          );
        }
      }

      if (
        amenities.length === 0 &&
        tourStops.length === 0 &&
        audioContent.length === 0
      ) {
        contentView = (
          <View style={[styles.messageContainer, styles.settingContainer]}>
            <Text style={[globalStyles.body, styles.storiesMessageText]}>
              {`${storiesMessage}`}
            </Text>
          </View>
        );
      } else {
        const width = Dimensions.get('window').width;
        const stickyHeaders = [];
        let totalIndex = 0;

        const { playTrack, togglePausePlay } = this.props.actions;

        let highlightsList = [];
        if (audioContent.length > 0) {
          stickyHeaders.push(totalIndex);
          highlightsList.push(
            <StickyHeader key={totalIndex} title={translate('highlights')} />,
          );

          const uuids = [];
          audioContent.forEach(content => {
            uuids.push(content.uuid);
          });

          // const query = `uuid == "${uuids.join('" OR uuid == "')}"`;

          // Wrap content in a 'dynamic' tourStop
          const tourStop = {
            uuid: uuid.v4(),
            floor: this.props.floor,
            shortTitle: translate('Highlights_shortTitle'),
            longTitle: translate('Highlights_shortTitle'),
            // audioContent: audioContentRealm.filtered(query),
            audioContent: audioContent,
          };

          highlightsList.push(
            ...audioContent.map((content, index) => {
              totalIndex++;

              return (
                <AudioContentItem
                  key={totalIndex}
                  audioContent={content}
                  active={this.props.currentStopUUID === content.uuid}
                  screenReader={this.props.screenReader}
                  index={index}
                  listLength={audioContent.length}
                  contentWidth={width}
                  locale={this.props.locale}
                  actions={{
                    analyticsTrackTranscriptOpenned: () => {
                      //   analyticsTrackTranscriptOpenned(tourStop.title, content.title);
                    },
                    reloadAudio: () => {
                      // playTrack(tourStop, content.uuid, false);
                    },
                    audioAction: () => {
                      // if (this.props.currentStopUUID === content.uuid) {
                      //   togglePausePlay();
                      // } else {
                      //   playTrack(tourStop, content.uuid, false);
                      // }
                    },
                  }}
                />
              );
            }),
          );
        }

        let tourStopsList = [];
        if (tourStops.length > 0) {
          if (audioContent.length > 0) {
            totalIndex++;
          }

          stickyHeaders.push(totalIndex);
          tourStopsList.push(
            <StickyHeader key={totalIndex} title={translate('themes')} />,
          );

          tourStopsList.push(
            ...tourStops.map((tourStop, index) => {
              totalIndex++;

              const tourItem = renderItem(
                tourStop,
                index,
                item => {},
                this.props.currentStopUUID,
                this.props.locale,
                tourStops,
              );

              return <View key={totalIndex}>{tourItem}</View>;
            }),
          );
        }

        let amenitiesList = [];
        if (amenities.length > 0) {
          if (tourStops.length > 0 || audioContent.length > 0) {
            totalIndex++;
          }

          stickyHeaders.push(totalIndex);
          amenitiesList.push(
            <StickyHeader
              key={totalIndex}
              title={translate('nearMeScreen_Amenities')}
            />,
          );

          amenitiesList.push(
            ...amenities.map((amenity, index) => {
              totalIndex++;

              return (
                <AmenitiesItem
                  key={totalIndex}
                  amenity={amenity}
                  border={index !== amenities.length - 1}
                />
              );
            }),
          );
        }

        contentView = (
          <ScrollView
            automaticallyAdjustContentInsets={false}
            stickyHeaderIndices={stickyHeaders}>
            {highlightsList}
            {tourStopsList}
            {amenitiesList}
          </ScrollView>
        );
      }
    }

    let floor;
    if (this.props.floor === null) {
      floor = translate('nearMeScreen_Title');
    } else {
      floor = `${translate('floor')} ${this.props.floor}`;
    }

    let bottomOffset = 0;
    if (this.props.playerOpen) {
      bottomOffset += BOTTOM_PLAYER_HEIGHT;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, { marginBottom: bottomOffset }]}>
          {debugView}
          {contentView}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerOpen: state.bottomPlayer.playerOpen,
    locale: state.localization.locale,
    tracking: true,
    locationServicesStatus: 'LOCATION_SERVICES_STATUS_AUTHORIZED',
    bluetoothOn: true,
    closeTourStops: [
      {
        floor: '2–4',
        order: 1,
        title: 'tours_highlights_title',
        audioContent: [
          {
            id: '201',
            region: 'Great Hall',
            category: 'HIGHLIGHT',
            title: 'stops_welcomeToTheNordicMuseum_title',
            duration: 'stops_welcomeToTheNordicMuseum_duration',
            transcript: 'stops_welcomeToTheNordicMuseum_transcript',
          },
          {
            id: '401',
            region: 'Homes and Interiors E',
            category: 'HIGHLIGHT',
            title: 'stops_theTwoRoomCottage_title',
            duration: 'stops_theTwoRoomCottage_duration',
          },
          {
            id: '408',
            region: 'Homes and Interiors E',
            category: 'HIGHLIGHT',
            title: 'stops_theStateBedroom_title',
            duration: 'stops_theStateBedroom_duration',
          },
          {
            id: '413',
            region: 'Homes and Interiors E',
            category: 'HIGHLIGHT',
            title: 'stops_theBrewersHouse_title',
            duration: 'stops_theBrewersHouse_duration',
          },
          {
            id: '424',
            region: 'Homes and Interiors W',
            category: 'HIGHLIGHT',
            title: 'stops_theMerchantsDrawingRoom_title',
            duration: 'stops_theMerchantsDrawingRoom_duration',
          },
          {
            id: '425',
            region: 'Homes and Interiors W',
            category: 'HIGHLIGHT',
            title: 'stops_functionalistClassicEva_title',
            duration: 'stops_functionalistClassicEva_duration',
          },
          {
            id: '434',
            region: 'Sapmi',
            category: 'HIGHLIGHT',
            title: 'stops_theReindeer_title',
            duration: 'stops_theReindeer_duration',
          },
          {
            id: '426',
            region: 'Sapmi',
            category: 'HIGHLIGHT',
            title: 'stops_sapmi_title',
            duration: 'stops_sapmi_duration',
          },
          {
            id: '423',
            region: 'N Balcony 4',
            category: 'HIGHLIGHT',
            title: 'stops_arturHazeliussBanquetHall_title',
            duration: 'stops_arturHazeliussBanquetHall_duration',
          },
          {
            id: '469',
            region: 'N Balcony 4',
            category: 'HIGHLIGHT',
            title: 'stops_theTextileGallery_title',
            duration: 'stops_theTextileGallery_duration',
          },
          {
            id: '456',
            region: 'Swedish Folk Art',
            category: 'HIGHLIGHT',
            title: 'stops_thePowerOfTheChair_title',
            duration: 'stops_thePowerOfTheChair_duration',
          },
          {
            id: '451',
            region: 'Swedish Folk Art',
            category: 'HIGHLIGHT',
            title: 'stops_theShapesOfTheGrandfatherClocks_title',
            duration: 'stops_theShapesOfTheGrandfatherClocks_duration',
          },
          {
            id: '301',
            region: 'Jewellery',
            category: 'HIGHLIGHT',
            title: 'stops_jewellery_title',
            duration: 'stops_jewellery_duration',
          },
          {
            id: '302',
            region: 'Doll House',
            category: 'HIGHLIGHT',
            title: 'stops_swedensOldestDollsHouse_title',
            duration: 'stops_swedensOldestDollsHouse_duration',
          },
          {
            id: '316',
            region: 'Table Settings',
            category: 'HIGHLIGHT',
            title: 'stops_aSwanOnTheTable_title',
            duration: 'stops_aSwanOnTheTable_duration',
          },
          {
            id: '328',
            region: 'Table Settings',
            category: 'HIGHLIGHT',
            title: 'stops_tenKindsOfBiscuits_title',
            duration: 'stops_tenKindsOfBiscuits_duration',
          },
          {
            id: '330',
            region: 'Gustav Vasa',
            category: 'HIGHLIGHT',
            title: 'stops_portalToThePalaceOfEverydayLife_title',
            duration: 'stops_portalToThePalaceOfEverydayLife_duration',
          },
          {
            id: '355',
            region: 'Traditions',
            category: 'HIGHLIGHT',
            title: 'stops_whenHanseKalleDied_title',
            duration: 'stops_whenHanseKalleDied_duration',
          },
          {
            id: '333',
            region: 'Traditions',
            category: 'HIGHLIGHT',
            title: 'stops_midsummersEve_title',
            duration: 'stops_midsummersEve_duration',
          },
          {
            id: '357',
            region: 'Strindberg',
            category: 'HIGHLIGHT',
            title: 'stops_augustStrindbergsArt_title',
            duration: 'stops_augustStrindbergsArt_duration',
          },
          {
            id: '356',
            region: 'Strindberg',
            category: 'HIGHLIGHT',
            title: 'stops_augustStrindbergsWriting_title',
            duration: 'stops_augustStrindbergsWriting_duration',
          },
          {
            id: '202',
            region: '1940s Apartment',
            category: 'HIGHLIGHT',
            title: 'stops_the1940SApartment_title',
            duration: 'stops_the1940SApartment_duration',
          },
        ],
        category: 'HIGHLIGHTS',
        imageURL: 'highlights.png',
        imageWidth: 750,
        imageHeight: 345,
        imageAccessibilityLabel: 'tours_highlights_imageAccessibilityLabel',
        shortCredit: 'tours_highlights_shortCredit',
        longCredit: 'tours_highlights_longCredit',
        duration: 'tours_highlights_duration',
      },
      {
        floor: 2,
        order: 1,
        title: 'tours_theArcticWhileTheIceIsMelting_title',
        audioContent: [
          {
            id: 203,
            category: 'CONTEXT',
            title: 'stops_theArcticTheLandUnderTheNorthStar_title',
          },
          {
            id: 204,
            category: 'CONTEXT',
            title: 'stops_arcticBorders_title',
          },
          {
            id: 205,
            category: 'CONTEXT',
            title: 'stops_aMeltingWorld_title',
          },
          {
            id: 206,
            category: 'CONTEXT',
            title: 'stops_threatenedLife_title',
          },
          {
            id: 207,
            category: 'CONTEXT',
            title: 'stops_theLivingIce_title',
          },
          {
            id: 208,
            category: 'CONTEXT',
            title: 'stops_humansAndIce_title',
          },
          {
            id: 209,
            category: 'CONTEXT',
            title: 'stops_secretsOfTheIce_title',
          },
          {
            id: 210,
            category: 'CONTEXT',
            title: 'stops_inMotion_title',
          },
          {
            id: 211,
            category: 'CONTEXT',
            title: 'stops_atHomeInTheArctic_title',
          },
          {
            id: 212,
            category: 'CONTEXT',
            title: 'stops_warmthAndLight_title',
          },
          {
            id: 213,
            category: 'CONTEXT',
            title: 'stops_inThePantry_title',
          },
          {
            id: 214,
            category: 'CONTEXT',
            title: 'stops_theSignificanceOfClothing_title',
          },
          {
            id: 215,
            category: 'CONTEXT',
            title: 'stops_theClothesOfIcelandAndTheFaroeIslands_title',
          },
          {
            id: 216,
            category: 'CONTEXT',
            title: 'stops_anIcelandicFormalOutfit_title',
          },
          {
            id: 217,
            category: 'CONTEXT',
            title: 'stops_theClothesOfGreenland_title',
          },
          {
            id: 218,
            category: 'CONTEXT',
            title: 'stops_aBoysAttire_title',
          },
          {
            id: 219,
            category: 'CONTEXT',
            title: 'stops_womensClothingInGreenland_title',
          },
          {
            id: 220,
            category: 'CONTEXT',
            title: 'stops_samiClothing_title',
          },
          {
            id: 221,
            category: 'CONTEXT',
            title: 'stops_theResourceLandscape_title',
          },
          {
            id: 222,
            category: 'CONTEXT',
            title: 'stops_theBattleForResources_title',
          },
          {
            id: 223,
            category: 'CONTEXT',
            title: 'stops_downInTheMine_title',
          },
          {
            id: 224,
            category: 'CONTEXT',
            title: 'stops_theWhales_title',
          },
          {
            id: 225,
            category: 'CONTEXT',
            title: 'stops_lightInTheDarkness_title',
          },
          {
            id: 226,
            category: 'CONTEXT',
            title: 'stops_theFuture_title',
          },
        ],
        imageURL: 'arctic.png',
        imageWidth: 750,
        imageHeight: 345,
        imageAccessibilityLabel:
          'tours_theArcticWhileTheIceIsMelting_imageAccessibilityLabel',
        shortCredit: 'tours_theArcticWhileTheIceIsMelting_shortCredit',
        longCredit: 'tours_theArcticWhileTheIceIsMelting_longCredit',
        duration: 'tours_theArcticWhileTheIceIsMelting_duration',
      },
    ],
    amenities: [
      {
        floor: '1',
        icon: 'cloakroom.png',
        title: 'amenities_cloakroom_title',
      },
      {
        floor: '1',
        icon: 'restrooms.png',
        title: 'amenities_toilets_title',
      },
      {
        floor: '1',
        icon: 'shop.png',
        title: 'amenities_shop_title',
        description: 'amenities_shop_description',
      },
    ],
    audioContent: [
      {
        id: '316',
        region: 'Table Settings',
        category: 'HIGHLIGHT',
        title: 'stops_aSwanOnTheTable_title',
        duration: 'stops_aSwanOnTheTable_duration',
      },
      {
        id: '328',
        region: 'Table Settings',
        category: 'HIGHLIGHT',
        title: 'stops_tenKindsOfBiscuits_title',
        duration: 'stops_tenKindsOfBiscuits_duration',
      },
      {
        id: '330',
        region: 'Gustav Vasa',
        category: 'HIGHLIGHT',
        title: 'stops_portalToThePalaceOfEverydayLife_title',
        duration: 'stops_portalToThePalaceOfEverydayLife_duration',
      },
    ],
    floor: 1,
    activeTab: null,
    atNearMeRoot: null,
    timerActive: false,
    playerStatus: false,
    currentStopUUID: null,
    screenReader: null,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      playTrack,
      togglePausePlay,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true },
)(NearMe);
