
import React, { PropTypes } from 'react';

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { OFF_WHITE, GRAY } from '../../styles';

const styles = StyleSheet.create({
  controlContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  controlButton: {
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    flex: 1,
    padding: 5,
    paddingVertical: 0,
  },
  lastControlButton: {
    borderWidth: 0,
    flex: 1,
    padding: 5,
    paddingVertical: 0,
  },
  buttonLabel: {
    textAlign: 'center',
  },
  selectedButtonLabel: {
    textAlign: 'center',
    fontWeight: '600',
  },
});

const SegmentedController = (props) => {
  return (
    <View
      style={styles.controlContainer}
    >
       {props.buttons.map((button, index) => {
         return (
           <TouchableOpacity
             key={index}
             activeOpacity={1}
             style={[
               index < (props.buttons.length - 1) ? styles.controlButton : styles.lastControlButton,
             ]}
             onPress={() => { button.onPress(); }}
           >
             <Text
               style={[
                 button.active ? styles.selectedButtonLabel : styles.buttonLabel,
               ]}
             >
              {button.label}
             </Text>
           </TouchableOpacity>
         );
       })}
    </View>
  );
};

SegmentedController.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object),
  backgroundColor: PropTypes.string,
};

export default SegmentedController;
