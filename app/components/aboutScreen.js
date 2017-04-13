
import React, { PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import { globalStyles } from '../styles';

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
        <Text style={globalStyles.body}>
          {I18n.t('aboutScreen_Overview')}
        </Text>
        <Text style={[globalStyles.h1, styles.aboutHeader]}>
          {I18n.t('aboutScreen_AboutHeader')}
        </Text>
        <Text style={globalStyles.body}>
          {I18n.t('aboutScreen_AboutBody')}
        </Text>
        <Text style={[globalStyles.h1, styles.aboutHeader]}>
          {I18n.t('aboutScreen_HoursHeader')}
        </Text>
        <Text style={globalStyles.body}>
          {I18n.t('aboutScreen_HoursBody1')}
        </Text>
        <Text style={globalStyles.body}>
          {I18n.t('aboutScreen_HoursBody2')}
        </Text>
        <Text style={globalStyles.body}>
          {I18n.t('aboutScreen_HoursBody3')}
        </Text>
        <Text style={globalStyles.body}>
          {I18n.t('aboutScreen_HoursBody4')}
        </Text>
        <View style={styles.hoursRow}>
          <View style={styles.hoursDay}>
            <Text style={globalStyles.body}>
              {I18n.t('aboutScreen_HoursMonday')}
            </Text>
          </View>
          <View 
            style={styles.hours}
            accessible={true}
            accessibilityLabel={I18n.t('aboutScreen_HoursMondayHoursAccessibilityLabel')}
          >
            <Text style={globalStyles.body}>
              {I18n.t('aboutScreen_HoursMondayHours')}
            </Text>
          </View>
        </View>
        <View style={styles.hoursRow}>
          <View style={styles.hoursDay}>
            <Text style={globalStyles.body}>
              {I18n.t('aboutScreen_HoursTuesday')}
            </Text>
          </View>
          <View
            style={styles.hours}
            accessible={true}
            accessibilityLabel={I18n.t('aboutScreen_HoursTuesdayHoursAccessibilityLabel')}
          >
            <Text style={globalStyles.body}>
              {I18n.t('aboutScreen_HoursTuesdayHours')}
            </Text>
          </View>
        </View>
        <View style={styles.hoursRow}>
          <View style={styles.hoursDay}>
            <Text style={globalStyles.body}>
              {I18n.t('aboutScreen_HoursWednesday')}
            </Text>
          </View>
          <View
            style={styles.hours}
            accessible={true}
            accessibilityLabel={I18n.t('aboutScreen_HoursWednesdayHoursAccessibilityLabel')}
          >
            <Text style={globalStyles.body}>
              {I18n.t('aboutScreen_HoursWednesdayHours')}
            </Text>
          </View>
        </View>
        <View style={styles.hoursRow}>
          <View style={styles.hoursDay}>
            <Text style={globalStyles.body}>
              {I18n.t('aboutScreen_HoursThursday')}
            </Text>
          </View>
          <View
            style={styles.hours}
            accessible={true}
            accessibilityLabel={I18n.t('aboutScreen_HoursThursdayHoursAccessibilityLabel')}
          >
            <Text style={globalStyles.body}>
              {I18n.t('aboutScreen_HoursThursdayHours')}
            </Text>
          </View>
        </View>
        <View style={styles.hoursRow}>
          <View style={styles.hoursDay}>
            <Text style={globalStyles.body}>
              {I18n.t('aboutScreen_HoursFriday')}
            </Text>
          </View>
          <View
            style={styles.hours}
            accessible={true}
            accessibilityLabel={I18n.t('aboutScreen_HoursFridayHoursAccessibilityLabel')}
          >
            <Text style={globalStyles.body}>
              {I18n.t('aboutScreen_HoursFridayHours')}
            </Text>
          </View>
        </View>
        <View style={styles.hoursRow}>
          <View style={styles.hoursDay}>
            <Text style={globalStyles.body}>
              {I18n.t('aboutScreen_HoursSaturday')}
            </Text>
          </View>
          <View
            style={styles.hours}
            accessible={true}
            accessibilityLabel={I18n.t('aboutScreen_HoursSaturdayHoursAccessibilityLabel')}
          >
            <Text style={globalStyles.body}>
              {I18n.t('aboutScreen_HoursSaturdayHours')}
            </Text>
          </View>
        </View>
        <View style={styles.hoursRow}>
          <View style={styles.hoursDay}>
            <Text style={globalStyles.body}>
              {I18n.t('aboutScreen_HoursSunday')}
            </Text>
          </View>
          <View
            style={styles.hours}
            accessible={true}
            accessibilityLabel={I18n.t('aboutScreen_HoursSundayHoursAccessibilityLabel')}
          >
            <Text style={globalStyles.body}>
              {I18n.t('aboutScreen_HoursSundayHours')}
            </Text>
          </View>
        </View>
      <Text style={[globalStyles.h1, styles.aboutHeader]}>
          {I18n.t('aboutScreen_AdmissionHeader')}
        </Text>
        <Text style={globalStyles.body}>
          {I18n.t('aboutScreen_AdmissionBody1')}
        </Text>
        <Text style={globalStyles.body}>
          {I18n.t('aboutScreen_AdmissionBody2')}
        </Text>
        <Text style={globalStyles.body}>
          {I18n.t('aboutScreen_AdmissionBody3')}
        </Text>
      <Text style={[globalStyles.h1, styles.aboutHeader]}>
          {I18n.t('aboutScreen_ForChildrenHeader')}
        </Text>
        <Text style={globalStyles.body}>
          {I18n.t('aboutScreen_ForChildrenBody')}
        </Text>
      </ScrollView>
    </View>
  );
};

AboutScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default AboutScreen;
