
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NearMeScreen from '../components/nearMeScreen';

import {
  togglePausePlay,
  playTrack,
} from '../actions/audio';

const mapStateToProps = (state) => {
  return {
    playerOpen: state.bottomPlayer.playerOpen,

    closeTourStops: state.closeTourStops.tourStops,
    audioContent: state.closeTourStops.audioContent,

    regions: state.closeTourStops.regions,
    floor: state.closeTourStops.detectedFloor,
    amenities: ((state.closeTourStops.detectedFloor === null) ? [] : state.amenities.allAmenities[state.closeTourStops.detectedFloor].amenities),
    activeTab: state.nav.activeTab,
    screenReader: state.accessibility.screenReader,
    playerStatus: state.bottomPlayer.playerStatus,
    timerActive: state.bottomPlayer.timerActive,
    currentStopUUID: state.bottomPlayer.stopUUID,
    atNearMeRoot: state.nav.atNearMeRoot,
    tracking: state.beacon.tracking,
    bluetoothOn: state.beacon.bluetoothOn,
    locationServicesStatus: state.beacon.locationServicesStatus,
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        togglePausePlay,
        playTrack,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NearMeScreen);
