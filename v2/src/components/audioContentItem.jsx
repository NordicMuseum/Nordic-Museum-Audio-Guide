import React, { Component } from "react";
import PropTypes from "prop-types";

import { translate, isRTL } from "../i18n";

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import Collapsible from "react-native-collapsible";

import TranscriptButton from "./buttons/transcriptButton";

import { parseDisplayText, parseVoiceoverText } from "../utilities";

import { globalStyles, SELECTED, HIGHLIGHTS, OFF_WHITE } from "../styles";

export const AUDIO_CONTENT_ITEM_HEIGHT = 45;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 8,
    paddingBottom: 16,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  transcriptContainer: {
    paddingTop: 5,
    paddingBottom: 5
  },
  audioItemStatus: {
    flex: 1
  },
  titleText: {
    flexDirection: "column",
    flex: 1
  },
  highlightedNumber: {
    backgroundColor: HIGHLIGHTS,
    height: 20,
    paddingHorizontal: 3,
    marginRight: 8,
    borderRadius: 2
  },
  highlightedNumberText: {
    color: OFF_WHITE
  }
});

function breakIntoParagraphTextComponents(text) {
  const paragraphs = text.split("\n\n");

  return paragraphs.map((paragraph, index) => {
    return (
      <Text key={index} style={{ writingDirection: isRTL ? "rtl" : "ltr" }}>
        <Text
          style={[
            globalStyles.body,
            styles.titleText,
            { textAlign: isRTL ? "right" : "left" }
          ]}
        >
          {parseDisplayText(paragraph).toString()}
        </Text>
      </Text>
    );
  });
}

class AudioContentItem extends Component {
  static propTypes = {
    audioContent: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    contentWidth: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    listLength: PropTypes.number.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      analyticsTrackTranscriptOpenned: PropTypes.func.isRequired,
      audioAction: PropTypes.func.isRequired,
      reloadAudio: PropTypes.func.isRequired
    })
  };

  render() {
    const { audioContent, screenReader, index, listLength } = this.props;

    const { audioAction } = this.props.actions;

    let collapsibleDuration;
    if (screenReader) {
      collapsibleDuration = 0;
    } else {
      collapsibleDuration = 500;
    }

    const indent = 30;

    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.6}
        onPress={() => {
          audioAction();
        }}
        accessible={true}
        accessibilityTraits={["button", "startsMedia"]}
        accessibilityLabel={
          `${parseVoiceoverText(translate(audioContent.title))}. ${index +
            1} of ` +
          `${listLength}. ${translate(audioContent.duration)} seconds`
        }
      >
        <View
          style={[
            styles.container,
            this.props.active ? { backgroundColor: SELECTED } : {}
          ]}
        >
          <View style={styles.row}>
            <View style={[styles.audioItemStatus, { paddingLeft: indent }]}>
              <View style={styles.row}>
                <View style={{ flex: 2, flexDirection: "row" }}>
                  <View
                    style={[
                      audioContent.category === "HIGHLIGHT"
                        ? styles.highlightedNumber
                        : { marginRight: 11, paddingLeft: 3 }
                    ]}
                  >
                    <Text
                      style={[
                        globalStyles.body,
                        audioContent.category === "HIGHLIGHT"
                          ? styles.highlightedNumberText
                          : {}
                      ]}
                    >
                      {audioContent.id}
                    </Text>
                  </View>
                  <Text style={[globalStyles.body, styles.titleText]}>
                    {parseDisplayText(translate(audioContent.title))}
                  </Text>
                </View>
              </View>
            </View>
            <TranscriptButton
              styles={{ opacity: 0 }}
              accessible={false}
              // onPress={() => {
              //   this.toggleTranscript();
              // }}
              // sshowTranscript={this.state.transcriptOpened}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default AudioContentItem;
