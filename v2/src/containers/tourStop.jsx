import React, {Component, PropTypes} from 'react';

//import I18n from 'react-native-i18n';

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

// import { BOTTOMBARHEIGHT } from './rootScreen';
// import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import NavigationBar from '../components/navigationBar';
//import { AUDIO_CONTENT_ITEM_HEIGHT } from './audioContentItem';
import AudioContentList from '../components/audioContentList';

import {parseDisplayText, parseVoiceoverText} from '../utilities';

//import { analyticsTrackContentOpened, analyticsTrackScreen } from '../actions/analytics';

import {OFF_BLACK, ACTION, LIGHT_GRAY, NAV_BAR_TEXT} from '../styles.js';

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
    // const { tourStop, locale } = this.props;

    locale = 'en';

    tourStop = {
      uuid: '07dc96fb-7bad-421b-a016-64e338987fcc',
      floor: '2–4',
      order: 0,
      regions: [],
      category: 'HIGHLIGHTS',
      imageURL: 'highlights.png',
      imageWidth: 750,
      imageHeight: 345,
      imageAccessibilityLabel: {
        en: 'Highlights',
        sv: 'Höjdpunkter',
        it: 'Le parti salienti',
        ar: 'مقتطفات',
        es: 'Atracciones principales',
        fi: 'Kohokohtia',
        de: 'Höhepunkte',
        ru: 'Реликвии',
        fr: 'Les incontournables',
        zh: 'Highlights',
        svKids: 'Barnens audioguide',
      },
      shortCredit: {
        en: '<i>Highlights</i>',
        sv: '<i>Höjdpunkter</i>',
        it: '<i>Le parti salienti</i>',
        ar: '<i>مقتطفات</i>',
        es: '<i>Atracciones principales</i>',
        fi: '<i>Kohokohtia</i>',
        de: '<i>Höhepunkte</i>',
        ru: '<i>Реликвии</i>',
        fr: '<i>Les incontournables</i>',
        zh: '<i>Highlights</i>',
        svKids: '<i>Barnens audioguide</i>',
      },
      longCredit: {
        en: 'Photo: Karolina Kristensson\n<i>Highlights</i>',
        sv: 'Foto: Karolina Kristensson\n<i>Höjdpunkter</i>',
        it: 'Foto: Karolina Kristensson\n<i>Le parti salienti</i>',
        ar: 'Foto: Karolina Kristensson\n<i>مقتطفات</i>',
        es: 'Foto: Karolina Kristensson\n<i>Atracciones principales</i>',
        fi: 'Foto: Karolina Kristensson\n<i>Kohokohtia</i>',
        de: 'Foto: Karolina Kristensson\n<i>Höhepunkte</i>',
        ru: 'Foto: Karolina Kristensson\n<i>Реликвии</i>',
        fr: 'Foto: Karolina Kristensson\n<i>Les incontournables</i>',
        zh: 'Foto: Karolina Kristensson\n<i>Highlights</i>',
        svKids: 'Foto: Karolina Kristensson\n<i>Barnens audioguide</i>',
      },
      duration: {
        ar: 2863,
        de: 2841,
        en: 2851,
        es: 2874,
        fi: 2986,
        fr: 2775,
        it: 2861,
        ru: 3473,
        sv: 2894,
        seSma: 2894,
        seSme: 2894,
        seSmj: 2894,
        svKids: 2286,
        svSimple: 2756,
        zh: 2863,
      },
      audioContent: [
        '201',
        '401',
        '408',
        '413',
        '424',
        '425',
        '434',
        '426',
        '423',
        '469',
        '456',
        '451',
        '301',
        '302',
        '316',
        '328',
        '330',
        '355',
        '333',
        '357',
        '356',
        '202',
      ],
      title: {
        en: 'Highlights',
        sv: 'Höjdpunkter',
        it: 'Le parti salienti',
        ar: 'مقتطفات',
        es: 'Atracciones principales',
        fi: 'Kohokohtia',
        de: 'Höhepunkte',
        ru: 'Реликвии',
        fr: 'Les incontournables',
        zh: 'Highlights',
        svKids: 'Barnens audioguide',
      },
    };

    // const { playTrack, togglePausePlay } = this.props.actions;

    const duration = tourStop.duration[locale];

    let containerMargin = 50; // BOTTOMBARHEIGHT;
    // if (this.props.playerOpen) {
    //   containerMargin = BOTTOMPLAYERHEIGHT + BOTTOMBARHEIGHT;
    // }

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
      <View style={{flex: 1, backgroundColor: LIGHT_GRAY}}>
        <ParallaxScrollView
          style={[styles.container, {marginBottom: containerMargin}]}
          contentOffset={{x: 0, y: yOffset}}
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
                //  this.props.navigator.pop();
              }}
              barStyle={{
                backgroundColor: 'transparent',
                height: 44,
              }}
            />
          )}
          renderStickyHeader={() => (
            <NavigationBar
              label={parseDisplayText('title')}
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
            if (locale === 'svKids' && tourStop.regions.length === 0) {
              imageURL = 'highlightsKids.png';
            }

            return (
              <View
                style={{borderBottomColor: '#ffffff', borderBottomWidth: 1}}>
                <ImageBackground
                  style={styles.headerImage}
                  source={{uri: imageURL}}>
                  <View style={styles.headerTitle} pointerEvents={'none'}>
                    <Text style={styles.headerTitleText}>
                      {parseDisplayText('title').toUpperCase()}
                    </Text>
                  </View>
                </ImageBackground>
                <View style={styles.playAllButtonContainer}>
                  <TouchableOpacity
                    style={[styles.playAllButton, {width: 0.65 * width}]}
                    onPress={() => {
                      // playTrack(
                      //   this.props.tourStop,
                      //   this.props.tourStop.audioContent[0].uuid,
                      //   true // autoplay
                      // );
                    }}>
                    <Image
                      style={styles.playAllButtonIcon}
                      source={require('../assets/PlayButton.png')}
                    />
                    <Text style={styles.playAllButtonText}>
                      {parseDisplayText('playAll').toUpperCase()}
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
                        {`${'floor'.toUpperCase()} `}
                      </Text>
                    </View>
                    <View style={styles.audioContentDuration}>
                      <Image
                        style={styles.durationIcon}
                        source={require('../assets/ClockIcon.png')}
                      />
                      <Text style={styles.durationText}>
                        {`${Math.floor(duration / 60)} ${'min'.toUpperCase()}`}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}>
          <AudioContentList
            tourStop={tourStop}
            //currentAudio={this.props.currentAudio}
            //playerStatus={this.props.playerStatus}
            //screenReader={this.props.screenReader}
            locale={locale}
            actions={
              {
                // playTrack,
                // togglePausePlay,
              }
            }
          />
        </ParallaxScrollView>
      </View>
    );
  }
}

export default TourStop;
