
import React, { Component, PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from 'react-native';

import TourStop from '../containers/tourStop';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import { TEAL, OFF_BLACK, TURQUOISE, LIGHT_GRAY } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  display: {
    flex: 0.3,
    width: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  digitDisplay: {
    width: 40,
    height: 40,
  },
  digitDisplayText: {
    color: OFF_BLACK,
    fontSize: 24,
    fontWeight: '600',
    borderBottomWidth: 5,
    borderBottomColor: 'white',
  },
  emptyDigit: {
    borderBottomWidth: 5,
    borderBottomColor: OFF_BLACK,
    width: 40,
    height: 40,
  },
  digitPad: {
    flex: 0.7,
    padding: 5,
  },
  digitRow: {
    flexDirection: 'row',
  },
  digit: {
    flex: 0.3,
    height: 60,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: TURQUOISE,
  },
  digitText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  nonDigit: {
    flex: 0.3,
    margin: 5,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    tintColor: TURQUOISE,
    height: 30,
    width: 40,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class SearchByNumberScreen extends Component {
  static title = '#';

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    playerOpen: PropTypes.bool.isRequired,
    digits: PropTypes.array.isRequired,
    screenReader: PropTypes.bool.isRequired,
    tourStops: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.shape({
      editDigits: PropTypes.func.isRequired,
    }).isRequired,
  }

  loadTourStop(digits) {
    let tourStop;
    this.props.tourStops.find((floor) => {
      return floor.stops.find((stop) => {
        const audioContent = stop.audioContent.find((audioClip) => {
          if (audioClip.title === digits.toString()) return true;
          return false;
        });
        if (audioContent !== undefined) {
          tourStop = stop;
          return true;
        }
        return false;
      });
    });

    if (tourStop !== undefined) {
      this.props.actions.editDigits([null, null, null]);
      this.props.navigator.push({
        title: tourStop.shortTitle,
        component: TourStop,
        barTintColor: '#ffffff',
        tintColor: TEAL,
        titleTextColor: OFF_BLACK,
        shadowHidden: true,
        navigationBarHidden: true,
        passProps: {
          tab: 'TAB_SEARCH',
          tourStop,
          intialTrack: digits.toString(),
          initialCategory: tourStop.initialAudio,
          imageURL: tourStop.imageURL,
        },
      });
    }
  }

  addDigit(digit) {
    const updatedDigits = [];
    let digitAdded = false;
    let digitIndex = 0;
    for (let i = 0; i < 3; i++) {
      if (this.props.digits[i] !== null) {
        updatedDigits[i] = this.props.digits[i];
      } else if (!digitAdded) {
        updatedDigits[i] = digit;
        digitAdded = true;
        digitIndex = i;
      } else {
        updatedDigits[i] = null;
      }
    }

    this.props.actions.editDigits(updatedDigits);

    if (digitIndex === 2) {
      this.loadTourStop(updatedDigits.join(''));
    }
  }

  deleteDigit() {
    const updatedDigits = [];
    let digitDeleted = false;
    for (let i = 2; i >= 0; i--) {
      if (this.props.digits[i] !== null && !digitDeleted) {
        updatedDigits[i] = null;
        digitDeleted = true;
      } else {
        updatedDigits[i] = this.props.digits[i];
      }
    }
    this.props.actions.editDigits(updatedDigits);
  }

  render() {
    const width = Dimensions.get('window').width;

    let containerMargin = BOTTOMBARHEIGHT;
    if (this.props.playerOpen) {
      containerMargin = BOTTOMPLAYERHEIGHT + BOTTOMBARHEIGHT;
    }

    return (
      <View style={[styles.container, { marginBottom: containerMargin }]}>
        <View style={styles.display}>
          {this.props.digits.map((digit, index) => {
            return (
              <View
                key={index}
                style={digit !== null ? styles.digitDisplay : styles.emptyDigit}
              >
                {digit !== null &&
                  <Text style={styles.digitDisplayText}>
                    {digit}
                  </Text>
                }
              </View>
            );
          })}
        </View>
        <View style={[styles.digitPad, { width }]}>
          <View style={styles.digitRow}>
            <TouchableOpacity
              onPress={() => { this.addDigit(1); }}
              style={styles.digit}
            >
              <Text style={styles.digitText}>
                1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.addDigit(2); }}
              style={styles.digit}
            >
              <Text style={styles.digitText}>
                2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.addDigit(3); }}
              style={styles.digit}
            >
              <Text style={styles.digitText}>
                3
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.digitRow}>
            <TouchableOpacity
              onPress={() => { this.addDigit(4); }}
              style={styles.digit}
            >
              <Text style={styles.digitText}>
                4
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.addDigit(5); }}
              style={styles.digit}
            >
              <Text style={styles.digitText}>
                5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.addDigit(6); }}
              style={styles.digit}
            >
              <Text style={styles.digitText}>
                6
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.digitRow}>
            <TouchableOpacity
              onPress={() => { this.addDigit(7); }}
              style={styles.digit}
            >
              <Text style={styles.digitText}>
                7
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.addDigit(8); }}
              style={styles.digit}
            >
              <Text style={styles.digitText}>
                8
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.addDigit(9); }}
              style={styles.digit}
            >
              <Text style={styles.digitText}>
                9
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.digitRow}>
            <View style={styles.nonDigit} />
            <TouchableOpacity
              onPress={() => { this.addDigit(0); }}
              style={styles.digit}
            >
              <Text style={styles.digitText}>
                0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.deleteDigit(); }}
              style={styles.nonDigit}
            >
              <Image
                source={require('../assets/DeleteButton.png')}
                style={styles.deleteButton}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default SearchByNumberScreen;
