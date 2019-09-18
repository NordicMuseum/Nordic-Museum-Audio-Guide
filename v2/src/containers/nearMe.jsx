import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BluetoothButton from '../components/buttons/bluetoothButton';
import LocationServicesButton from '../components/buttons/locationServicesButton';

import { translate } from '../i18n';

import {
  globalStyles,
  NAV_BAR_TEXT,
  NAV_BAR_BACKGROUND,
  BOTTOM_PLAYER_HEIGHT,
  LIGHT_BLUE,
  BOTTOM_BAR_HEIGHT,
} from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginTop: 65,
    marginBottom: 100,
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
          text: 'Near Me',
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
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

      if (this.props.floor !== null) {
        if (tourStopsNum === 0) {
          voiceOverMessage = translate('nearMeScreen_StoriesMessageNone');
        } else if (tourStopsNum === 1) {
          voiceOverMessage = translate('nearMeScreen_StoriesMessageSingular');
        } else {
          voiceOverMessage = translate('nearMeScreen_StoriesMessagePlural');
          voiceOverMessage = voiceOverMessage.replace(
            ' x ',
            ` ${tourStopsNum} `,
          );
        }
      }

      // Only announce changes when:
      // 1. The Near Me Tab is active
      // 2. The navigator is at the root view
      // 3. The number of stops has changed
      // 4. The autoplay timer is not active
      // 5. The player is not currently playing
      if (
        this.props.activeTab === TAB_NEARME &&
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
            <StickyHeader
              key={totalIndex}
              title={translate('Highlights_shortTitle')}
            />,
          );

          const uuids = [];
          audioContent.forEach(content => {
            uuids.push(content.uuid);
          });

          const query = `uuid == "${uuids.join('" OR uuid == "')}"`;

          // Wrap content in a 'dynamic' tourStop
          const tourStop = {
            uuid: uuid.v4(),
            floor: this.props.floor,
            shortTitle: translate('Highlights_shortTitle'),
            longTitle: translate('Highlights_shortTitle'),
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
                      playTrack(tourStop, content.uuid, false);
                    },
                    audioAction: () => {
                      if (this.props.currentStopUUID === content.uuid) {
                        togglePausePlay();
                      } else {
                        playTrack(tourStop, content.uuid, false);
                      }
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

              return (
                <View style={{ height: totalCellHeight }} key={totalIndex}>
                  {tourItem}
                </View>
              );
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

    let containerMargin = BOTTOM_BAR_HEIGHT;
    if (this.props.playerOpen) {
      containerMargin = BOTTOM_PLAYER_HEIGHT + BOTTOM_BAR_HEIGHT;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, { marginBottom: containerMargin }]}>
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
    tracking: false,
    locationServicesStatus: false,
    bluetoothOn: false,
    closeTourStops: [],
    amenities: [],
    audioContent: [],
    floor: null,
    activeTab: null,
    atNearMeRoot: null,
    timerActive: false,
    playerStatus: false,
    currentStopUUID: null,
    screenReader: null,
    locale: null,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      // hideBottomPlayer: hideBottomPlayerAction,
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
