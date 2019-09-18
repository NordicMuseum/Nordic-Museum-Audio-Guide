import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { connect } from 'react-redux';

import { translate } from '../i18n';

import DisclosureCell, {
  DISCLOSURE_CELL_HEIGHT,
} from '../components/disclosureCell';

import {
  NAV_BAR_TEXT,
  NAV_BAR_BACKGROUND,
  BOTTOM_PLAYER_HEIGHT,
  getBottomTabsHeight,
} from '../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
    backgroundColor: 'red',
  },
  list: {
    backgroundColor: 'red',
  },
});

class Info extends Component {
  static get options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        title: {
          text: translate('museumScreen_Title'),
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
      },
    };
  }

  render() {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    let bottomOffset = getBottomTabsHeight();
    if (this.props.playerOpen) {
      bottomOffset += BOTTOM_PLAYER_HEIGHT;
    }

    const listHeight = DISCLOSURE_CELL_HEIGHT * 4;
    const imageHeight = height - (listHeight + bottomOffset);

    return (
      <View style={[styles.container, { marginBottom: bottomOffset }]}>
        <View style={{ height: imageHeight }}>
          <Image
            accessible={true}
            accessibilityLabel={translate(
              'museumScreen_ImageAccessibilityLabel',
            )}
            accessibilityTraits={'image'}
            style={[
              styles.image,
              { width, height: imageHeight, backgroundColor: 'red' },
            ]}
            source={require('../assets/images/museumBackground.png')}
          />
        </View>
        <View style={[styles.list, { width }]}>
          <View>
            <DisclosureCell
              accessibility={{
                traits: ['button'],
                label: translate('settingsScreen_Title'),
              }}
              bottomBorder={true}
              title={translate('settingsScreen_Title')}
              onPress={() => {
                Navigation.push(this.props.componentId, {
                  component: { name: 'settings' },
                });
              }}
            />

            <DisclosureCell
              accessibility={{
                traits: ['button'],
                label: translate('amenitiesScreen_Title'),
              }}
              bottomBorder={true}
              title={translate('amenitiesScreen_Title')}
              onPress={() => {
                Navigation.push(this.props.componentId, {
                  component: { name: 'amenities' },
                });
              }}
            />

            <DisclosureCell
              accessibility={{
                traits: ['button'],
                label: translate('museumScreen_ListItem1Label'),
              }}
              bottomBorder={true}
              title={translate('museumScreen_ListItem1Label')}
              onPress={() => {
                Navigation.push(this.props.componentId, {
                  component: { name: 'aboutMuseum' },
                });
              }}
            />
            <DisclosureCell
              accessibility={{
                traits: ['button'],
                label: translate('aboutTheAppScreen_Title'),
              }}
              bottomBorder={false}
              title={translate('aboutTheAppScreen_Title')}
              onPress={() => {
                Navigation.push(this.props.componentId, {
                  component: { name: 'aboutApp' },
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
    playerOpen: state.bottomPlayer.playerOpen,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true },
)(Info);
