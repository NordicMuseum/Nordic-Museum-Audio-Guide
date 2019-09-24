import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { translate } from '../i18n';

import { Navigation } from 'react-native-navigation';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

import { togglePausePlay, playTrack, unloadAudio } from '../actions/audio';

import { updateNearMeRootStatus } from '../actions/navigation';

import NavigationBar from '../components/navigationBar';
import { AUDIO_CONTENT_ITEM_HEIGHT } from '../components/audioContentItem';
import AudioContentList from '../components/audioContentList';

import { parseDisplayText, parseVoiceoverText } from '../utilities';

//import { analyticsTrackContentOpened, analyticsTrackScreen } from '../actions/analytics';

import {
  OFF_BLACK,
  ACTION,
  LIGHT_GRAY,
  NAV_BAR_TEXT,
  getBottomTabsHeight,
  BOTTOM_PLAYER_HEIGHT,
  NAV_BAR_BACKGROUND,
} from '../styles.js';

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

class TourStop extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        title: {
          text: 'TourStop',
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
        showBorder: false,
      },
    };
  }

  // static propTypes = {
  //   navigator: PropTypes.object.isRequired,
  //   tab: PropTypes.string.isRequired,
  //   imageURL: PropTypes.string,
  //   tourStop: PropTypes.object.isRequired,
  //   currentAudio: PropTypes.string,
  //   screenReader: PropTypes.bool.isRequired,
  //   playerStatus: PropTypes.string.isRequired,
  //   playerOpen: PropTypes.bool.isRequired,
  //   initialCategory: PropTypes.string.isRequired,
  //   currentStopUUID: PropTypes.string.isRequired,
  //   locale: PropTypes.string.isRequired,
  //   autoplayInitial: PropTypes.bool.isRequired,
  //   searchedTrack: PropTypes.object,
  //   searchedTrackIndex: PropTypes.number,
  //   floor: PropTypes.number.isRequired,
  //   actions: PropTypes.shape({
  //     playTrack: PropTypes.func.isRequired,
  //     unloadAudio: PropTypes.func.isRequired,
  //     togglePausePlay: PropTypes.func.isRequired,
  //     updateNearMeRootStatus: PropTypes.func.isRequired,
  //   }),
  // };

  // componentDidMount() {
  //   // analyticsTrackContentOpened(this.props.tourStop.shortTitle);
  //   // analyticsTrackScreen('Theme Page');

  //   // if (this.props.tab === 'TAB_SEARCH') {
  //   //   this.props.actions.playTrack(
  //   //     this.props.tourStop,
  //   //     this.props.searchedTrack.uuid,
  //   //     false // autoplay
  //   //   );
  //   // }
  // }

  // componentWillUnmount() {
  //   // this.props.actions.updateNearMeRootStatus(true);
  // }

  render() {
    let { tourStop } = this.props;

    const { playTrack, togglePausePlay } = this.props.actions;

    const duration = translate(tourStop.duration);

    let containerMargin = 0;
    if (this.props.playerOpen) {
      containerMargin += BOTTOM_PLAYER_HEIGHT;
    }

    // let accessibilityLabel;

    // if (tourStop.shortCreditAccessibilityLabel) {
    //   accessibilityLabel = parseVoiceoverText(tourStop.shortCreditAccessibilityLabel);
    // } else {
    //   accessibilityLabel = parseVoiceoverText(I18n.t(tourStop.shortCredit));
    // }

    let yOffset = 0;
    // if (this.props.searchedTrackIndex) {
    //   yOffset = AUDIO_CONTENT_ITEM_HEIGHT * this.props.searchedTrackIndex;
    // }

    return (
      <View style={{ flex: 1, backgroundColor: LIGHT_GRAY }}>
        <ParallaxScrollView
          style={[styles.container, { marginBottom: containerMargin }]}
          contentOffset={{ x: 0, y: yOffset }}
          backgroundColor={LIGHT_GRAY}
          contentBackgroundColor={LIGHT_GRAY}
          parallaxHeaderHeight={254}
          stickyHeaderHeight={64}
          renderFixedHeader={() => (
            <NavigationBar
              labelStyle={{
                color: NAV_BAR_TEXT,
              }}
              buttonColor={ACTION}
              backButtonPress={() => {
                Navigation.pop(this.props.componentId);
              }}
              barStyle={{
                backgroundColor: 'transparent',
                height: 44,
              }}
            />
          )}
          renderStickyHeader={() => (
            <NavigationBar
              label={parseDisplayText(translate(tourStop.title))}
              labelStyle={{
                color: NAV_BAR_TEXT,
              }}
              buttonColor={NAV_BAR_TEXT}
              barStyle={{
                backgroundColor: 'transparent',
                height: 44,
              }}
            />
          )}
          renderForeground={() => {
            let imageURL = this.props.imageURL;
            if (
              this.props.locale === 'svKids' &&
              this.tourStop.regions.length === 0
            ) {
              imageURL = 'highlightsKids.png';
            }

            return (
              <View
                style={{ borderBottomColor: '#ffffff', borderBottomWidth: 1 }}>
                <ImageBackground
                  style={styles.headerImage}
                  source={{ uri: imageURL }}>
                  <View style={styles.headerTitle} pointerEvents={'none'}>
                    <Text style={styles.headerTitleText}>
                      {parseDisplayText(
                        translate(tourStop.title),
                      ).toUpperCase()}
                    </Text>
                  </View>
                </ImageBackground>
                <View style={styles.playAllButtonContainer}>
                  <TouchableOpacity
                    style={[styles.playAllButton, { width: 0.65 * width }]}
                    onPress={() => {
                      playTrack(
                        this.props.tourStop,
                        this.props.tourStop.audioContent[0].uuid,
                        true,
                      );
                    }}>
                    <Image
                      style={styles.playAllButtonIcon}
                      source={require('../assets/PlayButton.png')}
                    />
                    <Text style={styles.playAllButtonText}>
                      {parseDisplayText(translate('playAll')).toUpperCase()}
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
                        {`${translate('floor').toUpperCase()} `}
                      </Text>
                    </View>
                    <View style={styles.audioContentDuration}>
                      <Image
                        style={styles.durationIcon}
                        source={require('../assets/ClockIcon.png')}
                      />
                      <Text style={styles.durationText}>
                        {`${Math.floor(duration / 60)} ${translate(
                          'min',
                        ).toUpperCase()}`}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}>
          <AudioContentList
            tourStop={this.props.tourStop}
            //currentAudio={this.props.currentAudio}
            //playerStatus={this.props.playerStatus}
            //screenReader={this.props.screenReader}
            locale={this.props.locale}
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

const mapStateToProps = state => {
  return {
    currentAudio: state.bottomPlayer.uuid,
    currentAudioTime: state.bottomPlayer.time,
    screenReader: state.accessibility.screenReader,
    playerStatus: state.bottomPlayer.playerStatus,
    playerOpen: state.bottomPlayer.playerOpen,
    autoplayOn: state.bottomPlayer.autoplayOn,
    autoplayInitial: state.bottomPlayer.autoplayInitial,
    currentStopUUID: state.bottomPlayer.stopUUID,
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        playTrack,
        unloadAudio,
        togglePausePlay,
        updateNearMeRootStatus,
      },
      dispatch,
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true },
)(TourStop);
