
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TourStopScreen from '../components/tourStopScreen';
import {
  togglePausePlay,
  playTrack,
  unloadAudio,
} from '../actions/audio';

import {
  updateNearMeRootStatus,
} from '../actions/navigation';

const mapStateToProps = (state) => {
  return {
    currentAudio: state.bottomPlayer.uuid,
    currentAudioTime: state.bottomPlayer.time,
    screenReader: state.accessibility.screenReader,
    playerStatus: state.bottomPlayer.playerStatus,
    playerOpen: state.bottomPlayer.playerOpen,
    autoplayOn: state.bottomPlayer.autoplayOn,
    autoplayInitial: state.bottomPlayer.autoplayInitial,
    currentStopUUID: state.bottomPlayer.stopUUID,
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        playTrack,
        unloadAudio,
        togglePausePlay,
        updateNearMeRootStatus,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TourStopScreen);
