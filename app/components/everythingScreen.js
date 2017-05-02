
import React, { Component, PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import Collapsible from 'react-native-collapsible';

import Grid from './grid';
import TourStop from '../containers/tourStop';
import ExpandableHeader from './expandableHeader';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';
import { TAB_STORIES } from '../actions/navigation';

import { TEAL, OFF_BLACK } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
    actions: PropTypes.shape({
      toggleStopsExpanded: PropTypes.func.isRequired,
    }).isRequired,
  }

  render() {
    let containerMargin = BOTTOMBARHEIGHT;
    if (this.props.playerOpen) {
      containerMargin = BOTTOMPLAYERHEIGHT + BOTTOMBARHEIGHT;
    }

    return (
      <View
        style={[styles.container, { marginBottom: containerMargin }]}
      >
        <ScrollView
          automaticallyAdjustContentInsets={false}
        >
          {this.props.tourStops.map((floor, index) => {
            let collapsibleDuration;

            if (this.props.screenReader) {
              collapsibleDuration = 0;
            } else {
              collapsibleDuration = 750;
            }

            return (
              <View key={index}>
                <ExpandableHeader
                  title={I18n.t(floor.floorTitle)}
                  expanded={floor.expanded}
                  numberOfObjects={floor.stops.length}
                  objectSingular={'amenity'}
                  objectPlural={'amenities'}
                  onPress={() => { this.props.actions.toggleStopsExpanded(floor.floor); }}
                />
                <Collapsible
                  collapsed={!floor.expanded}
                  duration={collapsibleDuration}
                >
                  <Grid
                    items={floor.stops}
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
                </Collapsible>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default EverythingScreen;
