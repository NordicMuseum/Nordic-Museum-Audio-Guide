import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

import { connect } from 'react-redux';

import Markdown from 'react-native-simple-markdown';

import { isRTL } from '../i18n';

import {
  globalStyles,
  NAV_BAR_TEXT,
  NAV_BAR_BACKGROUND,
  BOTTOM_PLAYER_HEIGHT,
  ACTION,
} from '../styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
  },
});

const aboutText = locale => {
  switch (locale) {
    //TODO Disabling Arabic translation until RTL is figured out
    //case 'ar':
    //  return require('../data/pages/aboutTheMuseum-ar.md').default;
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

const hoursText = locale => {
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

class AboutMuseum extends Component {
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
          text: 'The Nordic Museum',
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
      },
    };
  }

  render() {
    const { locale } = this.props;

    const markdownStyles = {
      heading1: {
        marginTop: 25,
        ...StyleSheet.flatten(globalStyles.h1),
        writingDirection: isRTL() ? 'rtl' : 'ltr',
        textAlign: isRTL() ? 'right' : 'left',
      },
      paragraph: {
        marginTop: 5,
        ...StyleSheet.flatten(globalStyles.body),
        writingDirection: isRTL() ? 'rtl' : 'ltr',
        textAlign: isRTL() ? 'right' : 'left',
      },
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: BOTTOM_PLAYER_HEIGHT + 10,
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
              {aboutText(locale)}
            </Markdown>
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
              {hoursText(locale)}
            </Markdown>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true },
)(AboutMuseum);
