
import React, { PropTypes } from 'react';

import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { OFF_WHITE, TURQUOISE, GRAY } from '../styles';

import LanguageSwitcherButtons from './buttons/languageSwitcherButtons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 15,
  },
  titleRow: {
    flexDirection: 'row',
    marginBottom: 35,
  },
  titleLogo: {
    tintColor: TURQUOISE,
  },
  titleText: {
    marginHorizontal: 15,
    alignSelf: 'flex-end',
    fontWeight: '500',
  },
  text: {
    color: OFF_WHITE,
    fontSize: 18,
  },
  cell: {
    flexDirection: 'column',
    backgroundColor: GRAY,
    marginVertical: 20,
  },
  cellTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    height: 44,
  },
  cellText: {
    flex: 1,
    color: OFF_WHITE,
  },
  languageScroller: {
    marginBottom: 150,
  },
});

const TutorialLanguagePage = (props) => {
  const {
    locale,
  } = props;

  const {
    switchLocale,
  } = props.actions;

  return (
    <View style={[styles.container]}>
      <View style={styles.titleRow}>
        <Image
          style={styles.titleLogo}
          source={require('../assets/storiesTab.png')}
        />
        <Text style={[styles.titleText, styles.text]}>
          Language
        </Text>
      </View>
      <ScrollView
        bounces={false}
        style={styles.languageScroller}
      >
        <LanguageSwitcherButtons
          locale={locale}
          actions={{
            switchLocale,
          }}
        />
      </ScrollView>
    </View>
  );
};

TutorialLanguagePage.propTypes = {
  locale: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    switchLocale: PropTypes.func.isRequired,
  }),
};

export default TutorialLanguagePage;
