
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

import { globalStyles, SELECTED, HIGHLIGHTS, OFF_WHITE } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 8,
    paddingBottom: 16,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  transcriptContainer: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  audioItemStatus: {
    flex: 1,
  },
  titleText: {
    flexDirection: 'column',
    flex: 1,
  },
  highlightedNumber: {
    backgroundColor: HIGHLIGHTS,
    height: 20,
    paddingHorizontal: 3,
    marginRight: 8,
    borderRadius: 2,
  },
  highlightedNumberText: {
    color: OFF_WHITE,
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

class AudioContentItem extends Component {
  static propTypes = {
    audioContent: PropTypes.object.isRequired,
    screenReader: PropTypes.bool.isRequired,
    contentWidth: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    listLength: PropTypes.number.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      analyticsTrackTranscriptOpenned: PropTypes.func.isRequired,
      audioAction: PropTypes.func.isRequired,
      reloadAudio: PropTypes.func.isRequired,
    }),
  }

  componentWillMount() {
    this.setState({ transcriptOpened: false });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale &&
        this.props.audioContent.active) {
      this.props.actions.reloadAudio();
    }
  }

  toggleTranscript() {
    if (!this.state.transcriptOpened) {
      this.props.actions.analyticsTrackTranscriptOpenned();
    }
    this.setState({ transcriptOpened: !this.state.transcriptOpened });
  }

  render() {
    const {
      audioContent,
      screenReader,
      index,
      listLength,
    } = this.props;

    const {
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
          active ? { backgroundColor: SELECTED } : {},
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
                  <View style={audioContent.category === 'HIGHLIGHT' ? styles.highlightedNumber : { marginRight: 11, paddingLeft: 3 }}>
                    <Text
                      style={[
                        globalStyles.body,
                        audioContent.category === 'HIGHLIGHT' ? styles.highlightedNumberText : {},
                      ]}
                    >
                      {audioContent.title}
                    </Text>
                  </View>
                  <Text
                    style={[globalStyles.body, styles.titleText]}
                  >
                    {parseDisplayText(I18n.t(audioContent.title))}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TranscriptButton
            accessibilityLabel={parseVoiceoverText(I18n.t(audioContent.title))}
            onPress={() => { this.toggleTranscript(); }}
            showTranscript={this.state.transcriptOpened}
          />
        </View>

        <Collapsible
          style={this.state.transcriptOpened ? styles.transcript : {}}
          collapsed={!this.state.transcriptOpened}
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
