import React, { Component } from "react";

import { StyleSheet, View, Text, Dimensions, Button } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { analyticsTrackAudioCompleteListen } from '../actions/analytics';

import { translate } from "../i18n";

import {
  togglePausePlay,
  unloadAudio,
  replayAudio,
  playTrack
} from "../actions/audio";

import {
  PLAYER_STATUS_FINISHED,
  PLAYER_STATUS_ERROR,
  PLAYER_STATUS_NOTLOADED,
  PLAYER_STATUS_UNLOADED,
  PLAYER_STATUS_LOADING,
  PLAYER_STATUS_PLAY
} from "../actions/audio";

import ControlsView from "../components/controlsView";
import TimeProgressView from "../components/timeProgressView";
import AutoplayProgressView from "../components/autoplayProgressView";
import ClosePlayerView from "../components/closePlayerView";

import {
  BOTTOM_PLAYER_HEIGHT,
  getBottomTabsHeight,
  OFF_BLACK
} from "../styles";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    borderBottomWidth: 1,
    borderColor: "#0d0d0d",
    backgroundColor: "#1A1A1A",
    height: BOTTOM_PLAYER_HEIGHT,
    width: width
  }
});

class BottomPlayer extends Component {
  static get options() {
    return {
      overlay: {
        interceptTouchOutside: false
      }
    };
  }

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
      audioCode,
      time,
      duration,
      playerStatus,
      timerActive,
      timerStartAt,
      timerNumber,
      autoplayOn,
      locale
    } = this.props;

    const {
      togglePausePlay,
      unloadAudio,
      replayAudio,
      playTrack
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
            }
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
        key={playerStatus === PLAYER_STATUS_FINISHED}
      >
        {progress}
        <ControlsView
          highlight={audioContent[index].category === "HIGHLIGHT"}
          stopTitle={stopTitle}
          audioTitle={audioTitle}
          audioCode={audioCode}
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
              console.log("TO DO");
            },
            loadNextAudio: () => {
              playTrack(tourStop, nextUUID, false);
            },
            loadNextAutoplayAudio: () => {
              playTrack(tourStop, nextUUID, true);
            },
            loadPrevAudio: () => {
              playTrack(tourStop, prevUUID, false);
            }
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    tourStop: state.bottomPlayer.tourStop,
    playerOpen: state.bottomPlayer.playerOpen,
    playerStatus: state.bottomPlayer.playerStatus,
    audioContent: state.bottomPlayer.audioContent,
    audioTitle: state.bottomPlayer.title,
    audioCode: state.bottomPlayer.audioCode,
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
    locale: state.device.locale
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      togglePausePlay,
      unloadAudio,
      replayAudio,
      playTrack
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true }
)(BottomPlayer);

function nextAudioProps(audioContent, nextUUID, defaultTitle) {
  if (nextUUID !== null) {
    const audio = audioContent.filter(content => {
      return content.uuid === nextUUID;
    })[0];

    return {
      code: audio.id,
      title: audio.title,
      highlight: audio.category === "HIGHLIGHT"
    };
  }

  return defaultTitle;
}
