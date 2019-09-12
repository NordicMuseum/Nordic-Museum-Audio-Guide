import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import {Navigation} from 'react-native-navigation';

import {NAV_BAR_TEXT, NAV_BAR_BACKGROUND} from '../styles';

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

class Tours extends Component {
  static options(passProps) {
    return {
      topBar: {
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        title: {
          text: 'Browse',
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
      },
    };
  }

  render() {
    return (
      <View style={styles.container}>
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
  }
}

export default Tours;
