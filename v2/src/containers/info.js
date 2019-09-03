import React, { Component } from 'react';

import InfoScreen from '../components/infoScreen'
import { NAV_BAR_TEXT, NAV_BAR_BACKGROUND }  from '../styles';

class Info extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        title: {
          text: 'Info',
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        }
      }
    };
  }

  render() {
    return (
      <InfoScreen />
    );
  }

}

export default Info;
