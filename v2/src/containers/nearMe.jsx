import React, {Component} from 'react';

import NearMeScreen from '../components/nearMeScreen';
import {NAV_BAR_TEXT, NAV_BAR_BACKGROUND} from '../styles';

class NearMe extends Component {
  static options(passProps) {
    return {
      topBar: {
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        title: {
          text: 'Near Me',
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
      },
    };
  }

  render() {
    return <NearMeScreen />;
  }
}

export default NearMe;
