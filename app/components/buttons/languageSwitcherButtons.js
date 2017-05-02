
import React, { PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import WideButton from './wideButton';

import { OFF_WHITE, LIGHT_GRAY, TURQUOISE } from '../../styles';

const styles = StyleSheet.create({
  offStyle: {
    borderColor: LIGHT_GRAY,
    backgroundColor: OFF_WHITE,
    marginVertical: 0,
  },
  onStyle: {
    backgroundColor: TURQUOISE,
    borderWidth: 0,
    marginBottom: 0,
    marginVertical: 0,
  },
  onTextStyle: {
    color: OFF_WHITE,
  },
});

const languages = [
  {
    name: 'English',
    code: 'en',
  },
  {
    name: 'Svenska',
    code: 'sv',
  },
  {
    name: 'Svenska Simple',
    code: 'sv-simple',
  },
  {
    name: 'Svenska Kids',
    code: 'sv-kids',
  },
  {
    name: 'Northern Sami',
    code: 'se-sme',
  },
  {
    name: 'Lule Sami',
    code: 'se-smj',
  },
  {
    name: 'Southern Sami',
    code: 'se-sma',
  },
  {
    name: 'Deutsch',
    code: 'de',
  },
  {
    name: 'Español',
    code: 'es',
  },
  {
    name: 'Русский',
    code: 'ru',
  },
  {
    name: 'Français',
    code: 'fr',
  },
  {
    name: 'Suomi',
    code: 'fi',
  },
  {
    name: 'Italiano',
    code: 'it',
  },
  {
    name: 'العربية',
    code: 'ar',
  },
  {
    name: '简体中文',
    code: 'zh',
  },
];

const LanguageSwitcherButtons = (props) => {
  return (
    <View>
      {
        languages.map((language) => {
          return (
            <WideButton
              key={language.code}
              style={[
                props.locale === language.code ? styles.onStyle : styles.offStyle,
                props.style,
              ]}
              textStyle={[
                props.locale === language.code ? styles.onTextStyle : {},
                props.textStyle,
              ]}
              text={language.name}
              onPress={() => {
                props.actions.switchLocale(language.code);
              }}
            />
          );
        })
      }
    </View>
  );
};

LanguageSwitcherButtons.propTypes = {
  locale: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([
    View.propTypes.style,
    PropTypes.object,
  ]),
  textStyle: PropTypes.oneOfType([
    Text.propTypes.style,
    PropTypes.object,
  ]),
  actions: PropTypes.shape({
    switchLocale: PropTypes.func.isRequired,
  }),
};

export default LanguageSwitcherButtons;
