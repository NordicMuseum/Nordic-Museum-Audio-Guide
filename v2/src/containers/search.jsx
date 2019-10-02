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

import { Navigation } from 'react-native-navigation';

import { translate, isRTL } from '../i18n';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addDigit, deleteDigit, resetDigits } from '../actions/searchByNumber';

import {
  OFF_BLACK,
  SELECTED,
  NAV_BAR_BACKGROUND,
  NAV_BAR_TEXT,
  BOTTOM_PLAYER_HEIGHT,
} from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  display: {
    flex: 0.18,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  displayRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  digitDisplay: {
    width: 38,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
    justifyContent: 'flex-end',
  },
  digitDisplayText: {
    color: OFF_BLACK,
    fontSize: 34,
    fontWeight: '400',
    textAlign: 'center',
    padding: 5,
  },
  digitPad: {
    flex: 0.82,
    padding: 10,
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
});

// In milliseconds:
const foundTransitionTime = 50;
const tryAgainMessageTime = 1000;

const pushToTourStop = (componentId, passedProps) => {
  Navigation.push(componentId, {
    component: {
      name: 'tourStop',
      passProps: passedProps,
      options: {
        topBar: { visible: false },
      },
    },
  });
};

class Search extends Component {
  static propTypes = {
    playerOpen: PropTypes.bool.isRequired,
    digits: PropTypes.array.isRequired,
    tourStops: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      addDigit: PropTypes.func.isRequired,
      deleteDigit: PropTypes.func.isRequired,
      resetDigits: PropTypes.func.isRequired,
    }).isRequired,
  };

  static get options() {
    return {
      topBar: {
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        title: {
          text: translate('searchScreen_Title'),
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
        noBorder: true,
      },
    };
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    this.props.actions.resetDigits();
  }

  componentDidDisappear() {
    this.props.actions.resetDigits();
  }

  addDigit(digit) {
    // Prevents firing add digit action between completed search code and tour stop screen push
    if (
      this.props.digits.filter(d => {
        return d === null;
      }).length !== 0
    ) {
      this.props.actions.addDigit(this.props.digits, digit);
    }
  }

  loadTourStop(digits, tourStops) {
    let foundTourStops = tourStops.filtered(
      `audioContent.id = '${digits.toString()}'`,
    );

    let tourStop;
    if (foundTourStops.length > 0) {
      if (foundTourStops.length > 1) {
        // If two exist then favor the nonhighlighted one. Only the highlight audio content has an assigned region.
        foundTourStops = foundTourStops.filtered('audioContent.region = null');
      }
      tourStop = foundTourStops[0];
    }

    const code = digits.toString();
    const tourStopExists = tourStop != null;

    // analyticsTrackCodeSearched(code, tourStopExists);
    if (tourStopExists) {
      const searchedByNumber = code;
      const searchedTrackIndex = tourStop.audioContent.findIndex(content => {
        return content.id === searchedByNumber;
      });
      const searchedTrack = tourStop.audioContent[searchedTrackIndex];

      setTimeout(() => {
        const passedProps = {
          searchedTrack,
          tourStop,
          searchedTrackIndex,
        };
        pushToTourStop(this.props.componentId, passedProps);
      }, foundTransitionTime);
    } else {
      this.setScreenTitle('tryAgain');
      const tryAgainMessage = setTimeout(() => {
        this.setScreenTitle('searchScreen_Title');
        this.props.actions.resetDigits();
      }, tryAgainMessageTime);
    }
  }

  setScreenTitle(title) {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: translate(title),
        },
      },
    });
  }

  render() {
    const { width, height } = Dimensions.get('window');

    let bottomOffset = 0;
    if (this.props.playerOpen) {
      bottomOffset += BOTTOM_PLAYER_HEIGHT;
    }

    if (
      this.props.digits.filter(d => {
        return d === null;
      }).length === 0
    ) {
      this.loadTourStop(this.props.digits.join(''), this.props.tourStops);
    }

    return (
      <View style={[styles.container, { marginBottom: bottomOffset }]}>
        <View style={{ flex: 1, maxHeight: 500 }}>
          <View style={[styles.display]}>
            <View
              style={[
                styles.displayRow,
                { width: 50 * this.props.digits.length },
                // isRTL ? { flexDirection: 'row-reverse' } : {}
              ]}>
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
              style={[
                styles.digitRow,
                // isRTL ? { flexDirection: 'row-reverse' } : {}
              ]}>
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
              style={[
                styles.digitRow,
                // isRTL ? { flexDirection: 'row-reverse' } : {}
              ]}>
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
              style={[
                styles.digitRow,
                // isRTL ? { flexDirection: 'row-reverse' } : {}
              ]}>
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
              style={[
                styles.digitRow,
                // isRTL ? { flexDirection: 'row-reverse' } : {}
              ]}>
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
                  this.props.actions.deleteDigit(this.props.digits);
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
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerOpen: state.bottomPlayer.playerOpen,
    digits: state.searchByNumber.digits,
    tourStops: state.allTourStops.tourStops,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      resetDigits: resetDigits,
      addDigit: addDigit,
      deleteDigit: deleteDigit,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true },
)(Search);
