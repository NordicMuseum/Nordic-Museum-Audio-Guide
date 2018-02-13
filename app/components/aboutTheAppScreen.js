
import React, { PropTypes } from 'react';

import DeviceInfo from 'react-native-device-info';

import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  I18nManager,
} from 'react-native';

import I18n from 'react-native-i18n';

import NavigationBar from './navigationBar';

import Markdown from 'react-native-simple-markdown';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import { globalStyles, NAV_BAR_TEXT, ACTION } from '../styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    marginTop: 65,
  },
});

const aboutTheAppText = (locale) => {
  switch (locale) {
    case 'en':
      return require('../data/pages/aboutTheApp-en.md').default;
    case 'svKids':
    case 'svSimple':
    case 'seSme':
    case 'seSmj':
    case 'seSma':
    case 'sv':
      return require('../data/pages/aboutTheApp-sv.md').default;
    default:
      return require('../data/pages/aboutTheApp-en.md').default;
  }
};

const AboutTheAppScreen = (props) => {
  const markdownStyles = {
    heading1: {
      marginTop: 25,
      ...StyleSheet.flatten(globalStyles.h1),
      writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    paragraph: {
      marginTop: 5,
      ...StyleSheet.flatten(globalStyles.body),
      writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationBar
        label={I18n.t('aboutTheAppScreen_Title')}
        labelStyle={{
          color: NAV_BAR_TEXT,
        }}
        buttonColor={ACTION}
        backButtonPress={() => { props.navigator.pop(); }}
        barStyle={{
          backgroundColor: '#ffffff',
          height: 44,
        }}
      />
      <View style={[styles.container, { marginBottom: BOTTOMBARHEIGHT }]}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: BOTTOMPLAYERHEIGHT + 10,
          }}
          automaticallyAdjustContentInsets={false}
        >
          <Markdown 
            styles={markdownStyles}
            rules={{
              paragraph: {
                react: (node, output, state) => (
                  <Text
                    key={state.key}
                    style={markdownStyles.paragraph}
                  >
                    {output(node.content, state)}
                  </Text>
                ),
              },
            }}
          >
            {aboutTheAppText(props.locale)}
          </Markdown>
          <Text style={[{ marginTop: 25 }, globalStyles.body, globalStyles.paragraph]}>
            {DeviceInfo.getVersion()}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

AboutTheAppScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

export default AboutTheAppScreen;
