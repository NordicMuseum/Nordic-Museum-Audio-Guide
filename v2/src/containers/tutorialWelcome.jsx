import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Navigation } from 'react-native-navigation';

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

import NavigationBar from '../components/navigationBar';

import {
  NAV_BAR_TEXT,
  NAV_BAR_BACKGROUND,
  OFF_BLACK,
  ACTION,
  WHITE,
} from '../styles';

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
  static get options() {
    return {
      topBar: {
        visible: false,
      },
    };
  }

  render() {
    const width = Dimensions.get('window').width;

    //   barStyle: PropTypes.object,
    // labelStyle: PropTypes.object,
    // label: PropTypes.string,
    // buttonColor: PropTypes.string,
    // backButtonLabel: PropTypes.string,
    // backButtonPress: PropTypes.func,

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
        <NavigationBar
          labelStyle={{
            color: NAV_BAR_TEXT,
          }}
          buttonColor={ACTION}
          backButtonPress={() => {
            Navigation.pop(this.props.componentId);
          }}
          barStyle={{
            backgroundColor: 'transparent',
            height: 44,
          }}
        />
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
