import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import {Navigation} from 'react-native-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 40,
    alignSelf: 'center',
  },
});

import ToursScreen from '../components/toursScreen';

const pushToTourStop = (componentId, passedProps) => {
  Navigation.push(componentId, {
    component: {
      name: 'tourStop',
      passProps: passedProps,
      options: {
        topBar: {
          title: {
            text: passedProps.title,
          },
        },
      },
    },
  });
};

const Tours = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tours</Text>
      <Button
        onPress={() => {
          const passedProps = {
            title: 'Tour Stop 1',
          };

          pushToTourStop(props.componentId, passedProps);
        }}
        title="Push to Tour Stop 1"
        color="#841584"
        accessibilityLabel="Push to Tour Stop 1"
      />
      <ToursScreen />
    </View>
  );
};

export default Tours;
