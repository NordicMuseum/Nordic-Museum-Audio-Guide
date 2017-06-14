
import React, { Component, PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  I18nManager,
} from 'react-native';

import TourStopScreen from '../containers/tourStop';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import { OFF_BLACK, ACTION } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  display: {
    flex: 0.3,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  displayRow: {
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
    fontSize: 36,
    fontWeight: '600',
    borderBottomWidth: 5,
    textAlign: 'center',
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
    alignItems: 'center',
  },
  digitRow: {
    flexDirection: 'row',
  },
  digit: {
    height: 60,
    width: 60,
    borderRadius: 30,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ACTION,
  },
  digitText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  nonDigit: {
    margin: 10,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    tintColor: ACTION,
    height: 30,
    width: 40,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tryAgainMessage: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    width: 200,
  },
  tryAgainText: {
    fontSize: 20,
    color: OFF_BLACK,
    textAlign: 'center',
  },
});

// In milliseconds:
const foundTransitionTime = 50;
const tryAgainMessageTime = 1000;

class SearchByNumberScreen extends Component {
  static title = '#';

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    playerOpen: PropTypes.bool.isRequired,
    digits: PropTypes.array.isRequired,
    screenReader: PropTypes.bool.isRequired,
    tourStops: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      editDigits: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentWillMount() {
    this.props.actions.editDigits([null, null, null]);
    this.setState({
      numberNotFound: false,
      tryAgainMessage: null,
    });
  }

  componentWillUnmount() {
    if (this.state.tryAgainMessage) {
      clearTimeout(this.state.tryAgainMessage);
      this.setState({ tryAgainMessage: null });
    }
  }

  loadTourStop(digits, tourStops) {
    let foundTourStops = tourStops.filtered(
      `audioContent.title = '${digits.toString()}'`
    );

    let tourStop;
    if (foundTourStops.length > 0) {
      if (foundTourStops.length > 1) {
        // If two exist then favor the nonhighlighted one
        foundTourStops = foundTourStops.filtered('audioContent.regions = null');
      }

      tourStop = foundTourStops[0];
    }

    if (tourStop) {
      setTimeout(() => {
        this.props.navigator.push({
          title: tourStop.shortTitle,
          component: TourStopScreen,
          barTintColor: '#ffffff',
          titleTextColor: OFF_BLACK,
          shadowHidden: true,
          navigationBarHidden: true,
          passProps: {
            tab: 'TAB_SEARCH',
            tourStop,
            floor: tourStop.floor,
            duration: tourStop.duration[this.props.locale],
            searchedByNumber: digits.toString(),
            initialCategory: tourStop.initialAudio,
            imageURL: tourStop.imageURL,
          },
        });

        // HACKY!
        // Because who knows how long the transition will take?
        setTimeout(() => {
          this.props.actions.editDigits([null, null, null]);
        }, tryAgainMessageTime);
      }, foundTransitionTime);
    } else {
      const tryAgainMessage = setTimeout(() => {
        this.setState({
          numberNotFound: false,
          tryAgainMessage: null,
        });
        this.props.actions.editDigits([null, null, null]);
      }, tryAgainMessageTime);
      this.setState({
        numberNotFound: true,
        tryAgainMessage,
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
      this.loadTourStop(updatedDigits.join(''), this.props.tourStops);
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

    return (<View style={[styles.container, { marginBottom: containerMargin }]}>
      <View style={styles.display}>
        <View
          style={[
            styles.displayRow,
            I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {},
          ]}
        >
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
        {this.state.numberNotFound &&
          <View style={styles.tryAgainMessage}>
            <Text style={styles.tryAgainText}>
              {I18n.t('tryAgain')}
            </Text>
          </View>
        }
      </View>
      <View style={[styles.digitPad, { width }]}>
        <View
          style={[
            styles.digitRow,
            I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {},
          ]}
        >
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
        <View
          style={[
            styles.digitRow,
            I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {},
          ]}
        >
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
        <View
          style={[
            styles.digitRow,
            I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {},
          ]}
        >
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
        <View
          style={[
            styles.digitRow,
            I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {},
          ]}
        >
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
    </View>);
  }
}

export default SearchByNumberScreen;
