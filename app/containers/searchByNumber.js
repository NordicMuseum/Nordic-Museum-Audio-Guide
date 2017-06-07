import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchByNumberScreen from '../components/searchByNumberScreen';

import {
  editDigits,
} from '../actions/searchByNumber';

const mapStateToProps = (state) => {
  return {
    digits: state.searchByNumber.digits,
    playerOpen: state.bottomPlayer.playerOpen,
    screenReader: state.accessibility.screenReader,
    tourStops: state.allTourStops.tourStops,
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        editDigits,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchByNumberScreen);
