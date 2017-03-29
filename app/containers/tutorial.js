
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TutorialScreen from '../components/tutorialScreen';

import {
  toggleAutoplay,
} from '../actions/audio';

import {
  tutorialPageDidChange,
  hideTutorial,
} from '../actions/tutorial';

import {
  switchLocale,
} from '../actions/localization';

const mapStateToProps = (state) => {
  return {
    timerActive: state.bottomPlayer.timerActive,
    autoplayOn: state.bottomPlayer.autoplayOn,
    bluetoothOn: state.beacon.bluetoothOn,
    locationServicesStatus: state.beacon.locationServicesStatus,
    currentPage: state.tutorial.currentPage,
    tutorialHidden: state.tutorial.tutorialHidden,
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        toggleAutoplay,
        tutorialPageDidChange,
        hideTutorial,
        switchLocale,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorialScreen);
