
import React, { Component, PropTypes } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

import I18n from 'react-native-i18n';
import uuid from 'uuid';

import NavigationBar from './navigationBar';
import StickyHeader from './stickyHeader';

import { renderItem } from './grid';

import AudioContentItem from './audioContentItem';
import TourStop from '../containers/tourStop';
import AmenitiesItem from './amenitiesItem';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';
import { TAB_NEARME } from '../actions/navigation';
import { PLAYER_STATUS_PLAY } from '../actions/audio';

import BluetoothButton from './buttons/bluetoothButton';
import LocationServicesButton from './buttons/locationServicesButton';

// I really hate this...
import { getRealmInstance } from '../realm';
import { AudioContent } from '../models/audioContent';
const realm = getRealmInstance();
const audioContentRealm = realm.objects(AudioContent.NAME);
// This, ↓, creates a circular reference. Fix it!
// const audioContentRealm = AudioContent.allRealmObjects();

import {
   screenReaderScreenChanged,
 } from '../actions/accessibility';

import {
    analyticsTrackBeaconRegion,
  } from '../actions/analytics';

import { globalStyles, NAV_BAR_TEXT, NAV_BAR_BACKGROUND, TEAL, OFF_BLACK, LIGHT_BLUE, LIGHT_GRAY } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginTop: 65,
    marginBottom: 100,
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: NAV_BAR_BACKGROUND,
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

// I tried to do this through state but couldn't...
let lastSeenNumber = 0;

