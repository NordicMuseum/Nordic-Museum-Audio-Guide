
import React, { Component, PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

import { TourStop } from '../models/tourStop';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import NavigationBar from './navigationBar';
import AudioContentList from './audioContentList';

import {
  parseDisplayText,
  parseVoiceoverText,
} from '../utilities';

import { OFF_BLACK, ACTION, LIGHT_GRAY } from '../styles.js';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHT_GRAY,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 167,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    height: 147,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleText: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 22,
    textAlign: 'center',
  },
  playAllButtonContainer: {
    position: 'absolute',
    flex: 1,
    top: 147,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  playAllButton: {
    backgroundColor: ACTION,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 3,
  },
  playAllButtonIcon: {
    tintColor: '#ffffff',
    height: 16,
    width: 16,
    marginRight: 10,
    resizeMode: 'contain',
  },
  playAllButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollableContent: {
    paddingTop: 10,
  },
  audioContentInfo: {
    position: 'absolute',
    top: 170,
    left: 0,
    right: 0,
    paddingTop: 43,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
  },
  audioContentQuickInfo: {
    flexDirection: 'row',
  },
  audioContentFloor: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floorIcon: {
    marginRight: 10,
    tintColor: OFF_BLACK,
  },
  floorText: {
    fontSize: 16,
    color: OFF_BLACK,
  },
  audioContentDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationIcon: {
    marginRight: 10,
    tintColor: OFF_BLACK,
  },
  durationText: {
    fontSize: 16,
    color: OFF_BLACK,
  },
  imageTitle: {
    fontStyle: 'italic',
  },
  stickySection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  stickyHeaderTitleText: {
    backgroundColor: 'transparent',
    color: OFF_BLACK,
    fontWeight: '600',
    fontSize: 17,
  },
});

class TourStopScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    tab: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
    tourStop: PropTypes.object.isRequired,
    audioContent: PropTypes.array,
    currentAudio: PropTypes.string,
    currentAudioTime: PropTypes.number,
    autoplayOn: PropTypes.bool.isRequired,
    screenReader: PropTypes.bool.isRequired,
    playerStatus: PropTypes.string.isRequired,
    playerOpen: PropTypes.bool.isRequired,
    initialCategory: PropTypes.string.isRequired,
    currentStopUUID: PropTypes.string.isRequired,
    preferences: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    autoplayInitial: PropTypes.bool.isRequired,
    searchedByNumber: PropTypes.string,
    actions: PropTypes.shape({
      toggleAudioTranscript: PropTypes.func.isRequired,
      loadAudio: PropTypes.func.isRequired,
      updateCurrentAudioRoute: PropTypes.func.isRequired,
      togglePausePlay: PropTypes.func.isRequired,
      updateNearMeRootStatus: PropTypes.func.isRequired,
      loadAudioContent: PropTypes.func.isRequired,
    }),
  }

  componentWillMount() {
    const currentRoute = this.props.navigator.navigationContext.currentRoute;
    this.props.actions.updateCurrentAudioRoute(currentRoute, this.props.tab);
  }

  componentDidMount() {
    const {
      shortTitle,
      uuid,
    } = this.props.tourStop;

    // TODO: Only play after bottom bar has loaded
    if (uuid !== this.props.currentStopUUID) {
      this.props.actions.loadAudioContent(
        TourStop.jsonAudioContent(this.props.tourStop),
        this.props.initialCategory,
        this.props.autoplayOn,
        shortTitle,
        uuid,
        this.props.preferences.global,
        this.props.currentAudio,
        this.props.currentAudioTime,
        this.props.screenReader,
        this.props.autoplayInitial,
        this.props.searchedByNumber,
      );
    }
  }

  componentWillUnmount() {
    this.props.actions.updateNearMeRootStatus(true);
  }

  render() {
    const {
      toggleAudioTranscript,
      loadAudio,
      togglePausePlay,
    } = this.props.actions;

    let containerMargin = BOTTOMBARHEIGHT;
    if (this.props.playerOpen) {
      containerMargin = BOTTOMPLAYERHEIGHT + BOTTOMBARHEIGHT;
    }

    let accessibilityLabel;

    if (this.props.tourStop.shortCreditAccessibilityLabel) {
      accessibilityLabel = parseVoiceoverText(this.props.tourStop.shortCreditAccessibilityLabel);
    } else {
      accessibilityLabel = parseVoiceoverText(I18n.t(this.props.tourStop.shortCredit));
    }

    return (
      <View style={{ flex: 1, backgroundColor: LIGHT_GRAY }}>
        <ParallaxScrollView
          style={[styles.container, { marginBottom: containerMargin }]}
          backgroundColor={LIGHT_GRAY}
          contentBackgroundColor={LIGHT_GRAY}
          parallaxHeaderHeight={254}
          stickyHeaderHeight={64}
          renderStickyHeader={() => (
            <NavigationBar
              label={parseDisplayText(I18n.t(this.props.tourStop.shortTitle))}
              labelStyle={{
                color: OFF_BLACK,
              }}
              buttonColor={OFF_BLACK}
              backButtonPress={() => { this.props.navigator.pop(); }}
              barStyle={{
                backgroundColor: 'transparent',
                height: 44,
              }}
            />
          )}
          renderForeground={() => (
            <View style={{ borderBottomColor: '#ffffff', borderBottomWidth: 1 }}>
              <Image
                style={styles.headerImage}
                source={{ uri: this.props.imageURL }}
              >
                <NavigationBar
                  labelStyle={{
                    color: OFF_BLACK,
                  }}
                  buttonColor={'#ffffff'}
                  backButtonPress={() => { this.props.navigator.pop(); }}
                  barStyle={{
                    backgroundColor: 'transparent',
                    height: 44,
                  }}
                />
                <View
                  style={styles.headerTitle}
                  pointerEvents={'none'}
                >
                  <Text style={styles.headerTitleText}>
                    {parseDisplayText(I18n.t(this.props.tourStop.shortTitle)).toUpperCase()}
                  </Text>
                </View>
              </Image>
              <View style={styles.playAllButtonContainer}>
                <TouchableOpacity
                  style={[styles.playAllButton, { width: 0.65 * width }]}
                  activeOpacity={0.9}
                  onPress={() => {
                    this.props.actions.loadAudio(
                      this.props.audioContent,
                      this.props.audioContent[0],
                      true,
                      this.props.audioContent[0].uuid,
                      0,
                      this.props.tourStop.title,
                      this.props.currentStopUUID,
                      true,
                    );
                  }}
                >
                  <Image
                    style={styles.playAllButtonIcon}
                    source={require('../assets/PlayButton.png')}
                  />
                  <Text style={styles.playAllButtonText}>
                    PLAY ALL
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.audioContentInfo}>
                <View style={styles.audioContentQuickInfo}>
                  <View style={styles.audioContentFloor}>
                    <Image
                      style={styles.floorIcon}
                      source={require('../assets/FloorIcon.png')}
                    />
                    <Text style={styles.floorText}>
                      FLOOR 2
                    </Text>
                  </View>
                  <View style={styles.audioContentDuration}>
                    <Image
                      style={styles.durationIcon}
                      source={require('../assets/ClockIcon.png')}
                    />
                    <Text style={styles.durationText}>
                      30 MIN
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        >
          <AudioContentList
            tourStopTitle={this.props.tourStop.shortTitle}
            tourStopUUID={this.props.tourStop.uuid}
            audioContent={this.props.audioContent}
            currentAudio={this.props.currentAudio}
            currentAudioTime={this.props.currentAudioTime}
            autoplayOn={this.props.autoplayOn}
            playerStatus={this.props.playerStatus}
            screenReader={this.props.screenReader}
            locale={this.props.locale}
            actions={{
              toggleAudioTranscript,
              loadAudio,
              togglePausePlay,
            }}
          />
        </ParallaxScrollView>
      </View>
    );
  }
}

export default TourStopScreen;
