
import React, { PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import LanguageSwitcherButtons from './buttons/languageSwitcherButtons';
import NavigationBar from './navigationBar';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import { OFF_BLACK, ACTION } from '../styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    marginTop: 65,
  },
  cell: {
    flexDirection: 'column',
    marginBottom: 5,
  },
});

const SettingsScreen = (props) => {
  const {
    locale,
    playerOpen,
  } = props;

  const {
    switchLocale,
  } = props.actions;

  const paddingBottom = (playerOpen ? BOTTOMPLAYERHEIGHT : 0) + 10;

  return (
    <View style={{ flex: 1 }}>
      <NavigationBar
        label={I18n.t('settingsScreen_Title')}
        labelStyle={{
          color: OFF_BLACK,
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
            paddingBottom,
          }}
          automaticallyAdjustContentInsets={false}
        >
          <View style={styles.cell}>
            <LanguageSwitcherButtons
              locale={locale}
              actions={{
                switchLocale,
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

SettingsScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
  playerOpen: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    switchLocale: PropTypes.func.isRequired,
  }),
};

export default SettingsScreen;
