import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { View, StyleSheet, ScrollView, Text, Switch } from 'react-native';

import { updateMuseumMode } from '../actions/device';

import Markdown from 'react-native-simple-markdown';

import { isRTL } from '../i18n';

import {
  globalStyles,
  NAV_BAR_TEXT,
  ACTION,
  BOTTOM_PLAYER_HEIGHT,
  WHITE,
  GRAY,
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
          color: WHITE,
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
        noBorder: true,
      },
    };
  }

  render() {
    const { locale, appVersion, museumMode, actions } = this.props;

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
        <View style={[styles.container]}>
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
              {aboutTheAppText(locale)}
            </Markdown>
            <Text
              style={[
                { marginTop: 25 },
                globalStyles.body,
                globalStyles.paragraph,
              ]}>
              {appVersion}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[globalStyles.h1]}>{'Museum Mode'}</Text>
              <Switch
                value={museumMode}
                trackColor={{ true: ACTION }}
                onValueChange={newVal => {
                  actions.updateMuseumMode(newVal);
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locale: state.device.locale,
    appVersion: state.device.appVersion,
    museumMode: state.device.museumMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        updateMuseumMode,
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
)(AboutApp);
