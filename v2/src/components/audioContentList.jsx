import React from "react";
import PropTypes from "prop-types";

import { View, StyleSheet, Dimensions } from "react-native";

// import {
//   analyticsTrackTranscriptOpenned,
// } from '../actions/analytics';

import AudioContentItem from "./audioContentItem";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  betaMessage: {
    paddingTop: 20,
    textAlign: "center"
  }
});

const AudioContentList = props => {
  const { playTrack, togglePausePlay } = props.actions;

  const width = Dimensions.get("window").width;
  let renderView;

  let audioContent = Array.from(props.tourStop.audioContent);

  const contentList = audioContent.map((content, index, array) => {
    return (
      <View key={content.title}>
        <AudioContentItem
          audioContent={content}
          active={props.currentAudio === content.uuid}
          screenReader={props.screenReader}
          index={index}
          listLength={audioContent.length}
          contentWidth={width}
          locale={props.locale}
          actions={{
            analyticsTrackTranscriptOpenned: () => {
              analyticsTrackTranscriptOpenned(
                props.tourStopTitle,
                content.title
              );
            },
            reloadAudio: () => {
              playTrack(props.tourStop, content.uuid, false);
            },
            audioAction: () => {
              if (props.currentAudio === content.uuid) {
                togglePausePlay();
              } else {
                playTrack(props.tourStop, content.uuid, false);
              }
            }
          }}
        />
        <View style={index !== array.length - 1 ? styles.bottomBorder : {}} />
      </View>
    );
  });

  renderView = <View>{contentList}</View>;

  return (
    <View
      style={styles.container}
      automaticallyAdjustContentInsets={false}
      showsVerticalScrollIndicator={true}
    >
      {renderView}
    </View>
  );
};

AudioContentList.propTypes = {
  tourStop: PropTypes.object.isRequired,
  currentAudio: PropTypes.string,
  locale: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    playTrack: PropTypes.func.isRequired,
    togglePausePlay: PropTypes.func.isRequired
  })
};

export default AudioContentList;
