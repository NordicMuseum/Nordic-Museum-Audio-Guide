import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import { connect } from "react-redux";
import { translate } from "../i18n";

// import { analyticsTrackScreen } from '../actions/analytics';

import Grid from "../components/grid";
//import CalendarStop from './calendarStop'; onödig?

import { Navigation } from "react-native-navigation";

import {
  NAV_BAR_TEXT,
  NAV_BAR_BACKGROUND,
  BOTTOM_PLAYER_HEIGHT
} from "../styles";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flex: 1,
    backgroundColor: "#ffffff"
  }
});

const pushToCalendarStop = (componentId, passedProps) => {
  Navigation.push(componentId, {
    component: {
      name: "calendarStop",
      passProps: passedProps,
      options: {
        topBar: { visible: false }
      }
    }
  });
};

class Calendar extends Component {
  static get options() {
    return {
      topBar: {
        background: {
          color: NAV_BAR_BACKGROUND
        },
        title: {
          text: "Events",
          fontSize: 17,
          fontFamily: "Helvetica",
          color: NAV_BAR_TEXT
        },
        noBorder: true
      }
    };
  }

  render() {
    var containerMargin = 0;
    if (this.props.playerOpen) {
      containerMargin += BOTTOM_PLAYER_HEIGHT;
    }

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={[styles.container, { marginBottom: containerMargin }]}>
            <Grid
              locale={this.props.locale}
              items={this.props.calendarStops}
              selected={this.props.currentStopUUID}
              onCellPress={item => {
                const passedProps = {
                  calendarStop: item
                };
                pushToCalendarStop(this.props.componentId, passedProps);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerOpen: state.bottomPlayer.playerOpen,
    calendarStops: state.allTourStops.tourStops,
    currentStopUUID: state.bottomPlayer.stopUUID,
    locale: state.device.locale
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true }
)(Calendar);
