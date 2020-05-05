import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { View, StyleSheet, ScrollView, Text, Switch } from "react-native";

import { updateMuseumMode } from "../actions/device";

import Markdown from "react-native-simple-markdown";

import { isRTL, translate } from "../i18n";

import {
  globalStyles,
  NAV_BAR_TEXT,
  ACTION,
  BOTTOM_PLAYER_HEIGHT,
  WHITE,
  GRAY,
  NAV_BAR_BACKGROUND
} from "../styles";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flex: 1
  }
});

class Calendar extends Component {
  static get options() {
    return {
      topBar: {
        background: {
          color: NAV_BAR_BACKGROUND
        },
        backButton: {
          showTitle: false,
          color: ACTION
        },
        title: {
          text: translate("calendarScreen_Title"),
          fontSize: 17,
          fontFamily: "Helvetica",
          color: NAV_BAR_TEXT
        },
        noBorder: true
      }
    };
  }

  render() {
    const { locale, events, actions } = this.props;
    //Hur vi sparar data
    // { string: [string]}
    // map
    // [string]
    // .join()
    // string \n string \n string
    const eventsNewlineSeperated = Object.entries(events)
      .map(([key, value]) => {
        return `${value.join("\n")}`;
      })
      .join("\n");

    const markdownStyles = {
      heading1: {
        marginTop: 25,
        ...StyleSheet.flatten(globalStyles.h1),
        writingDirection: isRTL ? "rtl" : "ltr",
        textAlign: isRTL ? "right" : "left"
      },
      paragraph: {
        marginTop: 5,
        ...StyleSheet.flatten(globalStyles.body),
        writingDirection: isRTL ? "rtl" : "ltr",
        textAlign: isRTL ? "right" : "left"
      }
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container]}>
          <ScrollView
            contentContainerStyle={{
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: BOTTOM_PLAYER_HEIGHT + 10
            }}
            automaticallyAdjustContentInsets={false}
          >
            <Text
              style={[
                { marginTop: 25 },
                globalStyles.body,
                globalStyles.paragraph
              ]}
            >
              {eventsNewlineSeperated}
            </Text>
            <Markdown
              styles={markdownStyles}
              rules={{
                paragraph: {
                  react: (node, output, state) => (
                    <Text key={state.key} style={markdownStyles.paragraph}>
                      {output(node.content, state)}
                    </Text>
                  )
                }
              }}
            ></Markdown>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locale: state.device.locale,
    appVersion: state.device.appVersion,
    museumMode: state.device.museumMode,
    events: state.calenderEvents.events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        updateMuseumMode
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true }
)(Calendar);
