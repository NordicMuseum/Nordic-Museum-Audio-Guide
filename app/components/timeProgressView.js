
import React, { PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Text,
  I18nManager,
} from 'react-native';

import ProgressBar from './progressBar';

import { globalStyles } from '../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    position: 'relative',
  },
  timestampRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  timestampTextLeft: {
    backgroundColor: 'transparent',
    marginLeft: 5,
  },
  timestampTextRight: {
    backgroundColor: 'transparent',
    marginRight: 5,
  },
});

const TimeProgressView = (props) => {
  // Percentage
  const duration = Math.round(props.duration);
  const time = Math.round(props.time);
  const progressBarPercentage = time / duration;

  // Formatting the timestamp
  const timeRemaining = duration - time;
  let timeString = '';
  let timeRemainingString = '';

  if (time < 10) {
    timeString = `0:0${time}`;
  } else if (time < 60) {
    timeString = `0:${time}`;
  } else {
    const minutes = Math.floor((time / 60) % 60);
    const seconds = time - (60 * minutes);
    if (seconds < 10) {
      timeString = `${minutes}:0${seconds}`;
    } else {
      timeString = `${minutes}:${seconds}`;
    }
  }
  if (timeRemaining < 10) {
    timeRemainingString = `-0:0${timeRemaining}`;
  } else if (timeRemaining < 60) {
    timeRemainingString = `-0:${timeRemaining}`;
  } else {
    const minutes = Math.floor((timeRemaining / 60) % 60);
    const seconds = timeRemaining - (60 * minutes);
    if (seconds < 10) {
      timeRemainingString = `${minutes}:0${seconds}`;
    } else {
      timeRemainingString = `${minutes}:${seconds}`;
    }
  }

  return (
    <View style={styles.container}>
      <ProgressBar
        percentage={progressBarPercentage}
      />
      <View
        style={[
          styles.row,
          styles.timestampRow,
          I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {},
        ]}
        accessibilityLabel={`${timeRemaining} seconds remaining`}
      >
        <Text
          style={[styles.timestampTextLeft, globalStyles.progressLabel]}
          accessible={false}
        >
          {timeString}
        </Text>
        <Text
          style={[styles.timestampTextRight, globalStyles.progressLabel]}
          accessible={false}
        >
          {timeRemainingString}
        </Text>
      </View>
    </View>
  );
};

TimeProgressView.propTypes = {
  time: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default TimeProgressView;
