
import React, { PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  View,
  StyleSheet,
  ScrollView,
  I18nManager,
} from 'react-native';

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

const aboutText = (locale) => {
  switch (locale) {
    case 'de':
      return require('../data/pages/aboutTheMuseum-de.md').default;
    case 'en':
      return require('../data/pages/aboutTheMuseum-en.md').default;
    case 'es':
      return require('../data/pages/aboutTheMuseum-es.md').default;
    case 'fi':
      return require('../data/pages/aboutTheMuseum-fi.md').default;
    case 'fr':
      return require('../data/pages/aboutTheMuseum-fr.md').default;
    case 'it':
      return require('../data/pages/aboutTheMuseum-it.md').default;
    case 'ru':
      return require('../data/pages/aboutTheMuseum-ru.md').default;
    case 'svKids':
    case 'svSimple':
    case 'seSme':
    case 'seSmj':
    case 'seSma':
    case 'sv':
      return require('../data/pages/aboutTheMuseum-sv.md').default;
    case 'zh':
      return require('../data/pages/aboutTheMuseum-zh.md').default;
    default:
      return require('../data/pages/aboutTheMuseum-en.md').default;
  }
};

const hoursText = (locale) => {
  switch (locale) {
    case 'en':
      return require('../data/pages/openingHoursAdmission-en.md').default;
    case 'svKids':
    case 'svSimple':
    case 'seSme':
    case 'seSmj':
    case 'seSma':
    case 'sv':
      return require('../data/pages/openingHoursAdmission-sv.md').default;
    default:
      return require('../data/pages/openingHoursAdmission-en.md').default;
  }
};

const AboutScreen = (props) => {
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
        label={I18n.t('aboutScreen_Title')}
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
            {aboutText(props.locale)}
          </Markdown>
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
            {hoursText(props.locale)}
          </Markdown>
        </ScrollView>
      </View>
    </View>
  );
};

AboutScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

export default AboutScreen;
