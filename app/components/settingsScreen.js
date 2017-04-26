
import React, { PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';

import SwitchButton from './buttons/switchButton';

import BluetoothButton from './buttons/bluetoothButton';
import LocationServicesButton from './buttons/locationServicesButton';
import LanguageSwitcherButtons from './buttons/languageSwitcherButtons';
import NavigationBar from './navigationBar';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import { globalStyles, LIGHT_BLUE, OFF_BLACK, TEAL } from '../styles';

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
  cellTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
  },
  cellBody: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: LIGHT_BLUE,
  },
});

const SettingsScreen = (props) => {
  const {
    timerActive,
    autoplayOn,
    autoplayInitial,
    bluetoothOn,
    locationServicesStatus,
    locale,
  } = props;

  const {
    toggleAutoplay,
    toggleAutoplayInitial,
    switchLocale,
  } = props.actions;

  let autoplayVoiceoverMessage;
  if (autoplayOn) {
    autoplayVoiceoverMessage = 'Autoplay, on. Double tap to turn off.';
  } else {
    autoplayVoiceoverMessage = 'Autoplay, off. Double tap to turn on.';
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationBar
        label={I18n.t('settingsScreen_Title')}
        labelStyle={{
          color: OFF_BLACK,
        }}
        buttonColor={TEAL}
        backButtonPress={() => { props.navigator.pop(); }}
        backButtonLabel={I18n.t('museumScreen_Title')}
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
          <View style={styles.cell}>
            <View style={styles.cellTitle}>
              <Text style={globalStyles.disclosure}>
                Near Me
              </Text>
            </View>
            <View style={styles.cellBody}>
              <Text style={[globalStyles.body, { marginBottom: 5 }]}>
                {'At the museum, we show you stories based on what’s near you.'
                 + '\n\n' +
                'To use this feature, we’ll need two things from you…'}
              </Text>
              <LocationServicesButton
                locationServicesStatus={locationServicesStatus}
              />
              <BluetoothButton
                bluetoothOn={bluetoothOn}
              />
            </View>
          </View>
          <View style={styles.cell}>
            <View
              style={styles.cellTitle}
              accessible={true}
              accessibilityLabel={autoplayVoiceoverMessage}
              onAccessibilityTap={() => {
                toggleAutoplay(autoplayOn, timerActive);
              }}
            >
              <Text style={[globalStyles.disclosure, { flex: 1 }]}>
                Autoplay
              </Text>
              <SwitchButton
                width={40}
                height={25}
                onPress={() => {
                  toggleAutoplay(autoplayOn, timerActive);
                }}
                value={autoplayOn}
              />
            </View>
            <View style={styles.cellBody}>
              <Text style={globalStyles.body}>
                {'Out Loud is organized into stories. Each story contains multiple audio files, or chapters, related to one theme or artwork.'
                 + '\n\n' +
                'If you turn on autoplay, we’ll automatically play all chapters within a story.'}
              </Text>
            </View>
          </View>
          <View style={styles.cell}>
            <View
              style={styles.cellTitle}
              accessible={true}
              accessibilityLabel={autoplayVoiceoverMessage}
              onAccessibilityTap={() => {
                toggleAutoplay(autoplayOn, timerActive);
              }}
            >
              <Text style={[globalStyles.disclosure, { flex: 1 }]}>
                Autoplay Initial
              </Text>
              <SwitchButton
                width={40}
                height={25}
                onPress={() => {
                  toggleAutoplayInitial(!autoplayInitial);
                }}
                value={autoplayInitial}
              />
            </View>
            <View style={[styles.cellBody, { backgroundColor: '#f2a99f' }]}>
              <Text style={globalStyles.body}>
                Temporary setting for testing if a story should autoplay when loaded.
              </Text>
            </View>
          </View>
          <View style={styles.cell}>
            <View
              style={styles.cellTitle}
              accessible={true}
              accessibilityLabel={'Language Settings'}
            >
              <Text style={[globalStyles.disclosure, { flex: 1 }]}>
                Language
              </Text>
            </View>
            <View style={styles.cellBody}>
              <LanguageSwitcherButtons
                locale={locale}
                actions={{
                  switchLocale,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

SettingsScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
  timerActive: PropTypes.bool.isRequired,
  autoplayOn: PropTypes.bool.isRequired,
  autoplayInitial: PropTypes.bool.isRequired,
  bluetoothOn: PropTypes.bool.isRequired,
  locationServicesStatus: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    toggleAutoplay: PropTypes.func.isRequired,
    toggleAutoplayInitial: PropTypes.func.isRequired,
    switchLocale: PropTypes.func.isRequired,
  }),
};

export default SettingsScreen;
