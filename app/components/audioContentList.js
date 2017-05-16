
import React, { PropTypes } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {
  PLAYER_STATUS_LOADING,
  PLAYER_STATUS_ERROR,
  PLAYER_STATUS_UNLOADED,
  PLAYER_STATUS_FINISHED,
} from '../actions/audio';

import {
  analyticsTrackTranscriptOpenned,
} from '../actions/analytics';

import AudioContentItem from './audioContentItem';

import { globalStyles } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  betaMessage: {
    textAlign: 'center',
  },
});

const AudioContentList = (props) => {
  const {
    toggleAudioTranscript,
    loadAudio,
    togglePausePlay,
  } = props.actions;

  const width = Dimensions.get('window').width;
  let renderView;

  if (props.playerStatus === PLAYER_STATUS_LOADING) {
    renderView = (
      <ActivityIndicator
        animating={true}
        style={{ alignSelf: 'center', height: 80 }}
        size="large"
      />
    );
  } else if (props.playerStatus === PLAYER_STATUS_ERROR) {
    renderView = (
      <View>
        <Text style={[styles.betaMessage, globalStyles.body]}>
          Error loading this story, please try again.
        </Text>
      </View>
    );
  } else {
    const contentList = props.audioContent.map((content, index, array) => {
      return (
        <View key={content.title}>
          <AudioContentItem
            audioContent={content}
            screenReader={props.screenReader}
            index={index}
            listLength={props.audioContent.length}
            contentWidth={width}
            locale={props.locale}
            actions={{
              toggleAudioTranscript: () => {
                analyticsTrackTranscriptOpenned(props.tourStopTitle, content.title);
                toggleAudioTranscript(content.uuid);
              },
              reloadAudio: () => {
                loadAudio(
                  props.audioContent,
                  content,
                  props.autoplayOn,
                  props.currentAudio,
                  props.currentAudioTime,
                  props.tourStopTitle,
                  props.tourStopUUID,
                  false
                );
              },
              audioAction: () => {
                if (props.currentAudio === content.uuid &&
                    props.playerStatus !== PLAYER_STATUS_UNLOADED &&
                    props.playerStatus !== PLAYER_STATUS_FINISHED) {
                  togglePausePlay();
                } else {
                  loadAudio(
                    props.audioContent,
                    content,
                    props.autoplayOn,
                    props.currentAudio,
                    props.currentAudioTime,
                    props.tourStopTitle,
                    props.tourStopUUID,
                    true,
                  );
                }
              },
            }}
          />
          <View
            style={index !== array.length - 1 ? styles.bottomBorder : {}}
          />
        </View>
      );
    });

    renderView = (
      <View>
        {contentList}
      </View>
    );
  }

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
  tourStopTitle: PropTypes.string.isRequired,
  tourStopUUID: PropTypes.string.isRequired,
  audioContent: PropTypes.array,
  currentAudio: PropTypes.string,
  currentAudioTime: PropTypes.number,
  autoplayOn: PropTypes.bool.isRequired,
  screenReader: PropTypes.bool.isRequired,
  playerStatus: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    toggleAudioTranscript: PropTypes.func.isRequired,
    loadAudio: PropTypes.func.isRequired,
    togglePausePlay: PropTypes.func.isRequired,
  }),
};

export default AudioContentList;
