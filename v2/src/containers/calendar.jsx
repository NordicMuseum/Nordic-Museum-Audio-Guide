// kopia av info, tagit bort amenities

import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Navigation } from "react-native-navigation";

import { connect } from "react-redux";

import { translate } from "../i18n";

import DisclosureCell from "../components/disclosureCell";

import {
  NAV_BAR_TEXT,
  NAV_BAR_BACKGROUND,
  BOTTOM_PLAYER_HEIGHT
} from "../styles";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1
  },
  image: {
    resizeMode: "cover",
    flex: 1
  }
});

class Info extends Component {
  static get options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
        background: {
          color: NAV_BAR_BACKGROUND
        },
        title: {
          text: "Calendar",
          fontSize: 17,
          fontFamily: "Helvetica",
          color: NAV_BAR_TEXT
        }
      }
    };
  }

  render() {
    const width = Dimensions.get("window").width;

    let bottomOffset = 0;
    if (this.props.playerOpen) {
      bottomOffset += BOTTOM_PLAYER_HEIGHT;
    }

    return (
      <View style={[styles.container, { marginBottom: bottomOffset }]}>
        <Image
          accessible={true}
          accessibilityLabel={translate("museumScreen_ImageAccessibilityLabel")}
          accessibilityRole={"image"}
          style={[styles.image, { width }]}
          source={require("../assets/images/museumBackground.png")}
        />
        <View>
          <View>
            <DisclosureCell
              accessibility={{
                role: "button",
                label: translate("settingsScreen_Title")
              }}
              bottomBorder={true}
              title={translate("settingsScreen_Title")}
              onPress={() => {
                Navigation.push(this.props.componentId, {
                  component: { name: "settings" }
                });
              }}
            />

            <DisclosureCell
              accessibility={{
                role: "button",
                label: translate("museumScreen_ListItem1Label")
              }}
              bottomBorder={true}
              title={translate("museumScreen_ListItem1Label")}
              onPress={() => {
                Navigation.push(this.props.componentId, {
                  component: { name: "aboutMuseum" }
                });
              }}
            />
            <DisclosureCell
              accessibility={{
                role: "button",
                label: translate("aboutTheAppScreen_Title")
              }}
              bottomBorder={false}
              title={translate("aboutTheAppScreen_Title")}
              onPress={() => {
                Navigation.push(this.props.componentId, {
                  component: { name: "aboutApp" }
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerOpen: state.bottomPlayer.playerOpen
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true }
)(Info);
