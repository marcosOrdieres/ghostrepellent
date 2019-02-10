import React, {Component} from 'react';
import { View, StyleSheet, Platform, Image, Text, TouchableOpacity, Linking } from 'react-native';
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
    color: 'white',
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
      <View style={[{backgroundColor: this.props.backColor}, styles.splashContainer]}>
        {this.props.advertisment ?
          <View
            style={{ flex: 1}}>
            <Text style={styles.textStyle}>{this.props.text}</Text>
          </View>
          :
          null
        }
        <TouchableOpacity
          style={{flex: this.props.advertisment ? 8 : null}}
          onPress={this.props.onPressItem ? this.props.onPressItem.bind(this) : null}>
          <Image
            style={[{height: this.props.heightImage ? this.props.heightImage : 300, width: this.props.widthImage ? this.props.widthImage : 300 }, styles.image]}
            source={this.props.logo} />
          {this.props.textSplash ?
            <Text
              style={styles.textStyle}>{this.props.textSplash}</Text>
          : null}
        </TouchableOpacity>
        {this.props.advertisment ?
          <View style={{flex: 1}}>
            <Text
              style={{color: 'blue', textAlign: 'center', justifyContent: 'center'}}
              onPress={() => Linking.openURL('https://mamarene.blogspot.com/2019/02/privacy-policy-ghost-repellent.html')}>Privacy Policy</Text>
            <AdMobBanner
              adSize='smartBannerPortrait'
              adUnitID='ca-app-pub-7498255284251761/2176405693'
              testDevices={[AdMobBanner.simulatorId]}
              onAdFailedToLoad={error => console.warn(error)} />
          </View>
          :
          null
        }
      </View>
    );
  }
}
