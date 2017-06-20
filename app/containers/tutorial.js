
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TutorialScreen from '../components/tutorialScreen';

import {
  hideTutorial,
} from '../actions/tutorial';

import {
  switchLocale,
} from '../actions/localization';

const mapStateToProps = (state) => {
  return {
    tutorialHidden: state.tutorial.tutorialHidden,
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        hideTutorial,
        switchLocale,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorialScreen);
