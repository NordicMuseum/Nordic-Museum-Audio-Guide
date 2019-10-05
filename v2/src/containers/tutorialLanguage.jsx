import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { StyleSheet, View, ScrollView } from 'react-native';

import { translate } from '../i18n';

import { switchLocale } from '../actions/localization';

import { NAV_BAR_TEXT, OFF_BLACK, WHITE } from '../styles';

import LanguageSwitcherButtons from '../components/buttons/languageSwitcherButtons';
import { Navigation } from 'react-native-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class TutorialLanguage extends Component {
  static get options() {
    return {
      topBar: {
        background: {
          color: WHITE,
        },
        title: {
          text: translate('settingsScreen_Title'),
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
        noBorder: true,
      },
    };
  }

  render() {
    const { locale } = this.props;
    const { switchLocale } = this.props.actions;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          automaticallyAdjustContentInsets={false}>
          <LanguageSwitcherButtons
            textStyle={{ color: OFF_BLACK }}
            locale={locale}
            onPress={languageCode => {
              switchLocale(languageCode);
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locale: state.device.locale,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
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
)(TutorialLanguage);
