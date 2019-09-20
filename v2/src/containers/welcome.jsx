import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { StyleSheet, View, Text } from 'react-native';

import { hideTutorial } from '../actions/tutorial';
import { switchLocale } from '../actions/localization';

import { NAV_BAR_TEXT, NAV_BAR_BACKGROUND } from '../styles';

class Welcome extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        title: {
          text: 'Info',
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
      },
    };
  }

  render() {
    return (
      <View>
        <Text>Welcome</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    tutorialHidden: state.tutorial.tutorialHidden,
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        hideTutorial,
        switchLocale,
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
)(Welcome);
