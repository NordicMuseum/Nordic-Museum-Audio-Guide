
import React, { PropTypes } from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import I18n from 'react-native-i18n';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import { OFF_BLACK, ACTION, LIGHT_GRAY } from '../styles';

import StickyHeader from './stickyHeader';
import AmenitiesItem from './amenitiesItem';
import NavigationBar from './navigationBar';


const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 64,
  },
});

const AmenitiesScreen = (props) => {
  let containerMargin = BOTTOMBARHEIGHT;
  if (props.playerOpen) {
    containerMargin = BOTTOMPLAYERHEIGHT + BOTTOMBARHEIGHT;
  }

  let totalIndex = 0;
  let content = [];
  let stickyHeaders = [];
  props.allAmenities.forEach((floor) => {
    stickyHeaders.push(totalIndex);
    content.push(
      <StickyHeader
        key={totalIndex}
        title={`${I18n.t('floor')} ${floor.floor}`}
      />
    );
    totalIndex++;

    floor.amenities.forEach((amenity, index) => {
      content.push(
        <AmenitiesItem
          key={totalIndex}
          amenity={amenity}
          border={index !== (floor.amenities.length - 1)}
        />
      );
      totalIndex++;
    });
  });

  return (
    <View style={{ flex: 1, backgroundColor: LIGHT_GRAY }}>
      <NavigationBar
        label={I18n.t('amenitiesScreen_Title')}
        labelStyle={{
          color: OFF_BLACK,
        }}
        buttonColor={ACTION}
        backButtonPress={() => { props.navigator.pop(); }}
        barStyle={{
          backgroundColor: LIGHT_GRAY,
          height: 44,
        }}
      />
      <View
        style={[styles.container, {
          marginBottom: containerMargin,
        }]}
      >
        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={{ paddingBottom: 10 }}
          stickyHeaderIndices={stickyHeaders}
        >
          {content}
        </ScrollView>
      </View>
    </View>
  );
};

AmenitiesScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
  playerOpen: PropTypes.bool.isRequired,
  allAmenities: PropTypes.array.isRequired,
  screenReader: PropTypes.bool.isRequired,
};

export default AmenitiesScreen;
