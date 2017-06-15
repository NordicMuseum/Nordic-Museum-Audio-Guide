
import React, { PropTypes, Component } from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  Settings,
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

class TutorialLanguagePage extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      switchLocale: PropTypes.func.isRequired,
      switchLocaleFromTutorial: PropTypes.func.isRequired,
      hideTutorial: PropTypes.func.isRequired,
    }),
  };

  constructor(props) {
    super(props);
    this.advanceLanguageTutorialScreen = this.advanceLanguageTutorialScreen.bind(this);
  }

  componentDidMount() {
    if (Settings.get('advanceLanguageTutorialScreenOnLoad')) {
      setTimeout(this.advanceLanguageTutorialScreen, 1000);
      Settings.set({ advanceLanguageTutorialScreenOnLoad: false });
    }
  }

  advanceLanguageTutorialScreen() {
    const {
      hideTutorial,
    } = this.props.actions;

    this.props.navigator.push({
      title: '',
      component: TutorialWelcomePage,
      barTintColor: '#ffffff',
      titleTextColor: OFF_BLACK,
      shadowHidden: true,
      navigationBarHidden: true,
      passProps: {
        navigator: this.props.navigator,
        locale: this.props.locale,
        actions: {
          hideTutorial,
        },
      },
    });
  }

  render() {
    const {
      locale,
    } = this.props;

    const {
      switchLocale,
      switchLocaleFromTutorial,
      hideTutorial,
    } = this.props.actions;

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
              if (languageCode === 'ar' && locale !== 'ar') {
                switchLocaleFromTutorial(languageCode);
              } else if (languageCode !== 'ar' && locale === 'ar') {
                switchLocaleFromTutorial(languageCode);
              } else {
                switchLocale(languageCode);
                this.props.navigator.push({
                  title: '',
                  component: TutorialWelcomePage,
                  barTintColor: '#ffffff',
                  titleTextColor: OFF_BLACK,
                  shadowHidden: true,
                  navigationBarHidden: true,
                  passProps: {
                    navigator: this.props.navigator,
                    locale: languageCode,
                    actions: {
                      hideTutorial,
                    },
                  },
                });
              }
            }}
          />
        </ScrollView>
      </View>
    );
  }
};

export default TutorialLanguagePage;
