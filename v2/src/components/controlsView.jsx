import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { translate, isRTL } from '../i18n';

import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { PLAYER_STATUS_FINISHED } from '../actions/audio';

import { parseDisplayText, parseVoiceoverText } from '../utilities';

import { globalStyles, HIGHLIGHTS, OFF_WHITE } from '../styles';

import PlayPauseButton from './buttons/playPauseButton';
import PrevButton from './buttons/previousButton';
import NextButton from './buttons/nextButton';

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
      loadNextAudio: PropTypes.func.isRequired,
      loadNextAutoplayAudio: PropTypes.func.isRequired,
      loadPrevAudio: PropTypes.func.isRequired,
    }).isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const statusChanged = this.props.playerStatus !== nextProps.playerStatus;
    const codeChanged = this.props.audioCode !== nextProps.audioCode;
    const autoplayChanged = this.props.autoplayOn !== nextProps.autoplayOn;
    const localeChanged = this.props.locale !== nextProps.locale;

    return statusChanged || codeChanged || autoplayChanged || localeChanged;
  }

  render() {
    const {
      navToTourStop,
      togglePausePlay,
      replayAudio,
      loadNextAudio,
      loadNextAutoplayAudio,
      loadPrevAudio,
    } = this.props.actions;

    const {
      playerStatus,
      stopTitle,
      nextAudioProps,
      audioCode,
      audioTitle,
      prevDisabled,
      nextDisabled,
      highlight,
    } = this.props;

    let code = audioCode;
    let title = audioTitle;
    let highlighted = highlight;
    let controlsDisabled = false;
    if (playerStatus === PLAYER_STATUS_FINISHED) {
      // The player is in next up state:
      code = nextAudioProps.code;
      title = nextAudioProps.title;
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
            accessibilityLabel={`${parseVoiceoverText(code)}, ${translate(
              stopTitle,
            )}`}>
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
                  {code}
                </Text>
              </View>
              <Text style={[globalStyles.h3, { fontWeight: '500' }]}>
                &nbsp; {parseDisplayText(translate(title))}
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
            isRTL ? { flexDirection: 'row-reverse' } : {},
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
