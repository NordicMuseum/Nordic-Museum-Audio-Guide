
import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';

import {
   screenReaderReloadLayout,
 } from '../actions/accessibility';

import {
  analyticsTrackAudioCompleteListen,
} from '../actions/analytics';

import {
  PLAYER_STATUS_FINISHED,
  PLAYER_STATUS_ERROR,
  PLAYER_STATUS_NOTLOADED,
  PLAYER_STATUS_UNLOADED,
  PLAYER_STATUS_LOADING,
  PLAYER_STATUS_PLAY,
} from '../actions/audio';

import ControlsView from './controlsView';
import TimeProgressView from './timeProgressView';
import AutoplayProgressView from './autoplayProgressView';
import ClosePlayerView from './closePlayerView';

import { BOTTOMBARHEIGHT } from './rootScreen';

import { OFF_BLACK } from '../styles';

export const BOTTOMPLAYERHEIGHT = 105;

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
  },
});

function nextAudioTitle(audioContent, nextUUID, defaultTitle) {
  if (nextUUID !== null) {
    return audioContent.filtered(`uuid = "${nextUUID}"`)[0].title;
  }
  return defaultTitle;
}

class BottomPlayer extends Component {
  static propTypes = {
    tourStop: PropTypes.object.isRequired,
    stopUUID: PropTypes.string.isRequired,
    currentUUID: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    navToTourStop: PropTypes.func.isRequired,
    prevUUID: PropTypes.string,
    nextUUID: PropTypes.string,
    stopTitle: PropTypes.string.isRequired,
    audioTitle: PropTypes.string.isRequired,
    audioContent: PropTypes.object.isRequired,
    duration: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    playRate: PropTypes.string.isRequired,
    playerStatus: PropTypes.string.isRequired,
    timerActive: PropTypes.bool.isRequired,
    timerStartAt: PropTypes.number.isRequired,
    timerNumber: PropTypes.number.isRequired,
    autoplayOn: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      playTrack: PropTypes.func.isRequired,
      togglePausePlay: PropTypes.func.isRequired,
      replayAudio: PropTypes.func.isRequired,
      rewindAudio: PropTypes.func.isRequired,
      cycleAudioSpeed: PropTypes.func.isRequired,
      unloadAudio: PropTypes.func.isRequired,
      playAudio: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.playerStatus === PLAYER_STATUS_LOADING &&
        nextProps.playerStatus === PLAYER_STATUS_PLAY) {
      this.props.actions.playAudio();
      return;
    }

    if (nextProps.playerStatus === PLAYER_STATUS_FINISHED) {
      analyticsTrackAudioCompleteListen(
        this.props.stopTitle, this.props.audioTitle
      );
    }
  }

  render() {
    const {
      tourStop,
      currentUUID,
      index,
      navToTourStop,
      nextUUID,
      prevUUID,
      stopTitle,
      audioTitle,
      audioContent,
      time,
      duration,
      playRate,
      playerStatus,
      timerActive,
      timerStartAt,
      timerNumber,
      autoplayOn,
      locale,
    } = this.props;

    const {
      togglePausePlay,
      rewindAudio,
      cycleAudioSpeed,
      unloadAudio,
      replayAudio,
      playTrack,
    } = this.props.actions;

    // Force the screen reader to update with bottom player
    screenReaderReloadLayout();

    const width = Dimensions.get('window').width;

    if (playerStatus === PLAYER_STATUS_ERROR ||
        playerStatus === PLAYER_STATUS_NOTLOADED ||
        playerStatus === PLAYER_STATUS_LOADING ||
        playerStatus === PLAYER_STATUS_UNLOADED) {
      // We don't want the bottom player:
      return null;
    }

    let progress;

    if (playerStatus === PLAYER_STATUS_FINISHED && nextUUID === null) {
      return (
        <View
          style={[styles.bottomBar,
                  { width, height: BOTTOMPLAYERHEIGHT,
                    bottom: BOTTOMBARHEIGHT,
                    backgroundColor: OFF_BLACK,
                   }]}
        >
          <ClosePlayerView
            stopTitle={stopTitle}
            closePlayer={() => { unloadAudio(); }}
            navToTourStop={() => { navToTourStop(); }}
          />
        </View>
      );
    } else if (playerStatus === PLAYER_STATUS_FINISHED &&
               nextUUID !== null) {
      // display the autoplay progress
      progress = (<AutoplayProgressView
        time={time}
        duration={duration}
        playerStatus={playerStatus}
        timerActive={timerActive}
        timerStartAt={timerStartAt}
        timerNumber={timerNumber}
        autoplayOn={autoplayOn}
        nextUUID={nextUUID}
        actions={{
          loadNextAutoplayAudio: () => {
            playTrack(
              tourStop,
              nextUUID,
              true,
            );
          },
        }}
      />);
    } else {
      // display the time progress
      progress = (<TimeProgressView
        time={time}
        duration={duration}
      />);
    }

    let prevDisabled = false;
    let nextDisabled = false;
    const activeAudioIndex = audioContent.findIndex((content) => {
      return content.uuid === currentUUID;
    });

    if ((activeAudioIndex - 1) < 0) {
      prevDisabled = true;
    }
    if (activeAudioIndex + 1 >= audioContent.length) {
      nextDisabled = true;
    }

    return (
      <View
        style={[
          styles.bottomBar,
          {
            width,
            height: BOTTOMPLAYERHEIGHT,
            bottom: BOTTOMBARHEIGHT,
            backgroundColor: OFF_BLACK,
          },
        ]}
        // Rerender when PLAYER_STATUS_FINISHED begins and ends
        key={playerStatus === PLAYER_STATUS_FINISHED}
      >
        {progress}
        <ControlsView
          stopTitle={stopTitle}
          audioTitle={audioTitle}
          nextAudioTitle={nextAudioTitle(audioContent, nextUUID, audioTitle)}
          time={time}
          playerStatus={playerStatus}
          prevDisabled={prevDisabled}
          nextDisabled={nextDisabled}
          playRate={playRate}
          autoplayOn={autoplayOn}
          locale={locale}
          actions={{
            togglePausePlay,
            replayAudio,
            rewindAudio,
            cycleAudioSpeed,
            navToTourStop,
            loadNextAudio: () => {
              playTrack(
                tourStop,
                nextUUID,
                false,
              );
            },
            loadNextAutoplayAudio: () => {
              playTrack(
                tourStop,
                nextUUID,
                true,
              );
            },
            loadPrevAudio: () => {
              playTrack(
                tourStop,
                prevUUID,
                false,
              );
            },
          }}
        />
      </View>
    );
  }
}

export default BottomPlayer;
