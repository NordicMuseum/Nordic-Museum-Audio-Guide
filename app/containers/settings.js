
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SettingsScreen from '../components/settingsScreen';

import {
  switchLocale,
} from '../actions/localization';

const mapStateToProps = (state) => {
  return {
    playerOpen: state.bottomPlayer.playerOpen,
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        switchLocale,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
