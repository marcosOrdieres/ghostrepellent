import { BaseScene } from 'components';
import template from './splashTemplate';
import { connect } from 'react-redux';
import { Dimensions, ToastAndroid } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { AdMobInterstitial } from 'react-native-admob';
import firebase from 'react-native-firebase';

const {width, height} = Dimensions.get('window');
class SplashController extends BaseScene {
  constructor (args) {
    super(args);
    this.initializeFirebaseApp();
    this.chargeAd();
    this.goGhostScreen();
    this.state = {
      userLoggedIn: false,
      externalData: null
    };
  }

  goGhostScreen () {
    console.warn('weee');
    setTimeout(() => {
      console.warn('1 secs');
      this.navigateTo('Ghost');
    }, 2000);
  }

  async initializeFirebaseApp () {
    try {
      const firebaseConfig = {
        apiKey: this.env.apiKey,
        authDomain: this.env.authDomain,
        databaseURL: this.env.databaseURL
      };
      const firebaseApp = firebase.app(firebaseConfig);
    } catch (error) {
      console.warn(error.message);
    }
  }

  chargeAd () {
    // Display an interstitial
    // AdMobInterstitial.setAdUnitID('ca-app-pub-7498255284251761~6149695323'); // mamarene Id
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // test
    AdMobInterstitial.setTestDevices(['6D1D35847F87DD467EE0D0AD2FE07E63']); // my phone Device
    AdMobInterstitial.requestAd();
  }

  render () {
    return template(this);
  }
}

export default connect()(SplashController);
