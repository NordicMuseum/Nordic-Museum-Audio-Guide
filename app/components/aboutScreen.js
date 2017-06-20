
import React, { PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  I18nManager,
} from 'react-native';

import NavigationBar from './navigationBar';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import { globalStyles, NAV_BAR_TEXT, ACTION } from '../styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    marginTop: 65,
  },
  aboutHeader: {
    marginTop: 25,
    marginBottom: 5,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  hoursDay: {
    flex: 0.3,
    paddingRight: 15,
  },
  hours: {
    flex: 0.7,
    alignItems: 'flex-start',
  },
});

const AboutScreen = (props) => {
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
          <Text style={{ writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' }}>
            <Text
              style={[
                globalStyles.body,
                { textAlign: I18nManager.isRTL ? 'right' : 'left' },
              ]}
            >
              {I18n.t('aboutScreen_Overview')}
            </Text>
            <Text
              style={[
                globalStyles.h1,
                styles.aboutHeader,
                { textAlign: I18nManager.isRTL ? 'right' : 'left' },
              ]}
            >
              {I18n.t('aboutScreen_AboutHeader')}
            </Text>
            <Text
              style={[
                globalStyles.body,
                { textAlign: I18nManager.isRTL ? 'right' : 'left' },
              ]}
            >
              {I18n.t('aboutScreen_AboutBody')}
            </Text>
          </Text>
          <Text style={[globalStyles.h1, styles.aboutHeader]}>
            {I18n.t('aboutScreen_HoursHeader')}
          </Text>
          <Text
            accessibilityLabel={I18n.t('aboutScreen_HoursBody1AccessibilityLabel')}
            style={globalStyles.body}
          >
            {I18n.t('aboutScreen_HoursBody1')}
          </Text>
          <Text
            accessibilityLabel={I18n.t('aboutScreen_HoursBody2AccessibilityLabel')}
            style={globalStyles.body}
          >
            {I18n.t('aboutScreen_HoursBody2')}
          </Text>
          <Text style={[globalStyles.h1, styles.aboutHeader]}>
            {I18n.t('aboutScreen_AdmissionHeader')}
          </Text>
          <Text style={globalStyles.body}>
            {I18n.t('aboutScreen_AdmissionBody1')}
          </Text>
          <Text style={globalStyles.body}>
            {I18n.t('aboutScreen_AdmissionBody2')}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

AboutScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default AboutScreen;
