import React from "react";
import PropTypes from "prop-types";

import {
  Text,
  View,
  TouchableHighlight,
  Image,
  StyleSheet
} from "react-native";

import { isRTL } from "../i18n";

import { globalStyles, LIGHT_GRAY } from "../styles";

export const DISCLOSURE_CELL_HEIGHT = 41;

const styles = StyleSheet.create({
  cell: {
    flexDirection: "row",
    alignItems: "center",
    height: DISCLOSURE_CELL_HEIGHT,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY
  },
  cellTitle: {
    flex: 1,
    marginLeft: 10
  },
  cellImage: {
    height: DISCLOSURE_CELL_HEIGHT + 3,
    width: DISCLOSURE_CELL_HEIGHT + 3
  }
});

const DisclosureCell = props => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      accessibilityRole={props.accessibility.role}
      accessibilityLabel={props.accessibility.label}
    >
      <View
        style={[
          styles.cell,
          props.bottomBorder === false ? { borderBottomWidth: 0 } : {}
        ]}
      >
        <Text style={[styles.cellTitle]}>
          <Text
            style={[
              globalStyles.disclosure,
              { textAlign: isRTL ? "right" : "left" }
            ]}
          >
            {props.title}
          </Text>
        </Text>
        <Image
          style={[
            styles.cellImage,
            { transform: [{ scaleX: isRTL ? -1 : 1 }] }
          ]}
          source={require("../assets/DisclosureIndicator.png")}
        />
      </View>
    </TouchableHighlight>
  );
};

DisclosureCell.propTypes = {
  accessibility: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  bottomBorder: PropTypes.bool.isRequired
};

export default DisclosureCell;
