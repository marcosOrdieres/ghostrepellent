import React from 'react';
import logoScare from '../../assets/images/ghostScare.png';
import logoHunted from '../../assets/images/ghostHunted.png';
import { Splash } from 'components';
import { View } from 'react-native';

export default (controller) => (
  <Splash
    advertisment
    onPressItem={() => { controller.toggleGhostButton(); }}
    widthImage={300}
    heightImage={300}
    backColor={controller.state.ghostHunted ? '#ffffb3' : 'black'}
    logo={controller.state.ghostHunted ? logoHunted : logoScare} />
);
