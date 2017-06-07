
import React, { Component, PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  StyleSheet,
  View,
} from 'react-native';

import NavigationBar from './navigationBar';
import Grid from './grid';
import TourStop from '../containers/tourStop';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';
import { TAB_STORIES } from '../actions/navigation';

import { OFF_BLACK, LIGHT_GRAY } from '../styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 64,
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: LIGHT_GRAY,
  },
});

class EverythingScreen extends Component {
  static title = I18n.t('storiesScreen_Title');

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    playerOpen: PropTypes.bool.isRequired,
    tourStops: PropTypes.object.isRequired,
    screenReader: PropTypes.bool.isRequired,
    currentStopUUID: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
  }

  render() {
    let containerMargin = BOTTOMBARHEIGHT;
    if (this.props.playerOpen) {
      containerMargin = BOTTOMPLAYERHEIGHT + BOTTOMBARHEIGHT;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.statusBar} />
        <NavigationBar
          label={I18n.t('storiesScreen_Title')}
          labelStyle={{
            color: OFF_BLACK,
          }}
          barStyle={{
            backgroundColor: LIGHT_GRAY,
            height: 44,
          }}
        />
        <View style={[styles.container, { marginBottom: containerMargin }]}>
          <Grid
            locale={this.props.locale}
            items={this.props.tourStops}
            renderHeaders={true}
            selected={this.props.currentStopUUID}
            screenReader={this.props.screenReader}
            onCellPress={(item) => {
              this.props.navigator.push({
                title: item.shortTitle,
                component: TourStop,
                barTintColor: '#ffffff',
                titleTextColor: OFF_BLACK,
                shadowHidden: true,
                navigationBarHidden: true,
                passProps: {
                  tab: TAB_STORIES,
                  floor: item.floor,
                  duration: item.duration[this.props.locale],
                  tourStop: item,
                  initialCategory: item.initialAudio,
                  imageURL: item.imageURL,
                },
              });
            }}
          />
        </View>
      </View>
    );
  }
}

export default EverythingScreen;
