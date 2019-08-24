import {Navigation} from 'react-native-navigation';

import NearMe from './containers/nearMe';
import Tours from './containers/tours';
import TourStop from './containers/tourStop';
import Search from './containers/search';
import Info from './containers/info';

const registerScreens = store => {
  Navigation.registerComponent('nearMe', () => NearMe);

  Navigation.registerComponent('tours', () => Tours);

  Navigation.registerComponent('tourStop', () => TourStop);

  Navigation.registerComponent('search', () => Search);

  Navigation.registerComponent('info', () => Info);
};

export default registerScreens;
