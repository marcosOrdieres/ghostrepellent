import { BaseScene } from 'components';
import template from './ghostTemplate';
import { connect } from 'react-redux';
import { Dimensions, ToastAndroid } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { AdMobInterstitial } from 'react-native-admob';
import firebase from 'react-native-firebase';

const {width, height} = Dimensions.get('window');

class GhostController extends BaseScene {
  constructor (args) {
    super(args);
    this.getIntersticialAd();
    this.state = {
      ghostHunted: false
    };
  }

  toggleGhostButton () {
    this.setState({
      ghostHunted: !this.state.ghostHunted
    });
  }

  getIntersticialAd () {
    setTimeout(() => {
      console.warn('5 secs');
      AdMobInterstitial.showAd();
    }, 5000);
  }

  render () {
    return template(this);
  }
}

export default connect()(GhostController);
