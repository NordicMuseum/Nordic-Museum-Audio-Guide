import React from "react";
import PropTypes from "prop-types";

import { View, StyleSheet, Text } from "react-native";

import { HEADER_BACKGROUND_COLOR, OFF_WHITE } from "../styles";

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: "center",
    backgroundColor: HEADER_BACKGROUND_COLOR
  },
  textStyles: {
    textAlign: "center",
    fontSize: 17,
    color: OFF_WHITE
  }
});

const StickyHeader = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyles}>{props.title}</Text>
    </View>
  );
};

StickyHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default StickyHeader;
