import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Navigation } from 'react-native-navigation';

import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { translate } from '../i18n';

import { hideTutorial } from '../actions/tutorial';

import NavigationBar from '../components/navigationBar';

import { OFF_BLACK, ACTION } from '../styles';

import { imageURI } from '../utilities';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
      // Using custom nav bar to support transparency
      topBar: {
        visible: false,
      },
    };
  }

  render() {
    const width = Dimensions.get('window').width;

    return (
      <ImageBackground
        style={styles.container}
        resizeMode={'cover'}
        source={{ uri: imageURI('welcome.png') }}>
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
          buttonColor={ACTION}
          backButtonPress={() => {
            Navigation.pop(this.props.componentId);
          }}
          barStyle={{
            backgroundColor: 'transparent',
            height: 44,
          }}
        />
      </ImageBackground>
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
