
import React, { PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Dimensions,
  I18nManager,
} from 'react-native';

import { ACTION, GRAY } from '../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    position: 'relative',
  },
  progressRow: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 16,
  },
});

const progressWidthStyle = (total, percentage) => {
  return {
    width: total * percentage,
  };
};

const ProgressBar = (props) => {
  const width = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.row,
          styles.progressRow,
          { backgroundColor: GRAY },
          I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {},
        ]}
      >
        <View
          style={[
            styles.progressBar,
            progressWidthStyle(width, props.percentage),
            { backgroundColor: ACTION },
          ]}
        />
      </View>
    </View>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressBar;
