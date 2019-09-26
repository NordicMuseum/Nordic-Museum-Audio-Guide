import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import { connect } from 'react-redux';
import { translate } from '../i18n';

// import { analyticsTrackScreen } from '../actions/analytics';

import Grid from '../components/grid';
import TourStop from './tourStop';

//import { TAB_STORIES } from '../actions/navigation';

import { Navigation } from 'react-native-navigation';

import {
  NAV_BAR_TEXT,
  NAV_BAR_BACKGROUND,
  OFF_BLACK,
  LIGHT_GRAY,
  BOTTOM_PLAYER_HEIGHT,
  getBottomTabsHeight,
} from '../styles';

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    alignSelf: 'center',
  },
  container: {
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: NAV_BAR_BACKGROUND,
  },
});

const pushToTourStop = (componentId, passedProps) => {
  Navigation.push(componentId, {
    component: {
      name: 'tourStop',
      passProps: passedProps,
      options: {
        topBar: { visible: false },
      },
    },
  });
};

class Tours extends Component {
  static get options() {
    return {
      topBar: {
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        title: {
          text: translate('storiesScreen_Title'),
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
        noBorder: true,
      },
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
              items={this.props.tourStops}
              selected={this.props.currentStopUUID}
              onCellPress={item => {
                const passedProps = {
                  tourStop: item,
                };
                pushToTourStop(this.props.componentId, passedProps);
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
    tourStops: state.allTourStops.tourStops,
    currentStopUUID: state.bottomPlayer.stopUUID,
    locale: state.device.locale,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true },
)(Tours);
