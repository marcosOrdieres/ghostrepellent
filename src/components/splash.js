import React, {Component} from 'react';
import { View, StyleSheet, Platform, Image, Text, TouchableOpacity } from 'react-native';
import Palette from '../common/palette';
import { AdMobBanner } from 'react-native-admob';

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    paddingTop: '20%',
    color: Palette.white,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Calibri'
  }
});

export default class SplashComponent extends Component {
  constructor (args) {
    super(args);
  }

  render () {
    return (
      <TouchableOpacity
        onPress={this.props.onPressItem ? this.props.onPressItem.bind(this) : null}
        style={[{backgroundColor: this.props.backColor}, styles.splashContainer]}>
        <Image
          style={[{height: this.props.heightImage ? this.props.heightImage : 300, width: this.props.widthImage ? this.props.widthImage : 300 }, styles.image]}
          source={this.props.logo} />
        {this.props.textSplash ?
          <Text
            style={styles.textStyle}>{this.props.textSplash}</Text>
          : null}
        {this.props.advertisment ?
          <View style={{position: 'absolute', paddingTop: '110%'}}>
            <AdMobBanner
              adSize='fullBanner'
              adUnitID='ca-app-pub-7498255284251761~6149695323'
              testDevices={[AdMobBanner.simulatorId]}
              onAdFailedToLoad={error => console.error(error)} />
          </View>
            :
            null
          }
      </TouchableOpacity>
    );
  }
}
