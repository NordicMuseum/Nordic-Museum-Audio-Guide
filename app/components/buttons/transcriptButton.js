
import React, { PropTypes } from 'react';

import {
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import { OFF_BLACK } from '../../styles';

const styles = StyleSheet.create({
  transcriptButton: {
    width: 40,
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
        source={require('../../assets/DisclosureIndicatorCollapsibleOpen.png')}
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
