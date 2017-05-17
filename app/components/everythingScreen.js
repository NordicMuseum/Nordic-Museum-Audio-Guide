
import React, { Component, PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import SegmentedController from './buttons/segmentedController';
import Grid from './grid';
import TourStop from '../containers/tourStop';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';
import { TAB_STORIES } from '../actions/navigation';

import { TEAL, OFF_BLACK, LIGHT_GRAY } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: LIGHT_GRAY,
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  segementedController: {
    paddingTop: 25,
    paddingBottom: 25,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
  },
});

class EverythingScreen extends Component {
  static title = I18n.t('storiesScreen_Title');

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    playerOpen: PropTypes.bool.isRequired,
    tourStops: PropTypes.array.isRequired,
    screenReader: PropTypes.bool.isRequired,
    currentStopUUID: PropTypes.string.isRequired,
    currentFloor: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      showFloor: PropTypes.func.isRequired,
    }).isRequired,
  }

  render() {
    let containerMargin = BOTTOMBARHEIGHT;
    if (this.props.playerOpen) {
      containerMargin = BOTTOMPLAYERHEIGHT + BOTTOMBARHEIGHT;
    }

    return (
      <View style={[styles.container, { marginBottom: containerMargin }]}>
        <View style={styles.segementedController}>
          <SegmentedController
            style={{ flex: 1 }}
            buttons={[
              {
                label: I18n.t('floor2_Label'),
                onPress: () => { this.props.actions.showFloor(1); },
                active: this.props.currentFloor === 1,
              },
              {
                label: I18n.t('floor3_Label'),
                onPress: () => { this.props.actions.showFloor(2); },
                active: this.props.currentFloor === 2,
              },
              {
                label: I18n.t('floor4_Label'),
                onPress: () => { this.props.actions.showFloor(3); },
                active: this.props.currentFloor === 3,
              },
            ]}
          />
        </View>
        <ScrollView
          style={styles.scroll}
          automaticallyAdjustContentInsets={false}
        >
          <Grid
            items={this.props.tourStops[this.props.currentFloor].stops}
            selected={this.props.currentStopUUID}
            screenReader={this.props.screenReader}
            onCellPress={(item) => {
              this.props.navigator.push({
                title: item.shortTitle,
                component: TourStop,
                barTintColor: '#ffffff',
                tintColor: TEAL,
                titleTextColor: OFF_BLACK,
                shadowHidden: true,
                navigationBarHidden: true,
                passProps: {
                  tab: TAB_STORIES,
                  tourStop: item,
                  initialCategory: item.initialAudio,
                  imageURL: item.imageURL,
                },
              });
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

export default EverythingScreen;
