import React, { Component } from 'react';

import { StyleSheet, View, Text, Dimensions, Button } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { screenReaderReloadLayout } from '../actions/accessibility';

// import { analyticsTrackAudioCompleteListen } from '../actions/analytics';

import { translate } from '../i18n';

import {
  togglePausePlay,
  unloadAudio,
  replayAudio,
  playTrack,
} from '../actions/audio';

import {
  PLAYER_STATUS_FINISHED,
  PLAYER_STATUS_ERROR,
  PLAYER_STATUS_NOTLOADED,
  PLAYER_STATUS_UNLOADED,
  PLAYER_STATUS_LOADING,
  PLAYER_STATUS_PLAY,
} from '../actions/audio';

import ControlsView from '../components/controlsView';
import TimeProgressView from '../components/timeProgressView';
import AutoplayProgressView from '../components/autoplayProgressView';
import ClosePlayerView from '../components/closePlayerView';

import {
  BOTTOM_PLAYER_HEIGHT,
  getBottomTabsHeight,
  OFF_BLACK,
} from '../styles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    borderBottomWidth: 1,
    borderColor: '#0d0d0d',
    backgroundColor: '#1A1A1A',
    height: BOTTOM_PLAYER_HEIGHT,
    width: width,
  },
});

class BottomPlayer extends Component {
  static get options() {
    return {
      overlay: {
        interceptTouchOutside: false,
      },
    };
  }

  // static getDerivedStateFromProps(props, state) {
  // if (
  //   props.playerStatus === PLAYER_STATUS_LOADING &&
  //   props.playerStatus === PLAYER_STATUS_PLAY
  // ) {
  //   this.props.actions.playAudio();
  // }
  // return state;

  // if (props.playerStatus === PLAYER_STATUS_FINISHED) {
  //   const { audioContent, index } = this.props;

  //   const activeAudio = audioContent[index];
  //   let url = activeAudio.audioURL;

  //   if (activeAudio.audioURL.length === 3) {
  //     // If available, play audio in chosen language. Else play audio in fallback language. Else play audio in Swedish.
  //     if (activeAudio.duration[I18n.locale]) {
  //       url = activeAudio.audioURL.concat('/', I18n.locale);
  //     } else {
  //       if (activeAudio.duration[I18n.defaultLocale]) {
  //         url = activeAudio.audioURL.concat('/', I18n.defaultLocale);
  //       } else {
  //         url = activeAudio.audioURL.concat('/', 'sv');
  //       }
  //     }
  //   }

  //   const audioLanguage = url.split('/')[1];
  //   analyticsTrackAudioCompleteListen(this.props.locale, audioLanguage, this.props.audioTitle);
  //   return state;
  // }
  // }

  render() {
    if (this.props.playerOpen === false) {
      return null;
    }

    const {
      tourStop,
      index,
      navToTourStop,
      nextUUID,
      prevUUID,
      stopTitle,
      audioTitle,
      audioContent,
      time,
      duration,
      playerStatus,
      timerActive,
      timerStartAt,
      timerNumber,
      autoplayOn,
      locale,
    } = this.props;

    const {
      togglePausePlay,
      unloadAudio,
      replayAudio,
      playTrack,
    } = this.props.actions;

    let progress;

    if (playerStatus === PLAYER_STATUS_FINISHED && nextUUID === null) {
      return (
        <View style={[styles.bottomBar, { bottom: getBottomTabsHeight() }]}>
          <ClosePlayerView
            stopTitle={stopTitle}
            closePlayer={() => {
              unloadAudio();
            }}
            navToTourStop={() => {
              navToTourStop();
            }}
          />
        </View>
      );
    } else if (playerStatus === PLAYER_STATUS_FINISHED && nextUUID !== null) {
      // display the autoplay progress
      progress = (
        <AutoplayProgressView
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
              playTrack(tourStop, nextUUID, true);
            },
          }}
        />
      );
    } else {
      // display the time progress
      progress = <TimeProgressView time={time} duration={duration} />;
    }

    let prevDisabled = false;
    let nextDisabled = false;

    if (index - 1 < 0) {
      prevDisabled = true;
    }
    if (index + 1 >= audioContent.length) {
      nextDisabled = true;
    }

    return (
      <View
        style={[styles.bottomBar, { bottom: getBottomTabsHeight() }]}
        // Rerender when PLAYER_STATUS_FINISHED begins and ends
        key={playerStatus === PLAYER_STATUS_FINISHED}>
        {progress}
        <ControlsView
          highlight={audioContent[index].category === 'HIGHLIGHT'}
          stopTitle={stopTitle}
          audioTitle={audioTitle}
          audioCode={audioTitle}
          nextAudioProps={nextAudioProps(audioContent, nextUUID, audioTitle)}
          time={time}
          playerStatus={playerStatus}
          prevDisabled={prevDisabled}
          nextDisabled={nextDisabled}
          autoplayOn={autoplayOn}
          locale={locale}
          actions={{
            togglePausePlay,
            replayAudio,
            navToTourStop: () => {
              console.log('TO DO');
            },
            loadNextAudio: () => {
              playTrack(tourStop, nextUUID, false);
            },
            loadNextAutoplayAudio: () => {
              playTrack(tourStop, nextUUID, true);
            },
            loadPrevAudio: () => {
              playTrack(tourStop, prevUUID, false);
            },
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerOpen: state.bottomPlayer.playerOpen,
    playerStatus: state.bottomPlayer.playerStatus,
    audioContent: state.bottomPlayer.audioContent,
    audioTitle: state.bottomPlayer.title,
    index: state.bottomPlayer.index,
    duration: state.bottomPlayer.duration,
    nextUUID: state.bottomPlayer.nextUUID,
    prevUUID: state.bottomPlayer.prevUUID,
    stopTitle: state.bottomPlayer.stopTitle,
    time: state.bottomPlayer.time,
    timerStartAt: state.bottomPlayer.timerStartAt,
    timerActive: state.bottomPlayer.timerActive,
    timerNumber: state.bottomPlayer.timerNumber,
    autoplayOn: state.bottomPlayer.autoplayOn,
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      togglePausePlay,
      unloadAudio,
      replayAudio,
      playTrack,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true },
)(BottomPlayer);

function nextAudioProps(audioContent, nextUUID, defaultTitle) {
  if (nextUUID !== null) {
    const audio = audioContent.filter(content => {
      return content.uuid === nextUUID;
    })[0];

    return {
      code: audio.title,
      highlight: audio.category === 'HIGHLIGHT',
    };
  }

  return defaultTitle;
}
