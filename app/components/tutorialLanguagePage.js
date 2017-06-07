
import React, { PropTypes } from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import I18n from 'react-native-i18n';

import NavigationBar from './navigationBar';
import TutorialWelcomePage from './tutorialWelcomePage';
import LanguageSwitcherButtons from './buttons/languageSwitcherButtons';

import { LIGHT_GRAY, OFF_BLACK } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 44,
  },
});

const TutorialLanguagePage = (props) => {
  const {
    locale,
  } = props;

  const {
    switchLocale,
    hideTutorial,
  } = props.actions;

  return (
    <View style={{ flex: 1 }}>
      <NavigationBar
        label={I18n.t('settingsScreen_Title')}
        labelStyle={{
          color: OFF_BLACK,
        }}
        barStyle={{
          backgroundColor: LIGHT_GRAY,
          height: 44,
          top: 0,
        }}
      />
      <ScrollView
        style={styles.container}
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{ marginHorizontal: 25 }}
      >
        <LanguageSwitcherButtons
          style={{ backgroundColor: 'transparent' }}
          textStyle={{ color: OFF_BLACK }}
          locale={locale}
          onPress={(languageCode) => {
            switchLocale(languageCode);

            props.navigator.push({
              title: '',
              component: TutorialWelcomePage,
              barTintColor: '#ffffff',
              titleTextColor: OFF_BLACK,
              shadowHidden: true,
              navigationBarHidden: true,
              passProps: {
                navigator: props.navigator,
                locale: languageCode,
                actions: {
                  hideTutorial,
                },
              },
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

TutorialLanguagePage.propTypes = {
  navigator: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    switchLocale: PropTypes.func.isRequired,
    hideTutorial: PropTypes.func.isRequired,
  }),
};

export default TutorialLanguagePage;
