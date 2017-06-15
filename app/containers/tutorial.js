
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TutorialScreen from '../components/tutorialScreen';

import {
  hideTutorial,
} from '../actions/tutorial';

import {
  switchLocale,
  switchLocaleFromTutorial,
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
        switchLocaleFromTutorial,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorialScreen);
