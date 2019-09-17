import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {Navigation} from 'react-native-navigation';

// Placeholder for the translate function
var I18n = {};
I18n.t = function(t) {
  return t;
};

import DisclosureCell, {
  DISCLOSURE_CELL_HEIGHT,
} from '../components/disclosureCell';
import {
  NAV_BAR_TEXT,
  NAV_BAR_BACKGROUND,
  OFF_BLACK,
  BOTTOM_BAR_HEIGHT,
} from '../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
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
  static options(passProps) {
    return {
      topBar: {
        visible: false,
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        title: {
          text: I18n.t('museumScreen_Title'),
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

    let bottomOffset = BOTTOM_BAR_HEIGHT;
    // if (this.props.playerOpen) {
    //   bottomOffset += BOTTOMPLAYERHEIGHT;
    // }

    const listHeight = DISCLOSURE_CELL_HEIGHT * 4;
    const imageHeight = height - (listHeight + bottomOffset);

    return (
      <View style={[styles.container, {marginBottom: bottomOffset}]}>
        <View style={{height: imageHeight}}>
          <Image
            accessible={true}
            accessibilityLabel={I18n.t('museumScreen_ImageAccessibilityLabel')}
            accessibilityTraits={'image'}
            style={[
              styles.image,
              {width, height: imageHeight, backgroundColor: 'red'},
            ]}
            source={require('../assets/images/museumBackground.png')}
          />
        </View>
        <View style={[styles.list, {width}]}>
          <View>
            <DisclosureCell
              accessibility={{
                traits: ['button'],
                label: I18n.t('settingsScreen_Title'),
              }}
              bottomBorder={true}
              title={I18n.t('settingsScreen_Title')}
              onPress={() => {
                //  analyticsTrackScreen('Language');
                Navigation.push(this.props.componentId, {
                  component: {name: 'settings'},
                });
              }}
            />

            <DisclosureCell
              accessibility={{
                traits: ['button'],
                label: I18n.t('amenitiesScreen_Title'),
              }}
              bottomBorder={true}
              title={I18n.t('amenitiesScreen_Title')}
              onPress={() => {
                // analyticsTrackScreen('Amenities');

                Navigation.push(this.props.componentId, {
                  component: {name: 'amenities'},
                });
              }}
            />

            <DisclosureCell
              accessibility={{
                traits: ['button'],
                label: I18n.t('museumScreen_ListItem1Label'),
              }}
              bottomBorder={true}
              title={I18n.t('museumScreen_ListItem1Label')}
              onPress={() => {
                // analyticsTrackScreen('About The Nordic Museum');
                Navigation.push(this.props.componentId, {
                  component: {name: 'aboutMuseum'},
                });
              }}
            />
            <DisclosureCell
              accessibility={{
                traits: ['button'],
                label: I18n.t('aboutTheAppScreen_Title'),
              }}
              bottomBorder={false}
              title={I18n.t('aboutTheAppScreen_Title')}
              onPress={() => {
                // analyticsTrackScreen('About the App');
                // analyticsTrackScreen('About The Nordic Museum');
                Navigation.push(this.props.componentId, {
                  component: {name: 'aboutApp'},
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Info;
