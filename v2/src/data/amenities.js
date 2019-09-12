import uuid from 'uuid';

export default allAmenities = {
  1: {
    floor: '1',
    floorTitle: 'floor1_Label',
    amenities: [
      {
        uuid: uuid.v4(),
        title: 'amenities_CloakroomTitle',
        description: '',
        icon: require('../assets/cloakroom.png'),
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_ToiletsTitle',
        description: '',
        icon: require('../assets/restrooms.png'),
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_ShopTitle',
        description: 'amenities_ShopDescription',
        icon: require('../assets/shop.png'),
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_BabyChangingTablesTitle',
        description: '',
        icon: require('../assets/babyChangingTable.png'),
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_PlayAreaTitle',
        description: '',
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_LibraryAndArchiveTitle',
        description: 'amenities_LibraryAndArchiveDescription',
        icon: require('../assets/libraryArchive.png'),
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_AssemblyHallTitle',
        description: '',
        icon: require('../assets/lectureHall.png'),
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_WheelchairPushchairEntranceTitle',
        description: 'amenities_WheelchairPushchairEntranceDescription',
        icon: require('../assets/wheelchairEntrance.png'),
      },
    ],
  },
  2: {
    floor: '2',
    floorTitle: 'floor2_Label',
    amenities: [
      {
        uuid: uuid.v4(),
        title: 'amenities_InformationTitle',
        description: '',
        icon: require('../assets/info.png'),
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_EntranceTitle',
        description: '',
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_RestaurantAndCafeTitle',
        description: 'amenities_RestaurantAndCafeDescription',
        icon: require('../assets/restaurant.png'),
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_ChildrensPlayhouseTitle',
        description: 'amenities_ChildrensPlayhouseDescription',
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_StrollerParkingTitle',
        description: 'amenities_StrollerParkingDescription',
        icon: require('../assets/strollerParking.png'),
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_StageTitle',
        description: '',
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_PackedLunchRoomTitle',
        description: '',
        icon: require('../assets/lunchroom.png'),
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_WifiTitle',
        description: '',
      },
    ],
  },
  3: {
    floor: '3',
    floorTitle: 'floor3_Label',
    amenities: [
      {
        uuid: uuid.v4(),
        title: 'amenities_PlayAreaTitle',
        description: '',
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_ToyRoomTitle',
        description: 'amenities_ToyRoomDescription',
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_TemporaryExhibitionTitle',
        description: '',
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_StageTitle',
        description: '',
        icon: require('../assets/lounge.png'),
      },
    ],
  },
  4: {
    floor: '4',
    floorTitle: 'floor4_Label',
    amenities: [
      {
        uuid: uuid.v4(),
        title: 'amenities_PlayAreaTitle',
        description: '',
      },
      {
        uuid: uuid.v4(),
        title: 'amenities_SmallThingsTitle',
        description: 'amenities_SmallThingsDescription',
      },
    ],
  },
};