class NearMeScreen extends Component {
  static title = I18n.t('nearMeScreen_Title');

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    playerOpen: PropTypes.bool.isRequired,
    closeTourStops: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    audioContent: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    regions: PropTypes.array.isRequired,
    amenities: PropTypes.array.isRequired,
    timerActive: PropTypes.bool.isRequired,
    activeTab: PropTypes.string.isRequired,
    screenReader: PropTypes.bool.isRequired,
    atNearMeRoot: PropTypes.bool.isRequired,
    playerStatus: PropTypes.string.isRequired,
    currentStopUUID: PropTypes.string.isRequired,
    floor: PropTypes.string,
    tracking: PropTypes.bool,
    bluetoothOn: PropTypes.bool.isRequired,
    locationServicesStatus: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      playTrack: PropTypes.func.isRequired,
      togglePausePlay: PropTypes.func.isRequired,
    }).isRequired,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.activeTab === TAB_NEARME && nextProps.atNearMeRoot;
  }

  render() {
    let contentView;
    let debugView;

    const storiesMessage = I18n.t('nearMeScreen_StoriesMessage');

    if (this.props.tracking === false) {
      contentView = (
        <View style={[styles.messageContainer, styles.settingContainer]}>
          <Text style={[globalStyles.body, styles.storiesMessageText]}>
            {`${storiesMessage}\n\n${I18n.t('nearMeScreen_LocationNeeds')}`}
          </Text>
          <View style={styles.buttonsContainer}>
            <LocationServicesButton
              locationServicesStatus={this.props.locationServicesStatus}
            />
            <BluetoothButton
              bluetoothOn={this.props.bluetoothOn}
            />
          </View>
        </View>
      );
    } else if (this.props.tracking === true) {
      const tourStops = this.props.closeTourStops;
      const tourStopsNum = tourStops.length;
      const amenities = this.props.amenities;
      const audioContent = this.props.audioContent;
      let voiceOverMessage;

      if (this.props.floor !== null) {
        if (tourStopsNum === 0) {
          voiceOverMessage = I18n.t('nearMeScreen_StoriesMessageNone');
        } else if (tourStopsNum === 1) {
          voiceOverMessage = I18n.t('nearMeScreen_StoriesMessageSingular');
        } else {
          voiceOverMessage = I18n.t('nearMeScreen_StoriesMessagePlural');
          voiceOverMessage = voiceOverMessage.replace(' x ', ` ${tourStopsNum} `);
        }
      }

      // Only announce changes when:
      // 1. The Near Me Tab is active
      // 2. The navigator is at the root view
      // 3. The number of stops has changed
      // 4. The autoplay timer is not active
      // 5. The player is not currently playing
      if (this.props.activeTab === TAB_NEARME &&
          this.props.atNearMeRoot &&
          lastSeenNumber !== tourStopsNum &&
          !this.props.timerActive &&
          this.props.playerStatus !== PLAYER_STATUS_PLAY
      ) {
        lastSeenNumber = tourStopsNum;
        if (voiceOverMessage) {
          screenReaderScreenChanged(voiceOverMessage);
        }
      }

      const regionsDetected = this.props.regions ? this.props.regions.join(', ') : '';

      if (regionsDetected) {
        analyticsTrackBeaconRegion(regionsDetected);

        if (__DEV__) {
          debugView = (
            <View
              style={{
                height: 25,
                backgroundColor: LIGHT_BLUE,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                }}
              >
                {`Regions: ${regionsDetected}`}
              </Text>
            </View>
          );
        }
      }

      if (amenities.length === 0 &&
          tourStops.length === 0 &&
          audioContent.length === 0) {
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

        const {
          playTrack,
          togglePausePlay,
        } = this.props.actions;

        let highlightsList = [];
        if (audioContent.length > 0) {
          stickyHeaders.push(totalIndex);
          highlightsList.push(
            <StickyHeader
              key={totalIndex}
              title={I18n.t('Highlights_floor2_shortTitle')}
            />
          );

          const uuids = [];
          audioContent.forEach((content) => {
            uuids.push(content.uuid);
          });

          const query = `uuid == "${uuids.join('" OR uuid == "')}"`;

          // Wrap content in a 'dynamic' tourStop
          const tourStop = {
            uuid: uuid.v4(),
            floor: this.props.floor,
            shortTitle: I18n.t('Highlights_floor2_shortTitle'),
            longTitle: I18n.t('Highlights_floor2_shortTitle'),
            audioContent: audioContentRealm.filtered(query),
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
                      playTrack(
                        tourStop,
                        content.uuid,
                        false,
                      );
                    },
                    audioAction: () => {
                      if (this.props.currentStopUUID === content.uuid) {
                        togglePausePlay();
                      } else {
                        playTrack(
                          tourStop,
                          content.uuid,
                          false,
                        );
                      }
                    },
                  }}
                />
              );
            })
          );
        }


        let tourStopsList = [];
        if (tourStops.length > 0) {
          totalIndex++;
          stickyHeaders.push(totalIndex);
          tourStopsList.push(
            <StickyHeader
              key={totalIndex}
              title={'Themes'}
            />
          );

          tourStopsList.push(
            ...tourStops.map((tourStop, index) => {
              totalIndex++;

              return renderItem(
                tourStop,
                index,
                (item) => {
                  this.props.navigator.push({
                    title: tourStop.shortTitle,
                    component: TourStop,
                    barTintColor: '#ffffff',
                    tintColor: TEAL,
                    titleTextColor: OFF_BLACK,
                    shadowHidden: true,
                    navigationBarHidden: true,
                    passProps: {
                      tourStop,
                      tab: TAB_NEARME,
                      floor: tourStop.floor,
                      duration: tourStop.duration[this.props.locale],
                      initialCategory: tourStop.initialAudio,
                      imageURL: tourStop.imageURL,
                    },
                  });
                },
                this.props.currentStopUUID,
                this.props.locale,
                tourStops,
              );
            })
          );
        }

        let amenitiesList = [];
        if (amenities.length > 0) {
          totalIndex++;
          stickyHeaders.push(totalIndex);
          amenitiesList.push(
            <StickyHeader
              key={totalIndex}
              title={I18n.t('nearMeScreen_Amenities')}
            />
          );

          amenitiesList.push(
            ...amenities.map((amenity, index) => {
              totalIndex++;

              return (
                <AmenitiesItem
                  key={totalIndex}
                  amenity={amenity}
                  border={index !== (amenities.length - 1)}
                />
              );
            })
          );
        }

        contentView = (
          <ScrollView
            automaticallyAdjustContentInsets={false}
            stickyHeaderIndices={stickyHeaders}
          >
            {highlightsList}
            {tourStopsList}
            {amenitiesList}
          </ScrollView>
        );
      }
    }

    let floor;
    if (this.props.floor === null) {
      floor = I18n.t('nearMeScreen_Title');
    } else {
      floor = `${I18n.t('floor')} ${this.props.floor}`;
    }

    let containerMargin = BOTTOMBARHEIGHT;
    if (this.props.playerOpen) {
      containerMargin = BOTTOMPLAYERHEIGHT + BOTTOMBARHEIGHT;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.statusBar} />
        <NavigationBar
          label={floor}
          labelStyle={{
            color: NAV_BAR_TEXT,
          }}
          barStyle={{
            backgroundColor: NAV_BAR_BACKGROUND,
            height: 44,
          }}
        />
        <View
          style={[styles.container, { marginBottom: containerMargin }]}
        >
          {debugView}
          {contentView}
        </View>
      </View>
    );
  }
}

export default NearMeScreen;
