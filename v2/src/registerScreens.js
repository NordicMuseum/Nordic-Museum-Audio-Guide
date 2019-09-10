import {Navigation} from 'react-native-navigation';

import NearMe from './containers/nearMe';
import Tours from './containers/tours';
import TourStop from './containers/tourStop';
import Search from './containers/search';
import Info from './containers/info';
import Settings from './containers/settings';
import Amenities from './containers/amenities';
import Welcome from './containers/welcome';
import AboutMuseum from './containers/aboutMuseum';

const registerScreens = store => {
  Navigation.registerComponent('nearMe', () => NearMe);

  Navigation.registerComponent('tours', () => Tours);

  Navigation.registerComponent('tourStop', () => TourStop);

  Navigation.registerComponent('search', () => Search);

  Navigation.registerComponent('info', () => Info);

  Navigation.registerComponent('settings', () => Settings);

  Navigation.registerComponent('amenities', () => Amenities);

  Navigation.registerComponent('welcome', () => Welcome);

  Navigation.registerComponent('aboutMuseum', () => AboutMuseum);
};

export default registerScreens;
