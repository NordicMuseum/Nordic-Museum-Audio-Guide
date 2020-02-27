import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { StyleSheet, View, Text, ProgressViewIOS } from "react-native";

import { translate } from "../i18n";

import { OFF_BLACK, OFF_WHITE, globalStyles, GREEN } from "../styles";

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: OFF_BLACK
  },
  welcomeText: {
    color: OFF_WHITE,
    fontSize: globalStyles.h1.fontSize,
    fontWeight: "600"
  }
});

class DownloadAudio extends Component {
  static get options() {
    return {};
  }

  render() {
    return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          {translate("tutorialScreen_welcomeMessage") + " Downloading"}
        </Text>
        <ProgressViewIOS
          style={{ backgroundColor: "red", width: "30%" }}
          progressTintColor={GREEN}
          progress={0.5}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true }
)(DownloadAudio);
