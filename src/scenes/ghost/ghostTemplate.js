import React from 'react';
import logoScare from '../../assets/images/ghostScare.png';
import logoHunted from '../../assets/images/ghostHunted.png';
import { Splash } from 'components';
import { View, Dimensions, Text } from 'react-native';

const {width, height} = Dimensions.get('window');

export default (controller) => (
  <Splash
    advertisment
    onPressItem={() => { controller.toggleGhostButton(); }}
    widthImage={width - 20}
    heightImage={height}
    backColor={controller.state.ghostHunted ? 'black' : 'black'}
    logo={controller.state.ghostHunted ? logoHunted : logoScare} />
);
