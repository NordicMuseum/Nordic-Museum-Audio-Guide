import React, {Component} from 'react';

import {StyleSheet, View, Text, Dimensions, Button} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {hideBottomPlayer as hideBottomPlayerAction} from '../actions/bottomPlayer';

import {BOTTOM_BAR_HEIGHT} from '../styles';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  positionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: BOTTOM_BAR_HEIGHT,
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
  render() {
    if (this.props.show === false) {
      return null;
    }

    return (
      <View style={styles.positionContainer}>
        <View style={styles.contentContainer}>
          <Button
            onPress={() => {
              const {hideBottomPlayer} = this.props.actions;
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
    show: state.bottomPlayer.show,
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
)(BottomPlayer);
