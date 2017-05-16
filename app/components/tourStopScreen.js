
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

import { TourStop } from '../models/tourStop';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import NavigationBar from './navigationBar';
import AudioContentList from './audioContentList';

import {
  parseDisplayText,
  parseVoiceoverText,
} from '../utilities';

import { globalStyles, OFF_BLACK, TEAL, TURQUOISE } from '../styles.js';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 167,
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
    backgroundColor: TURQUOISE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 25,
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
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
      <View style={{ flex: 1 }}>
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
          <TouchableOpacity style={styles.playAllButton}>
            <Image
              style={styles.playAllButtonIcon}
              source={require('../assets/PlayButton.png')}
            />
            <Text style={styles.playAllButtonText}>
              PLAY ALL
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[styles.container, { marginBottom: containerMargin }]}
        >
          <ScrollView
            automaticallyAdjustContentInsets={false}
            style={styles.scrollableContent}
          >
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
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default TourStopScreen;
