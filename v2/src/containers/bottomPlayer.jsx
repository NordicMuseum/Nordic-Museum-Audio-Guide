import React, { Component } from 'react';

import { StyleSheet, View, Text, Dimensions, Button } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { hideBottomPlayer as hideBottomPlayerAction } from '../actions/bottomPlayer';

import { BOTTOM_PLAYER_HEIGHT, getBottomTabsHeight } from '../styles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  positionContainer: {
    position: 'absolute',
    left: 0,
    height: BOTTOM_PLAYER_HEIGHT,
    width,
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F',
  },
});

class BottomPlayer extends Component {
  static get options() {
    return {
      overlay: {
        interceptTouchOutside: false,
      },
    };
  }

  render() {
    if (this.props.playerOpen === false) {
      return null;
    }

    return (
      <View
        style={[styles.positionContainer, { bottom: getBottomTabsHeight() }]}>
        <View style={styles.contentContainer}>
          <Button
            onPress={() => {
              const { hideBottomPlayer } = this.props.actions;
              hideBottomPlayer();
            }}
            title="Hide Bottom Player"
            color="#fff"
            accessibilityLabel="Hide Bottom Player"
          />
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      hideBottomPlayer: hideBottomPlayerAction,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true },
)(BottomPlayer);
