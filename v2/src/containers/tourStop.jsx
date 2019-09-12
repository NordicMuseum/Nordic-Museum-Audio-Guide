import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import TourStopScreen from '../components/tourStopScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 40,
    alignSelf: 'center',
  },
});

const TourStop = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      <TourStopScreen />
    </View>
  );
};

export default TourStop;
