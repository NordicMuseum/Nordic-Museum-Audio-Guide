
import React, { Component, PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Collapsible from 'react-native-collapsible';

import TranscriptButton from './buttons/transcriptButton';

import {
  parseDisplayText,
  parseVoiceoverText,
} from '../utilities';

import { globalStyles } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    overflow: 'hidden',
  },
  progressBarActive: {
    overflow: 'hidden',
  },
  seconds: {
    paddingLeft: 25,
    fontWeight: '200',
    fontSize: 14,
  },
  transcriptContainer: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  audioItemStatus: {
    flex: 1,
  },
});

function breakIntoParagraphTextComponents(text) {
  const paragraphs = text.split('\n\n');

  return paragraphs.map((paragraph, index) => {
    return (
      <Text
        key={index}
        style={[globalStyles.body, globalStyles.paragraph]}
      >
        {parseDisplayText(paragraph)}
      </Text>
    );
  });
}

function progressWidthStyle(eleWidth, progress) {
  return {
    width: eleWidth * progress,
  };
}

function getPercentage(a, b) {
  return Math.round(a) / Math.round(b);
}

class AudioContentItem extends Component {
  static propTypes = {
    audioContent: PropTypes.object.isRequired,
    screenReader: PropTypes.bool.isRequired,
    contentWidth: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    listLength: PropTypes.number.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      toggleAudioTranscript: PropTypes.func.isRequired,
      audioAction: PropTypes.func.isRequired,
      reloadAudio: PropTypes.func.isRequired,
    }),
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale &&
        this.props.audioContent.active) {
      this.props.actions.reloadAudio();
    }
  }

  render() {
    const {
      audioContent,
      screenReader,
      index,
      listLength,
    } = this.props;

    const {
      toggleAudioTranscript,
      audioAction,
    } = this.props.actions;

    const active = audioContent.active;

    let collapsibleDuration;
    if (screenReader) {
      collapsibleDuration = 0;
    } else {
      collapsibleDuration = 500;
    }

    const indent = audioContent.depth * 30;

    return (
      <View
        style={[
          styles.container,
          active ? { backgroundColor: '#EDD6DD' } : {},
        ]}
      >
        <View style={styles.row}>
          <View
            style={[
              styles.audioItemStatus,
              { paddingLeft: indent },
            ]}
          >
            <View style={styles.row}>
              <TouchableOpacity
                style={{ flex: 2 }}
                activeOpacity={0.6}
                onPress={() => {
                  audioAction();
                }}
                accessible={true}
                accessibilityTraits={['button', 'startsMedia']}
                accessibilityLabel={
                  `${parseVoiceoverText(I18n.t(audioContent.title))}. ${(index + 1)} of ` +
                  `${listLength}. ${audioContent.duration} seconds`
                }
              >

                <View style={{ flexDirection: 'row' }}>
                  <Text style={[globalStyles.body, { marginRight: 10 }]}>
                    {audioContent.title}
                  </Text>
                  <Text
                    style={globalStyles.body}
                  >
                    {parseDisplayText(I18n.t(audioContent.title))}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TranscriptButton
            accessibilityLabel={parseVoiceoverText(I18n.t(audioContent.title))}
            onPress={() => { toggleAudioTranscript(); }}
            showTranscript={audioContent.showTranscript}
          />
        </View>

        <Collapsible
          style={audioContent.showTranscript ? styles.transcript : {}}
          collapsed={!audioContent.showTranscript}
          duration={collapsibleDuration}
        >
          <View style={styles.transcriptContainer}>
            {breakIntoParagraphTextComponents(I18n.t(audioContent.transcript))}
          </View>
        </Collapsible>
      </View>
    );
  }
}

export default AudioContentItem;
