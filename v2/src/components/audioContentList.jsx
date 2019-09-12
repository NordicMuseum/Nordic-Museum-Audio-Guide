import React, {PropTypes} from 'react';

import {View, StyleSheet, Dimensions} from 'react-native';

// import {
//   analyticsTrackTranscriptOpenned,
// } from '../actions/analytics';

import AudioContentItem from './audioContentItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  betaMessage: {
    paddingTop: 20,
    textAlign: 'center',
  },
});

const AudioContentList = props => {
  const {playTrack, togglePausePlay} = props.actions;

  const width = Dimensions.get('window').width;
  let renderView;

  const contentList = props.tourStop.audioContent.map(
    (content, index, array) => {
      return (
        <View key={content.title}>
          <AudioContentItem
            audioContent={content}
            active={props.currentAudio === content.uuid}
            screenReader={props.screenReader}
            index={index}
            listLength={props.tourStop.audioContent.length}
            contentWidth={width}
            locale={props.locale}
            actions={{
              analyticsTrackTranscriptOpenned: () => {
                analyticsTrackTranscriptOpenned(
                  props.tourStopTitle,
                  content.title,
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
              },
            }}
          />
          <View style={index !== array.length - 1 ? styles.bottomBorder : {}} />
        </View>
      );
    },
  );

  renderView = <View>{contentList}</View>;

  return (
    <View
      style={styles.container}
      automaticallyAdjustContentInsets={false}
      showsVerticalScrollIndicator={true}>
      {renderView}
    </View>
  );
};

AudioContentList.propTypes = {
  // tourStop: PropTypes.object.isRequired,
  // currentAudio: PropTypes.string,
  // screenReader: PropTypes.bool.isRequired,
  // playerStatus: PropTypes.string.isRequired,
  // locale: PropTypes.string.isRequired,
  // actions: PropTypes.shape({
  //   playTrack: PropTypes.func.isRequired,
  //   togglePausePlay: PropTypes.func.isRequired,
  // }),
};

export default AudioContentList;
