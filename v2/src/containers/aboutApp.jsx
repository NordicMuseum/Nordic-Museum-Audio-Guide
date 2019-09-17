import React, {Component} from 'react';

// Re add app version to bottom of screen
// import DeviceInfo from 'react-native-device-info';
// <Text style={[{ marginTop: 25 }, globalStyles.body, globalStyles.paragraph]}>
//               {DeviceInfo.getVersion()}
//             </Text>

// Placeholder for the translate function
var I18n = {};
I18n.t = function(t) {
  return t;
};

// Placeholder for BOTTOMPLAYERHEIGHT
const BOTTOMPLAYERHEIGHT = 0;

import {View, StyleSheet, ScrollView, Text} from 'react-native';

import Markdown from 'react-native-simple-markdown';

import {
  globalStyles,
  NAV_BAR_TEXT,
  NAV_BAR_BACKGROUND,
  ACTION,
} from '../styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
  },
});

const aboutTheAppText = locale => {
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

class AboutApp extends Component {
  static get options() {
    return {
      topBar: {
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        backButton: {
          showTitle: false,
          color: ACTION,
        },
        title: {
          text: 'About the App',
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
      },
    };
  }

  render() {
    const markdownStyles = {
      heading1: {
        marginTop: 25,
        ...StyleSheet.flatten(globalStyles.h1),
        // writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
        // textAlign: I18nManager.isRTL ? 'right' : 'left',
      },
      paragraph: {
        marginTop: 5,
        ...StyleSheet.flatten(globalStyles.body),
        // writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
        // textAlign: I18nManager.isRTL ? 'right' : 'left',
      },
    };

    // PLACEHODLER
    var locale = 'en';

    return (
      <View style={{flex: 1}}>
        <View style={[styles.container]}>
          <ScrollView
            contentContainerStyle={{
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: BOTTOMPLAYERHEIGHT + 10,
            }}
            automaticallyAdjustContentInsets={false}>
            <Markdown
              styles={markdownStyles}
              rules={{
                paragraph: {
                  react: (node, output, state) => (
                    <Text key={state.key} style={markdownStyles.paragraph}>
                      {output(node.content, state)}
                    </Text>
                  ),
                },
              }}>
              {aboutTheAppText(locale)}
            </Markdown>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default AboutApp;
