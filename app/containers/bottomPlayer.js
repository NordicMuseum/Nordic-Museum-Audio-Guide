
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BottomPlayer from '../components/bottomPlayer';

import {
  togglePausePlay,
  cycleAudioSpeed,
  rewindAudio,
  unloadAudio,
  replayAudio,
  playAudio,
  playTrack,
} from '../actions/audio';

const mapStateToProps = (state) => {
  return {
    tourStop: state.bottomPlayer.tourStop,
    stopUUID: state.bottomPlayer.stopUUID,
    stopTitle: state.bottomPlayer.stopTitle,
    currentUUID: state.bottomPlayer.uuid,
    index: state.bottomPlayer.index,
    prevUUID: state.bottomPlayer.prevUUID,
    nextUUID: state.bottomPlayer.nextUUID,
    playRate: state.bottomPlayer.playRate,
    playerStatus: state.bottomPlayer.playerStatus,
    time: state.bottomPlayer.time,
    duration: state.bottomPlayer.duration,
    audioTitle: state.bottomPlayer.title,
    audioContent: state.bottomPlayer.audioContent,
    timerActive: state.bottomPlayer.timerActive,
    timerStartAt: state.bottomPlayer.timerStartAt,
    timerNumber: state.bottomPlayer.timerNumber,
    autoplayOn: state.bottomPlayer.autoplayOn,
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        togglePausePlay,
        rewindAudio,
        cycleAudioSpeed,
        unloadAudio,
        replayAudio,
        playAudio,
        playTrack,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomPlayer);
