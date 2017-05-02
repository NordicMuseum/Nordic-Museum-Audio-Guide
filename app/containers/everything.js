import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EverythingScreen from '../components/everythingScreen';

import {
  toggleStopsExpanded,
} from '../actions/filteredTourStops';

const mapStateToProps = (state) => {
  return {
    playerOpen: state.bottomPlayer.playerOpen,
    tourStops: state.filteredTourStops.tourStops,
    currentStopUUID: state.bottomPlayer.stopUUID,
    screenReader: state.accessibility.screenReader,
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        toggleStopsExpanded,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EverythingScreen);
