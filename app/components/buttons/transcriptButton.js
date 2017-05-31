
import React, { PropTypes } from 'react';

import {
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import { OFF_BLACK } from '../../styles';

const styles = StyleSheet.create({
  transcriptButtonContainer: {
    width: 40,
    height: 32,
    paddingTop: 5,
    alignItems: 'flex-end',
  },
  transcriptButton: {
    width: 15,
    resizeMode: 'contain',
    tintColor: OFF_BLACK,
  },
});

const TranscriptButton = (props) => {
  let accessibilityLabel = `${props.accessibilityLabel} transcript`;

  if (props.showTranscript) {
    accessibilityLabel += ' opened.';
  } else {
    accessibilityLabel += ' closed.';
  }

  accessibilityLabel += ' Double tap to ';

  if (props.showTranscript) {
    accessibilityLabel += 'close.';
  } else {
    accessibilityLabel += 'open.';
  }

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityTraits={'button'}
      style={styles.transcriptButtonContainer}
    >
      <Image
        resizeMode={'contain'}
        style={[
          styles.transcriptButton,
          props.styles,
          {
            transform: [
              { rotate: props.showTranscript ? '0deg' : '180deg' },
            ],
          },
        ]}
        source={require('../../assets/TranscriptButton.png')}
      />
    </TouchableOpacity>
  );
};

TranscriptButton.propTypes = {
  styles: PropTypes.object,
  showTranscript: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  accessibilityLabel: PropTypes.string.isRequired,
};

export default TranscriptButton;
