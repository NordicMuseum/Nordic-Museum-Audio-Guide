import React from "react";
import PropTypes from "prop-types";

import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import { isRTL } from "../i18n";

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    elevation: 1.5
  },
  label: {
    display: "flex",
    fontSize: 17
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 72,
    paddingLeft: 16,
    paddingRight: 32,
    height: 60
  },
  backButtonLabel: {
    fontSize: 17
  },
  backArrow: {
    width: 24
  }
});

const NavigationBar = props => {
  return (
    <View style={[styles.bar, props.barStyle]}>
      {props.backButtonPress && (
        <TouchableOpacity
          onPress={props.backButtonPress}
          style={styles.backButton}
        >
          <Image
            source={require("../assets/backAndroid.png")}
            style={[
              styles.backArrow,
              { tintColor: props.buttonColor },
              { transform: [{ scaleX: isRTL ? -1 : 1 }] }
            ]}
          />
          <Text style={[styles.backButtonLabel, { color: props.buttonColor }]}>
            {props.backButtonLabel}
          </Text>
        </TouchableOpacity>
      )}
      <Text
        style={[
          props.labelStyle,
          styles.label,
          props.backButtonPress ? {} : { paddingLeft: 72 }
        ]}
      >
        {props.label}
      </Text>
    </View>
  );
};

NavigationBar.propTypes = {
  barStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  label: PropTypes.string,
  buttonColor: PropTypes.string,
  backButtonLabel: PropTypes.string,
  backButtonPress: PropTypes.func
};

export default NavigationBar;
