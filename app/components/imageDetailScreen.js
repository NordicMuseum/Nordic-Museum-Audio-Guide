
import React, { PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

import {
  parseDisplayText,
  parseVoiceoverText,
} from '../utilities';

import NavigationBar from './navigationBar';

import { globalStyles, OFF_BLACK, TEAL } from '../styles';

const SPACING = 10;
const IMAGE_MAX_HEIGHT = 475 / 2; // Divided by 2 because of retina screens

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 65,
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: SPACING,
  },
  longCopyright: {
    marginBottom: 20,
  },
});

const ImageDetailScreen = (props) => {
  let imageWidth;
  let imageHeight;

  const width = Dimensions.get('window').width;
  let imageCellWidth = width - SPACING * 2;

  // Constrain image to IMAGE_MAX_HEIGHT longest side
  imageCellWidth = imageCellWidth > IMAGE_MAX_HEIGHT ? IMAGE_MAX_HEIGHT : imageCellWidth;

  if (props.imageHeight > props.imageWidth) {
    imageHeight = IMAGE_MAX_HEIGHT;
    imageWidth = (props.imageWidth / props.imageHeight) * IMAGE_MAX_HEIGHT;
  } else {
    imageWidth = imageCellWidth;
    imageHeight = (props.imageHeight / props.imageWidth) * imageCellWidth;
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationBar
        label={I18n.t('imageDetailScreen_Title')}
        labelStyle={{
          color: OFF_BLACK,
        }}
        buttonColor={TEAL}
        backButtonPress={() => { props.navigator.pop(); }}
        backButtonLabel={props.tourStopTitle}
        barStyle={{
          backgroundColor: '#ffffff',
          height: 44,
        }}
      />
      <View
        style={[styles.container, { marginBottom: props.containerMargin }]}
      >
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={{
            paddingLeft: SPACING,
            paddingRight: SPACING,
            paddingBottom: SPACING,
          }}
        >
          <Image
            style={[
              styles.image,
              {
                width: imageWidth,
                height: imageHeight,
              },
            ]}
            source={{ uri: props.imageURL }}
          />
          <View
            accessible={true}
            accessibilityTraits={['text']}
            accessibilityLabel={parseVoiceoverText(props.longCopyright)}
          >
            <Text style={[styles.longCopyright, globalStyles.body]}>
              {parseDisplayText(props.longCopyright)}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

ImageDetailScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
  imageURL: PropTypes.string.isRequired,
  imageHeight: PropTypes.number.isRequired,
  imageWidth: PropTypes.number.isRequired,
  longCopyright: PropTypes.string.isRequired,
  containerMargin: PropTypes.number.isRequired,
  tourStopTitle: PropTypes.string.isRequired,
};

export default ImageDetailScreen;
