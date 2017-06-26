import React, { PropTypes } from 'react';

import I18n from 'react-native-i18n';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import ProgressBar from './progressBar';

import { globalStyles, ACTION } from '../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 15,
  },
  closePlayerButton: {
    marginTop: 5,
  },
  progressRow: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 9,
  },
});

const ClosePlayerView = props => {
  return (
    <View style={styles.container}>
      <ProgressBar style={styles.progressRow} percentage={1} />
      <View style={styles.textContainer}>
        <View
          accessible={true}
          accessibilityTraits={['header']}
          accessibilityLabel={`${I18n.t('closePlayerView_Text')} ${I18n.t(props.stopTitle)}`}
        >
          <Text style={[globalStyles.h2, { fontWeight: '300' }]}>
            {I18n.t('closePlayerView_Text')}
          </Text>
          <Text
            style={[
              globalStyles.h2,
              {
                fontWeight: '500',
                textAlign: 'center',
              },
            ]}
          >
            {I18n.t(props.stopTitle)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.closePlayerButton}
          onPress={props.closePlayer}
          accessible={true}
          accessibilityTraits={'button'}
          accessibilityLabel={I18n.t('closePlayerView_ClosePlayer')}
        >
          <Text style={[globalStyles.disclosure, { color: ACTION }]}>
            {I18n.t('closePlayerView_ClosePlayer')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ClosePlayerView.propTypes = {
  stopTitle: PropTypes.string.isRequired,
  closePlayer: PropTypes.func.isRequired,
  navToTourStop: PropTypes.func.isRequired,
};

export default ClosePlayerView;
