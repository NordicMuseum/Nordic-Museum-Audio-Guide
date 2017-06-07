
import React, { PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import NavigationBar from './navigationBar';

import { OFF_BLACK, ACTION, LIGHT_GRAY, GRAY } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 44,
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  welcomeText: {
    backgroundColor: 'transparent',
    color: GRAY,
    fontSize: 55,
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

const TutorialWelcomePage = (props) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height - 64;

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <Image
          style={{ width, height }}
          resizeMode={'cover'}
          source={{ uri: 'welcome.png' }}
        />
      </View>
      <View style={styles.contentContainer}>
        <NavigationBar
          label={'Welcome'}
          labelStyle={{
            color: OFF_BLACK,
          }}
          buttonColor={ACTION}
          backButtonPress={() => {
            props.navigator.pop();
          }}
          barStyle={{
            backgroundColor: LIGHT_GRAY,
            height: 44,
            top: 0,
            zIndex: 999,
          }}
        />
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            {'Welcome!'.toUpperCase()}
          </Text>
          <View>
            <TouchableOpacity
              style={[styles.playAllButton, { width: 0.65 * width }]}
              onPress={() => {
                props.actions.hideTutorial();
              }}
            >
              <Text style={styles.playAllButtonText}>
                {I18n.t('tutorialScreen_GetStarted').toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

TutorialWelcomePage.propTypes = {
  navigator: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    hideTutorial: PropTypes.func.isRequired,
  }),
};

export default TutorialWelcomePage;
