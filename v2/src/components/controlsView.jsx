import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { translate } from '../i18n';

import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { PLAYER_STATUS_FINISHED } from '../actions/audio';

import { parseDisplayText, parseVoiceoverText } from '../utilities';

import { globalStyles, HIGHLIGHTS, OFF_WHITE } from '../styles';

import PlayPauseButton from './buttons/playPauseButton';
import PrevButton from './buttons/previousButton';
import NextButton from './buttons/nextButton';
import RewindButton from './buttons/rewindButton';
import ToggleSpeedButton from './buttons/toggleSpeedButton';

import ViewTicker from './viewTicker';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: 8,
  },
  row: {
    flexDirection: 'row',
    position: 'relative',
  },
  titleRow: {
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  titleText: {
    marginLeft: 3,
    marginRight: 3,
  },
  controlsRow: {
    justifyContent: 'space-around',
  },
  highlightedBox: {
    backgroundColor: HIGHLIGHTS,
    height: 18,
    paddingHorizontal: 3,
    borderRadius: 2,
  },
  regularBox: {
    height: 18,
    paddingHorizontal: 3,
    borderRadius: 2,
  },
  highlightedNumberText: {
    color: OFF_WHITE,
  },
});

class ControlsView extends Component {
  static propTypes = {
    highlight: PropTypes.bool.isRequired,
    stopTitle: PropTypes.string.isRequired,
    audioCode: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    nextAudioProps: PropTypes.object.isRequired,
    playRate: PropTypes.string.isRequired,
    playerStatus: PropTypes.string.isRequired,
    prevDisabled: PropTypes.bool.isRequired,
    nextDisabled: PropTypes.bool.isRequired,
    // autoplayOn is only used to figure out if rerender is nessecary
    autoplayOn: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      navToTourStop: PropTypes.func.isRequired,
      togglePausePlay: PropTypes.func.isRequired,
      replayAudio: PropTypes.func.isRequired,
      rewindAudio: PropTypes.func.isRequired,
      cycleAudioSpeed: PropTypes.func.isRequired,
      loadNextAudio: PropTypes.func.isRequired,
      loadNextAutoplayAudio: PropTypes.func.isRequired,
      loadPrevAudio: PropTypes.func.isRequired,
    }).isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const statusChanged = this.props.playerStatus !== nextProps.playerStatus;
    const rateChanged = this.props.playRate !== nextProps.playRate;
    const codeChanged = this.props.audioCode !== nextProps.audioCode;
    const autoplayChanged = this.props.autoplayOn !== nextProps.autoplayOn;
    const localeChanged = this.props.locale !== nextProps.locale;

    return (
      statusChanged ||
      rateChanged ||
      codeChanged ||
      autoplayChanged ||
      localeChanged
    );
  }

  render() {
    const {
      navToTourStop,
      togglePausePlay,
      replayAudio,
      rewindAudio,
      cycleAudioSpeed,
      loadNextAudio,
      loadNextAutoplayAudio,
      loadPrevAudio,
    } = this.props.actions;

    const {
      playerStatus,
      stopTitle,
      nextAudioProps,
      audioCode,
      prevDisabled,
      nextDisabled,
      playRate,
      highlight,
    } = this.props;

    let code = audioCode;
    let highlighted = highlight;
    let controlsDisabled = false;
    if (playerStatus === PLAYER_STATUS_FINISHED) {
      // The player is in next up state:
      code = nextAudioProps.code;
      highlighted = nextAudioProps.highlight;
      controlsDisabled = true;
    }

    const width = Dimensions.get('window').width;

    return (
      <View style={styles.container}>
        {/* Title of stop and audio file */}
        <ViewTicker width={width} uniqueChildrenKey={code}>
          <View
            accessible={true}
            accessibilityTraits={['header']}
            accessibilityLabel={`${parseVoiceoverText(
              translate(code),
            )}, ${translate(stopTitle)}`}>
            <View style={[styles.row, styles.titleRow]}>
              <View
                style={highlighted ? styles.highlightedBox : styles.regularBox}>
                <Text
                  style={[
                    globalStyles.h3,
                    highlighted
                      ? styles.highlightedNumberText
                      : { fontWeight: '300' },
                  ]}>
                  {translate(code)}
                </Text>
              </View>
              <Text style={[globalStyles.h3, { fontWeight: '500' }]}>
                &nbsp; {parseDisplayText(translate(code))}
              </Text>
            </View>
          </View>
        </ViewTicker>
        {/* Controls */}
        {/* Previous  */}
        <View
          style={[
            styles.row,
            styles.controlsRow,
            // I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {},
          ]}>
          <View>
            <PrevButton
              disabled={controlsDisabled}
              onPress={() => {
                if (prevDisabled || this.props.time > 5) {
                  replayAudio();
                } else {
                  loadPrevAudio();
                }
              }}
            />
          </View>
          {/* Play/Pause */}
          <View>
            <PlayPauseButton
              playerStatus={playerStatus}
              onPress={() => {
                if (playerStatus === PLAYER_STATUS_FINISHED && nextDisabled) {
                  replayAudio();
                } else if (
                  playerStatus === PLAYER_STATUS_FINISHED &&
                  !nextDisabled
                ) {
                  loadNextAutoplayAudio();
                } else {
                  togglePausePlay();
                }
              }}
            />
          </View>
          {/* Next */}
          <View>
            <NextButton
              disabled={nextDisabled || controlsDisabled}
              onPress={() => {
                loadNextAudio();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default ControlsView;
