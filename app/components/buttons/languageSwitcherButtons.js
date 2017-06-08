
import React, { PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import WideButton from './wideButton';

import { OFF_WHITE, ACTION } from '../../styles';

const styles = StyleSheet.create({
  offStyle: {
    borderColor: 'transparent',
    marginVertical: 0,
    borderRadius: 0,
  },
  onStyle: {
    backgroundColor: ACTION,
    borderWidth: 0,
    marginBottom: 0,
    marginVertical: 0,
    borderRadius: 0,
  },
  onTextStyle: {
    color: OFF_WHITE,
  },
  normalTextStyle: {
    textAlign: 'center',
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
    name: 'Lätt svenska',
    code: 'sv-simple',
  },
  {
    name: 'Barnens audioguide',
    code: 'sv-kids',
  },
  {
    name: 'Davvisámegiella',
    code: 'se-sme',
  },
  {
    name: 'Julevsámegiella',
    code: 'se-smj',
  },
  {
    name: 'Åarjelsaemien gïele',
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
                styles.normalTextStyle,
                props.textStyle,
              ]}
              text={language.name}
              onPress={() => {
                props.onPress(language.code);
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
  onPress: PropTypes.func.isRequired,
};

export default LanguageSwitcherButtons;
