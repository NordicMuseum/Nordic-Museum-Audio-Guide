import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 40,
    alignSelf: 'center',
  },
});

const NearMe = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Near Me</Text>
    </View>
  );
};

export default NearMe;
