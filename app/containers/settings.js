
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SettingsScreen from '../components/settingsScreen';

import {
  toggleAutoplay,
  toggleAutoplayInitial,
} from '../actions/audio';

import {
  switchLocale,
} from '../actions/localization';

const mapStateToProps = (state) => {
  return {
    timerActive: state.bottomPlayer.timerActive,
    autoplayOn: state.bottomPlayer.autoplayOn,
    autoplayInitial: state.bottomPlayer.autoplayInitial,
    bluetoothOn: state.beacon.bluetoothOn,
    locationServicesStatus: state.beacon.locationServicesStatus,
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        toggleAutoplay,
        toggleAutoplayInitial,
        switchLocale,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
