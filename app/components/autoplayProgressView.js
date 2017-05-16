
import React, { PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Text,
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
  autoplayRow: {
    justifyContent: 'space-between',
    height: 16,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  autoplayText: {
    marginLeft: 5,
    backgroundColor: 'transparent',
  },
});

const AutoplayProgressView = (props) => {
  const {
    toggleAutoplay,
    loadNextAutoplayAudio,
  } = props.actions;

  const {
    timerActive,
    timerNumber,
    autoplayOn,
    timerStartAt,
  } = props;

  // If autoplay has reached 0, trigger next audio
  // (Can this be moved somewhere else?)
  if (timerActive && timerNumber <= 0) {
    loadNextAutoplayAudio();
  }

  // Percentage
  let progressBarPercentage = 0;
  if (autoplayOn && timerActive) {
    progressBarPercentage = (timerStartAt - timerNumber) / timerStartAt;
  }

  // Countdown text
  let countDownText = '';
  if (timerActive && autoplayOn) {
    if (timerNumber === 1) {
      countDownText = 'Starts in 1 second';
    } else {
      countDownText = `Starts in ${timerNumber} seconds`;
    }
  }

  let autoplayVoiceoverMessage;
  if (autoplayOn) {
    autoplayVoiceoverMessage = 'Autoplay, on. Double tap to turn off.';
  } else {
    autoplayVoiceoverMessage = 'Autoplay, off. Double tap to turn on.';
  }

  return (
    <View style={styles.container}>
      <ProgressBar
        percentage={progressBarPercentage}
      />
      <View
        style={[styles.row, styles.autoplayRow]}
        accessible={true}
        accessibilityLabel={autoplayVoiceoverMessage}
        onAccessibilityTap={() => {
          toggleAutoplay(autoplayOn, timerActive);
        }}
      >
        <View>
          <Text style={[styles.autoplayText, globalStyles.progressLabel]}>
            {countDownText}
          </Text>
        </View>
      </View>
    </View>
  );
};

AutoplayProgressView.propTypes = {
  timerActive: PropTypes.bool.isRequired,
  timerStartAt: PropTypes.number.isRequired,
  timerNumber: PropTypes.number.isRequired,
  autoplayOn: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    toggleAutoplay: PropTypes.func.isRequired,
    loadNextAutoplayAudio: PropTypes.func.isRequired,
  }).isRequired,
};

export default AutoplayProgressView;
