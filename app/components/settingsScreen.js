
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

import { NAV_BAR_TEXT, ACTION } from '../styles';

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

  const paddingBottom = playerOpen ? BOTTOMPLAYERHEIGHT : 0;

  return (
    <View style={{ flex: 1 }}>
      <NavigationBar
        label={I18n.t('settingsScreen_Title')}
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
            paddingBottom,
            marginHorizontal: 25,
          }}
          automaticallyAdjustContentInsets={false}
        >
          <View style={styles.cell}>
            <LanguageSwitcherButtons
              locale={locale}
              onPress={(languageCode) => {
                switchLocale(languageCode, 'settings');
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
