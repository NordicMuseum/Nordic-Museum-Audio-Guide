
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
    name: 'Swedish',
    code: 'sv',
  },
  {
    name: 'Emoji',
    code: 'emoji',
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
