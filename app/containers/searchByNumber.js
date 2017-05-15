import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchByNumberScreen from '../components/searchByNumberScreen';

import {
  showFloor,
} from '../actions/amenities';

const mapStateToProps = (state) => {
  return {
    playerOpen: state.bottomPlayer.playerOpen,
    allAmenities: state.amenities.allAmenities,
    currentFloor: state.amenities.currentFloor,
    screenReader: state.accessibility.screenReader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        showFloor,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchByNumberScreen);
