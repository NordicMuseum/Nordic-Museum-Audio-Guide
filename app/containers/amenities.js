
import { connect } from 'react-redux';

import AmenitiesScreen from '../components/amenitiesScreen';

const mapStateToProps = (state) => {
  return {
    playerOpen: state.bottomPlayer.playerOpen,
    allAmenities: state.amenities.allAmenities,
    screenReader: state.accessibility.screenReader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmenitiesScreen);
