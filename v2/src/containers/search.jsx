import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { editDigits as editDigitsAction } from '../actions/searchByNumber';

import {
  OFF_BLACK,
  SELECTED,
  NAV_BAR_BACKGROUND,
  NAV_BAR_TEXT,
} from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: NAV_BAR_BACKGROUND,
  },
  display: {
    flex: 0.15,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  displayRow: {
    width: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  digitDisplay: {
    width: 38,
    height: 60,
    paddingTop: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
  },
  digitDisplayText: {
    color: OFF_BLACK,
    fontSize: 34,
    fontWeight: '400',
    textAlign: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 5,
  },
  digitPad: {
    flex: 0.65,
    padding: 5,
    paddingTop: 35,
    alignItems: 'center',
  },
  digitRow: {
    flexDirection: 'row',
    height: 71,
  },
  digit: {
    height: 56,
    width: 56,
    borderRadius: 28,
    margin: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#808080',
    borderWidth: 1,
  },
  digitText: {
    color: '#333333',
    fontSize: 29,
  },
  nonDigit: {
    margin: 9,
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    height: 22,
    width: 33,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tryAgainText: {
    fontSize: 18,
    color: OFF_BLACK,
    textAlign: 'center',
  },
});

// In milliseconds:
const foundTransitionTime = 50;
const tryAgainMessageTime = 1000;

class Search extends Component {
  static title = '#';

  static propTypes = {
    // navigator: PropTypes.object.isRequired,
    playerOpen: PropTypes.bool.isRequired,
    // digits: PropTypes.array.isRequired,
    // screenReader: PropTypes.bool.isRequired,
    // tourStops: PropTypes.object.isRequired,
    // locale: PropTypes.string.isRequired,
    // actions: PropTypes.shape({
    //   editDigits: PropTypes.func.isRequired,
    // }).isRequired,
  };

  UNSAFE_componentWillMount() {
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
      `audioContent.title = '${digits.toString()}'`,
    );

    let tourStop;
    if (foundTourStops.length > 0) {
      if (foundTourStops.length > 1) {
        // If two exist then favor the nonhighlighted one. Only the highlight audio content has an assigned region.
        foundTourStops = foundTourStops.filtered('audioContent.regions = null');
      }

      tourStop = foundTourStops[0];
    }

    const code = digits.toString();
    const tourStopExists = tourStop != null;

    analyticsTrackCodeSearched(code, tourStopExists);

    if (tourStopExists) {
      // const searchedByNumber = code;
      // const searchedTrackIndex = tourStop.audioContent.findIndex(content => {
      //   return content.audioURL === searchedByNumber;
      // });
      // const searchedTrack = tourStop.audioContent[searchedTrackIndex];
      // setTimeout(() => {
      //   // this.props.navigator.push({
      //   //   title: tourStop.shortTitle,
      //   //   component: TourStopScreen,
      //   //   barTintColor: '#ffffff',
      //   //   titleTextColor: OFF_BLACK,
      //   //   shadowHidden: true,
      //   //   navigationBarHidden: true,
      //   //   passProps: {
      //   //     tab: 'TAB_SEARCH',
      //   //     tourStop,
      //   //     floor: tourStop.floor,
      //   //     duration: tourStop.duration[this.props.locale],
      //   //     searchedTrack,
      //   //     searchedTrackIndex,
      //   //     initialCategory: tourStop.initialAudio,
      //   //     imageURL: tourStop.imageURL,
      //   //   },
      //   });
      //   // HACKY!
      //   // Because who knows how long the transition will take?
      //   setTimeout(() => {
      //     this.props.actions.editDigits([null, null, null]);
      //   }, tryAgainMessageTime);
      // }, foundTransitionTime);
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

  static get options() {
    return {
      topBar: {
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        title: {
          text: 'Search #',
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
      },
    };
  }

  render() {
    const { width, height } = Dimensions.get('window');

    const screenTitle = this.state.numberNotFound
      ? 'tryAgain'
      : 'searchScreen_Title';
    return (
      <View
        style={[
          styles.container,
          height < 570 ? { paddingTop: 30 } : { paddingTop: 50 },
          this.props.playerOpen && height < 570 ? { paddingTop: 25 } : {},
        ]}>
        <View
          style={[styles.display, this.props.playerOpen ? { flex: 0.15 } : {}]}>
          <View
            style={[styles.displayRow]}
            //I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {}
          >
            {this.props.digits.map((digit, index) => {
              return (
                <View key={index} style={styles.digitDisplay}>
                  {digit !== null && (
                    <Text style={styles.digitDisplayText}>{digit}</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={[
            styles.digitPad,
            { width },
            this.props.playerOpen && height < 570 ? { paddingTop: 5 } : {},
          ]}>
          <View
            // style={[styles.digitRow, I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {}]}
            style={styles.digitRow}>
            <TouchableHighlight
              underlayColor={SELECTED}
              onPress={() => {
                this.addDigit(1);
              }}
              style={styles.digit}>
              <Text style={styles.digitText}>1</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={SELECTED}
              onPress={() => {
                this.addDigit(2);
              }}
              style={styles.digit}>
              <Text style={styles.digitText}>2</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={SELECTED}
              onPress={() => {
                this.addDigit(3);
              }}
              style={styles.digit}>
              <Text style={styles.digitText}>3</Text>
            </TouchableHighlight>
          </View>
          <View
            // style={[styles.digitRow, I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {}]}
            style={styles.digitRow}>
            <TouchableHighlight
              underlayColor={SELECTED}
              onPress={() => {
                this.addDigit(4);
              }}
              style={styles.digit}>
              <Text style={styles.digitText}>4</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={SELECTED}
              onPress={() => {
                this.addDigit(5);
              }}
              style={styles.digit}>
              <Text style={styles.digitText}>5</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={SELECTED}
              onPress={() => {
                this.addDigit(6);
              }}
              style={styles.digit}>
              <Text style={styles.digitText}>6</Text>
            </TouchableHighlight>
          </View>
          <View
            // style={[styles.digitRow, I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {}]}
            style={styles.digitRow}>
            <TouchableHighlight
              underlayColor={SELECTED}
              onPress={() => {
                this.addDigit(7);
              }}
              style={styles.digit}>
              <Text style={styles.digitText}>7</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={SELECTED}
              onPress={() => {
                this.addDigit(8);
              }}
              style={styles.digit}>
              <Text style={styles.digitText}>8</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={SELECTED}
              onPress={() => {
                this.addDigit(9);
              }}
              style={styles.digit}>
              <Text style={styles.digitText}>9</Text>
            </TouchableHighlight>
          </View>
          <View
            // style={[styles.digitRow, I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {}]}
            style={styles.digitRow}>
            <View style={styles.nonDigit} />
            <TouchableHighlight
              underlayColor={SELECTED}
              onPress={() => {
                this.addDigit(0);
              }}
              style={styles.digit}>
              <Text style={styles.digitText}>0</Text>
            </TouchableHighlight>
            <TouchableOpacity
              onPress={() => {
                this.deleteDigit();
              }}
              style={styles.nonDigit}>
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

const mapStateToProps = state => {
  return {
    playerOpen: state.bottomPlayer.playerOpen,
    digits: [null, null, null],
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      editDigits: editDigitsAction,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
