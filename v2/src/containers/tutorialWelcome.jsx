import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { translate } from '../i18n';

import { hideTutorial } from '../actions/tutorial';

import { NAV_BAR_TEXT, NAV_BAR_BACKGROUND, OFF_BLACK, ACTION } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  welcomeContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  welcomeText: {
    backgroundColor: 'transparent',
    color: OFF_BLACK,
    opacity: 0.9,
    fontSize: 36,
    fontWeight: '600',
  },
  playAllButton: {
    backgroundColor: ACTION,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 9,
    marginVertical: 35,
  },
  playAllButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

class TutorialWelcome extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        title: {
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
      },
    };
  }

  render() {
    const width = Dimensions.get('window').width;

    return (
      <View style={styles.container}>
        <View style={styles.backgroundImageContainer}>
          <Image
            style={{ width, flex: 1 }}
            resizeMode={'cover'}
            source={{ uri: 'welcome.png' }}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              {translate('tutorialScreen_welcomeMessage').toUpperCase()}
            </Text>
            <View>
              <TouchableOpacity
                style={[styles.playAllButton, { width: 0.65 * width }]}
                onPress={() => {
                  this.props.actions.hideTutorial();
                }}>
                <Text style={styles.playAllButtonText}>
                  {translate('tutorialScreen_GetStarted').toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        hideTutorial,
      },
      dispatch,
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true },
)(TutorialWelcome);
