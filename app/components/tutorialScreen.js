
import React, { PropTypes, Component } from 'react';

import {
  View,
  StyleSheet,
  Modal,
  NavigatorIOS,
} from 'react-native';

import TutorialLanguagePage from './tutorialLanguagePage';

import { OFF_BLACK, LIGHT_GRAY } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: LIGHT_GRAY,
  },
});

class TutorialScreen extends Component {
  static propTypes = {
    tutorialHidden: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      hideTutorial: PropTypes.func.isRequired,
      switchLocale: PropTypes.func.isRequired,
      switchLocaleFromTutorial: PropTypes.func.isRequired,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
    };

    this.hideModal = this.hideModal.bind(this);
  }

  hideModal() {
    this.setState({
      modalVisible: false,
    });

    this.props.actions.hideTutorial();
  }

  render() {
    const {
      tutorialHidden,
      locale,
    } = this.props;

    const {
      switchLocale,
      switchLocaleFromTutorial,
    } = this.props.actions;

    if (tutorialHidden) {
      return null;
    }

    return (
      <Modal
        style={styles.container}
        animationType={'slide'}
        visible={this.state.modalVisible}
      >
        <View style={styles.statusBar} />
        <NavigatorIOS
          style={[styles.container]}
          initialRoute={{
            title: '',
            component: TutorialLanguagePage,
            navigationBarHidden: true,
            barTintColor: '#ffffff',
            titleTextColor: OFF_BLACK,
            shadowHidden: true,
            passProps: {
              locale,
              actions: {
                switchLocale,
                switchLocaleFromTutorial,
                hideTutorial: this.hideModal,
              },
            },
          }}
        />
      </Modal>
    );
  }
}

export default TutorialScreen;
