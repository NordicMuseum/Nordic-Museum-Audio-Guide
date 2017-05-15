
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

import { TEAL, OFF_BLACK } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ededed',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  segementedController: {
    paddingTop: 25,
    paddingBottom: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50,
    marginRight: 50,
  },
});

class SearchByNumberScreen extends Component {
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
      </View>
    );
  }
}

export default SearchByNumberScreen;
