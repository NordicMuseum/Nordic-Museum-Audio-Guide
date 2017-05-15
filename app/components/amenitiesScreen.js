
import React, { PropTypes } from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import I18n from 'react-native-i18n';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import { OFF_BLACK, TEAL } from '../styles';

import AmenitiesItem from './amenitiesItem';
import NavigationBar from './navigationBar';
import SegmentedController from './buttons/segmentedController';


const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
  },
  amenitiesContainer: {
    margin: 10,
    marginTop: 0,
    paddingTop: 0,
    padding: 10,
    paddingBottom: 0,
  },
  segementedController: {
    marginTop: 90,
    paddingBottom: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50,
    marginRight: 50,
  },
});

const AmenitiesScreen = (props) => {
  let containerMargin = BOTTOMBARHEIGHT;
  if (props.playerOpen) {
    containerMargin = BOTTOMPLAYERHEIGHT + BOTTOMBARHEIGHT;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#ededed' }}>
      <NavigationBar
        label={I18n.t('amenitiesScreen_Title')}
        labelStyle={{
          color: OFF_BLACK,
        }}
        buttonColor={TEAL}
        backButtonPress={() => { props.navigator.pop(); }}
        backButtonLabel={I18n.t('museumScreen_Title')}
        barStyle={{
          backgroundColor: '#ededed',
          height: 44,
        }}
      />
      <View style={styles.segementedController}>
        <SegmentedController
          style={{ flex: 1 }}
          buttons={[
            {
              label: I18n.t('floor1_Label'),
              onPress: () => { props.actions.showFloor(0); },
              active: props.currentFloor === 0,
            },
            {
              label: I18n.t('floor2_Label'),
              onPress: () => { props.actions.showFloor(1); },
              active: props.currentFloor === 1,
            },
            {
              label: I18n.t('floor3_Label'),
              onPress: () => { props.actions.showFloor(2); },
              active: props.currentFloor === 2,
            },
            {
              label: I18n.t('floor4_Label'),
              onPress: () => { props.actions.showFloor(3); },
              active: props.currentFloor === 3,
            },
          ]}
        />
      </View>
      <View style={[styles.container, { marginBottom: containerMargin }]}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {props.allAmenities[props.currentFloor].amenities.map((amenity, index) => {
            return (
              <AmenitiesItem
                key={amenity.uuid}
                amenity={amenity}
                border={index !== (props.allAmenities[props.currentFloor].amenities.length - 1)}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

AmenitiesScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
  playerOpen: PropTypes.bool.isRequired,
  allAmenities: PropTypes.array.isRequired,
  currentFloor: PropTypes.number.isRequired,
  screenReader: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    showFloor: PropTypes.func.isRequired,
  }).isRequired,
};

export default AmenitiesScreen;
