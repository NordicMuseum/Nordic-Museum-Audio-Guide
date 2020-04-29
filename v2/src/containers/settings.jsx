import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Navigation } from "react-native-navigation";

import { translate } from "../i18n";
import { switchLocale as switchLocaleAction } from "../actions/localization";

import LanguageSwitcherButtons from "../components/buttons/languageSwitcherButtons";

import { NAV_BAR_TEXT, BOTTOM_PLAYER_HEIGHT, ACTION, WHITE } from "../styles";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    marginHorizontal: 25,
    flex: 1
  },
  cell: {
    flexDirection: "column",
    marginBottom: 5
  }
});

class Settings extends Component {
  static get options() {
    return {
      topBar: {
        background: {
          color: WHITE
        },
        backButton: {
          showTitle: false,
          color: ACTION
        },
        title: {
          text: translate("settingsScreen_Title"),
          fontSize: 17,
          fontFamily: "Helvetica",
          color: NAV_BAR_TEXT
        },
        noBorder: true
      }
    };
  }

  render() {
    const { locale, playerOpen } = this.props;

    const { switchLocale } = this.props.actions;

    const paddingBottom = playerOpen ? BOTTOM_PLAYER_HEIGHT : 0;

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom
          }}
          automaticallyAdjustContentInsets={false}
        >
          <View style={styles.cell}>
            <LanguageSwitcherButtons
              locale={locale}
              onPress={selectedLocale => {
                if (locale === selectedLocale) {
                  Navigation.pop(this.props.componentId);
                  return;
                }

                switchLocale(selectedLocale);
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

Settings.propTypes = {
  playerOpen: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    switchLocale: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => {
  return {
    playerOpen: state.bottomPlayer.playerOpen,
    locale: state.device.locale
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        switchLocale: switchLocaleAction
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true }
)(Settings);
