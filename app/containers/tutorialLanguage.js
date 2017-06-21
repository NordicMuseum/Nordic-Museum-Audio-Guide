import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TutorialLanguagePage from '../components/tutorialLanguagePage';

import { hideTutorial } from '../actions/tutorial';

import { switchLocale } from '../actions/localization';

const mapStateToProps = state => {
  return {
    locale: state.localization.locale,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        hideTutorial,
        switchLocale,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorialLanguagePage);
