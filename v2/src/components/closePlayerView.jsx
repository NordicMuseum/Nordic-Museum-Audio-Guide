import React from "react";
import PropTypes from "prop-types";

import { translate } from "../i18n";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import ProgressBar from "./progressBar";

import { globalStyles, ACTION } from "../styles";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 15
  },
  closePlayerButton: {
    marginTop: 5
  },
  progressRow: {
    justifyContent: "flex-start",
    alignItems: "stretch",
    height: 9
  }
});

const ClosePlayerView = props => {
  return (
    <View style={styles.container}>
      <ProgressBar style={styles.progressRow} percentage={1} />
      <View style={styles.textContainer}>
        <View
          accessible={true}
          accessibilityTraits={["header"]}
          accessibilityLabel={`${translate("closePlayerView_Text")} ${translate(
            props.stopTitle
          )}`}
        >
          <Text style={[globalStyles.h2, { fontWeight: "300" }]}>
            {translate("closePlayerView_Text")}
          </Text>
          <Text
            style={[
              globalStyles.h2,
              {
                fontWeight: "500",
                textAlign: "center"
              }
            ]}
          >
            {translate(props.stopTitle)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.closePlayerButton}
          onPress={props.closePlayer}
          accessible={true}
          accessibilityTraits={"button"}
          accessibilityLabel={translate("closePlayerView_ClosePlayer")}
        >
          <Text style={[globalStyles.disclosure, { color: ACTION }]}>
            {translate("closePlayerView_ClosePlayer")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ClosePlayerView.propTypes = {
  stopTitle: PropTypes.string.isRequired,
  closePlayer: PropTypes.func.isRequired,
  navToTourStop: PropTypes.func.isRequired
};

export default ClosePlayerView;
