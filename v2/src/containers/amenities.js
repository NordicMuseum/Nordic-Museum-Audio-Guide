import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {StyleSheet, View, ScrollView } from 'react-native';


// Placeholder for the translate function
var I18n = {};
I18n.t = function(t) {
    return t;
}

import StickyHeader from '../components/stickyHeader';
import AmenitiesItem from '../components/amenitiesItem';
import { ACTION, NAV_BAR_TEXT, NAV_BAR_BACKGROUND, LIGHT_GRAY, BOTTOM_BAR_HEIGHT }  from '../styles';

import allAmenities from '../data/amenities';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

class Amenities extends Component {

    static options(passProps) {
    return {
      topBar: {
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        title: {
          text: 'Amenities',
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        }
      }
    };
  }

  render() {
    console.log(allAmenities);
         let containerMargin = 0;

      // let containerMargin = BOTTOM_BAR_HEIGHT;
      // if (props.playerOpen) {
      //   containerMargin = BOTTOMPLAYERHEIGHT + BOTTOMBARHEIGHT;
      // }

      let totalIndex = 0;
      let content = [];
      let stickyHeaders = [];
      Object.values(allAmenities).forEach((floor) => {
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
      <View style={{ flex: 1, backgroundColor: 'LIGHT_GRAY' }}>
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
  }

}

export default Amenities;

