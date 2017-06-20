
import React, { PropTypes } from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import I18n from 'react-native-i18n';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import { ACTION, NAV_BAR_TEXT, NAV_BAR_BACKGROUND, LIGHT_GRAY } from '../styles';

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
  Object.values(props.allAmenities).forEach((floor) => {
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
          color: NAV_BAR_TEXT,
        }}
        buttonColor={ACTION}
        backButtonPress={() => { props.navigator.pop(); }}
        barStyle={{
          backgroundColor: NAV_BAR_BACKGROUND,
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
  allAmenities: PropTypes.object.isRequired,
  screenReader: PropTypes.bool.isRequired,
};

export default AmenitiesScreen;
