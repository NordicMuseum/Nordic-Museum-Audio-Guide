
import React, { Component, PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import DisclosureCell from './disclosureCell';
import AmenitiesScreen from '../containers/amenities';
import AboutScreen from './aboutScreen';
import SettingsScreen from '../containers/settings';
import CreditsScreen from './creditsScreen';
import AccessibilityScreen from './accessibilityScreen';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import { OFF_BLACK, TEAL, LIGHT_GRAY } from '../styles';

const styles = StyleSheet.create({
  container: {
    marginBottom: BOTTOMBARHEIGHT,
    alignItems: 'stretch',
    flex: 1,
  },
  header: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  list: {
    position: 'absolute',
    flex: 0,
    flexDirection: 'column',
  },
  statusBar: {
    height: 20,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

class MuseumScreen extends Component {
  static title = I18n.t('museumScreen_Title');

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    playerOpen: PropTypes.bool.isRequired,
    screenReader: PropTypes.bool.isRequired,
  }

  render() {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    let bottomOffset = BOTTOMBARHEIGHT;
    if (this.props.playerOpen) {
      bottomOffset += BOTTOMPLAYERHEIGHT;
    }

    return (
      <View style={[styles.container]}>
        <View style={styles.header}>
          <Image
            accessible={true}
            accessibilityLabel={I18n.t('museumScreen_ImageAccessibilityLabel')}
            accessibilityTraits={'image'}
            resizeMode={'cover'}
            style={[styles.image, { width, height }]}
            source={{ uri: 'museumBackground.png' }}
          />
        </View>
        <View
          style={[styles.list, { width, bottom: bottomOffset }]}
        >
          <View>
            <DisclosureCell
              accessibility={{
                traits: ['button'],
                label: I18n.t('museumScreen_ListItem1Label'),
              }}
              bottomBorder={true}
              title={I18n.t('museumScreen_ListItem1Label')}
              onPress={() => {
                this.props.navigator.push({
                  title: I18n.t('aboutScreen_Title'),
                  component: AboutScreen,
                  barTintColor: '#ffffff',
                  tintColor: TEAL,
                  titleTextColor: OFF_BLACK,
                  shadowHidden: true,
                  navigationBarHidden: true,
                  passProps: {
                    navigator: this.props.navigator,
                  },
                });
              }}
            />
            <DisclosureCell
              accessibility={{
                traits: ['button'],
                label: I18n.t('museumScreen_ListItem2Label'),
              }}
              bottomBorder={true}
              title={I18n.t('museumScreen_ListItem2Label')}
              onPress={() => {
                this.props.navigator.push({
                  title: I18n.t('accessibilityScreen_Title'),
                  component: AccessibilityScreen,
                  barTintColor: '#ffffff',
                  tintColor: TEAL,
                  titleTextColor: OFF_BLACK,
                  shadowHidden: true,
                  navigationBarHidden: true,
                  passProps: {
                    navigator: this.props.navigator,
                  },
                });
              }}
            />
            <DisclosureCell
              accessibility={{
                traits: ['button'],
                label: I18n.t('museumScreen_ListItem3Label'),
              }}
              bottomBorder={true}
              title={I18n.t('museumScreen_ListItem3Label')}
              onPress={() => {
                this.props.navigator.push({
                  title: I18n.t('amenitiesScreen_Title'),
                  component: AmenitiesScreen,
                  barTintColor: '#ffffff',
                  tintColor: TEAL,
                  titleTextColor: OFF_BLACK,
                  shadowHidden: true,
                  navigationBarHidden: true,
                  passProps: {
                    navigator: this.props.navigator,
                  },
                });
              }}
            />
            <DisclosureCell
              accessibility={{
                traits: ['button'],
                label: I18n.t('museumScreen_ListItem4Label'),
              }}
              bottomBorder={true}
              title={I18n.t('museumScreen_ListItem4Label')}
              onPress={() => {
                this.props.navigator.push({
                  title: I18n.t('settingsScreen_Title'),
                  component: SettingsScreen,
                  barTintColor: '#ffffff',
                  tintColor: TEAL,
                  titleTextColor: OFF_BLACK,
                  shadowHidden: true,
                  navigationBarHidden: true,
                  passProps: {
                    navigator: this.props.navigator,
                  },
                });
              }}
            />
            <DisclosureCell
              accessibility={{
                traits: ['button'],
                label: I18n.t('museumScreen_ListItem5Label'),
              }}
              bottomBorder={false}
              title={I18n.t('museumScreen_ListItem5Label')}
              onPress={() => {
                this.props.navigator.push({
                  title: I18n.t('creditsScreen_Title'),
                  component: CreditsScreen,
                  barTintColor: '#ffffff',
                  tintColor: TEAL,
                  titleTextColor: OFF_BLACK,
                  shadowHidden: true,
                  navigationBarHidden: true,
                  passProps: {
                    navigator: this.props.navigator,
                  },
                });
              }}
            />
          </View>
        </View>
        <View
          style={[styles.statusBar,
            {
              width,
              backgroundColor: LIGHT_GRAY,
            },
          ]}
        />
      </View>
    );
  }
}


export default MuseumScreen;
