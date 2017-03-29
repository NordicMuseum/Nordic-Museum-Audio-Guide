
import { connect } from 'react-redux';

import MuseumScreen from '../components/museumScreen';

const mapStateToProps = (state) => {
  return {
    playerOpen: state.bottomPlayer.playerOpen,
    screenReader: state.accessibility.screenReader,
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MuseumScreen);
