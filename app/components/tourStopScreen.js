import React, { Component, PropTypes } from 'react';

import I18n from 'react-native-i18n';

import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import NavigationBar from './navigationBar';
import { AUDIO_CONTENT_ITEM_HEIGHT } from './audioContentItem';
import AudioContentList from './audioContentList';

import { parseDisplayText, parseVoiceoverText } from '../utilities';

import { analyticsTrackContentOpened, analyticsTrackScreen } from '../actions/analytics';

import { OFF_BLACK, ACTION, LIGHT_GRAY, NAV_BAR_TEXT } from '../styles.js';

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
    borderRadius: 9,
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
    currentAudio: PropTypes.string,
    screenReader: PropTypes.bool.isRequired,
    playerStatus: PropTypes.string.isRequired,
    playerOpen: PropTypes.bool.isRequired,
    initialCategory: PropTypes.string.isRequired,
    currentStopUUID: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    autoplayInitial: PropTypes.bool.isRequired,
    searchedTrack: PropTypes.object,
    searchedTrackIndex: PropTypes.number,
    floor: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      playTrack: PropTypes.func.isRequired,
      unloadAudio: PropTypes.func.isRequired,
      togglePausePlay: PropTypes.func.isRequired,
      updateNearMeRootStatus: PropTypes.func.isRequired,
    }),
  };

  componentDidMount() {
    analyticsTrackContentOpened(this.props.tourStop.shortTitle);
    analyticsTrackScreen('Theme Page');

    if (this.props.tab === 'TAB_SEARCH') {
      this.props.actions.playTrack(
        this.props.tourStop,
        this.props.searchedTrack.uuid,
        false // autoplay
      );
    }
  }

  componentWillUnmount() {
    this.props.actions.updateNearMeRootStatus(true);
  }

  render() {
    const { tourStop, locale } = this.props;

    const { playTrack, togglePausePlay } = this.props.actions;

    let containerMargin = BOTTOMBARHEIGHT;
    if (this.props.playerOpen) {
      containerMargin = BOTTOMPLAYERHEIGHT + BOTTOMBARHEIGHT;
    }

    let accessibilityLabel;

    if (tourStop.shortCreditAccessibilityLabel) {
      accessibilityLabel = parseVoiceoverText(tourStop.shortCreditAccessibilityLabel);
    } else {
      accessibilityLabel = parseVoiceoverText(I18n.t(tourStop.shortCredit));
    }

    let yOffset = 0;
    if (this.props.searchedTrackIndex) {
      yOffset = AUDIO_CONTENT_ITEM_HEIGHT * this.props.searchedTrackIndex;
    }

    return (
      <View style={{ flex: 1, backgroundColor: LIGHT_GRAY }}>
        <ParallaxScrollView
          style={[styles.container, { marginBottom: containerMargin }]}
          contentOffset={{ x: 0, y: yOffset }}
          backgroundColor={LIGHT_GRAY}
          contentBackgroundColor={LIGHT_GRAY}
          parallaxHeaderHeight={254}
          stickyHeaderHeight={64}
          renderFixedHeader={() =>
            <NavigationBar
              labelStyle={{
                color: NAV_BAR_TEXT,
              }}
              buttonColor={ACTION}
              backButtonPress={() => {
                this.props.navigator.pop();
              }}
              barStyle={{
                backgroundColor: 'transparent',
                height: 44,
              }}
            />}
          renderStickyHeader={() =>
            <NavigationBar
              label={parseDisplayText(I18n.t(tourStop.shortTitle))}
              labelStyle={{
                color: NAV_BAR_TEXT,
              }}
              buttonColor={NAV_BAR_TEXT}
              barStyle={{
                backgroundColor: 'transparent',
                height: 44,
              }}
            />}
          renderForeground={() => {
            let imageURL = this.props.imageURL;
            if (locale === 'svKids' && tourStop.regions.length === 0) {
              imageURL = 'highlightsKids.png';
            }

            return (
              <View style={{ borderBottomColor: '#ffffff', borderBottomWidth: 1 }}>
                <Image style={styles.headerImage} source={{ uri: imageURL }}>
                  <View style={styles.headerTitle} pointerEvents={'none'}>
                    <Text style={styles.headerTitleText}>
                      {parseDisplayText(I18n.t(tourStop.shortTitle)).toUpperCase()}
                    </Text>
                  </View>
                </Image>
                <View style={styles.playAllButtonContainer}>
                  <TouchableOpacity
                    style={[styles.playAllButton, { width: 0.65 * width }]}
                    onPress={() => {
                      playTrack(
                        this.props.tourStop,
                        this.props.tourStop.audioContent[0].uuid,
                        true // autoplay
                      );
                    }}
                  >
                    <Image
                      style={styles.playAllButtonIcon}
                      source={require('../assets/PlayButton.png')}
                    />
                    <Text style={styles.playAllButtonText}>
                      {parseDisplayText(I18n.t('playAll')).toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.audioContentInfo}>
                  <View style={styles.audioContentQuickInfo}>
                    <View style={styles.audioContentFloor}>
                      <Image style={styles.floorIcon} source={require('../assets/FloorIcon.png')} />
                      <Text style={styles.floorText}>
                        {`${I18n.t('floor').toUpperCase()} ${this.props.floor}`}
                      </Text>
                    </View>
                    <View style={styles.audioContentDuration}>
                      <Image
                        style={styles.durationIcon}
                        source={require('../assets/ClockIcon.png')}
                      />
                      <Text style={styles.durationText}>
                        {`${Math.floor(this.props.duration / 60)} ${I18n.t('min').toUpperCase()}`}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        >
          <AudioContentList
            tourStop={tourStop}
            currentAudio={this.props.currentAudio}
            playerStatus={this.props.playerStatus}
            screenReader={this.props.screenReader}
            locale={locale}
            actions={{
              playTrack,
              togglePausePlay,
            }}
          />
        </ParallaxScrollView>
      </View>
    );
  }
}

export default TourStopScreen;
