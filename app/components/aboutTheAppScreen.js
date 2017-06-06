
import React, { PropTypes } from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';

import I18n from 'react-native-i18n';

import NavigationBar from './navigationBar';

import { parseDisplayText } from '../utilities';

import { BOTTOMBARHEIGHT } from './rootScreen';
import { BOTTOMPLAYERHEIGHT } from './bottomPlayer';

import { globalStyles, OFF_BLACK, ACTION } from '../styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    marginTop: 65,
  },
  creditsHeader: {
    marginTop: 25,
    marginBottom: 5,
  },
});

const AboutTheAppScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationBar
        label={I18n.t('aboutTheAppScreen_Title')}
        labelStyle={{
          color: OFF_BLACK,
        }}
        buttonColor={ACTION}
        backButtonPress={() => { props.navigator.pop(); }}
        barStyle={{
          backgroundColor: '#ffffff',
          height: 44,
        }}
      />
      <View style={[styles.container, { marginBottom: BOTTOMBARHEIGHT }]}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: BOTTOMPLAYERHEIGHT + 10,
          }}
          automaticallyAdjustContentInsets={false}
        >
          <Text style={[globalStyles.h1, styles.creditsHeader]}>
            {I18n.t('aboutTheAppAudioContentHeader')}
          </Text>
          <Text style={[globalStyles.body, globalStyles.paragraph]}>
            {I18n.t('aboutTheAppAudioContentBody')}
          </Text>
          <Text style={[globalStyles.h1, styles.creditsHeader]}>
            {I18n.t('aboutTheAppTheAppHeader')}
          </Text>
          <Text style={[globalStyles.body, globalStyles.paragraph]}>
            {I18n.t('aboutTheAppTheAppBody')}
          </Text>
          <Text style={[globalStyles.h1, styles.creditsHeader]}>
            {I18n.t('aboutTheAppProjectManagerNordicMuseumHeader')}
          </Text>
          <Text style={[globalStyles.body, globalStyles.paragraph]}>
            {I18n.t('aboutTheAppProjectManagerNordicMuseumBody')}
          </Text>          
          <Text style={[globalStyles.h1, styles.creditsHeader]}>
            {I18n.t('aboutTheAppProjectManagerCarnegieInstituteHeader')}
          </Text>
          <Text style={[globalStyles.body, globalStyles.paragraph]}>
            {I18n.t('aboutTheAppProjectManagerCarnegieInstituteBody')}
          </Text>          
          <Text style={[globalStyles.h1, styles.creditsHeader]}>
            {I18n.t('aboutTheAppDevelopmentAndDesignHeader')}
          </Text>
          <Text style={[globalStyles.body, globalStyles.paragraph]}>
            {I18n.t('aboutTheAppDevelopmentAndDesignBody')}
          </Text>          
          <Text style={[globalStyles.h1, styles.creditsHeader]}>
            {I18n.t('aboutTheAppAdvisoryTeamHeader')}
          </Text>
          <Text style={[globalStyles.body, globalStyles.paragraph]}>
            {I18n.t('aboutTheAppAdvisoryTeamBody')}
          </Text>          
          <Text style={[globalStyles.h1, styles.creditsHeader]}>
            {I18n.t('aboutTheAppAppIconAndDesignAssetsHeader')}
          </Text>
          <Text style={[globalStyles.body, globalStyles.paragraph]}>
            {I18n.t('aboutTheAppAppIconAndDesignAssetsBody')}
          </Text>          
          <Text style={[globalStyles.h1, styles.creditsHeader]}>
            {I18n.t('aboutTheAppTranslationsHeader')}
          </Text>
          <Text style={[globalStyles.body, globalStyles.paragraph]}>
            {I18n.t('aboutTheAppTranslationsBody')}
          </Text>          
          <Text style={[globalStyles.h1, styles.creditsHeader]}>
            {I18n.t('aboutTheAppPhotoCreditsHeader')}
          </Text>
          <Text style={[globalStyles.body, globalStyles.paragraph]}>
            {I18n.t('aboutTheAppPhotoCreditsBody')}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

AboutTheAppScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default AboutTheAppScreen;
