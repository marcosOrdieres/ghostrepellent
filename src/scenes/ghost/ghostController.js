import { BaseScene } from 'components';
import template from './ghostTemplate';
import { connect } from 'react-redux';
import { Dimensions, ToastAndroid } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { AdMobInterstitial } from 'react-native-admob';
import firebase from 'react-native-firebase';
import Sound from 'react-native-sound';

const {width, height} = Dimensions.get('window');

class GhostController extends BaseScene {
  constructor (args) {
    super(args);
    this.getIntersticialAd();
    this.state = {
      ghostHunted: false
    };
    let songToPlay;
  }

  componentDidMount () {
    this.soundOn('scare.mp3');
  }

  soundOn (track) {
    Sound.setCategory('Playback');
    songToPlay = new Sound(track, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.warn('failed to load the sound', error);
        return;
      }
  // loaded successfully
      console.warn('duration in seconds: ' + songToPlay.getDuration() + 'number of channels: ' + songToPlay.getNumberOfChannels());

  // Play the sound with an onEnd callback
      songToPlay.play((success) => {
        if (success) {
          console.warn('successfully finished playing');
        } else {
          console.warn('playback failed due to audio decoding errors');
        }
      });
    });

// Reduce the volume by half
    songToPlay.setVolume(0.8);

// Position the sound to the full right in a stereo field
    songToPlay.setPan(1);

// Loop indefinitely until stop() is called
    songToPlay.setNumberOfLoops(-1);
  }

  toggleGhostButton () {
    songToPlay.stop();
    this.setState({
      ghostHunted: !this.state.ghostHunted
    });
    if (this.state.ghostHunted === true) {
      return this.soundOn('scare.mp3');
    } else {
      return this.soundOn('peaceful.mp3');
    }
  }

  getIntersticialAd () {
    setTimeout(() => {
      AdMobInterstitial.showAd();
      this.chargeAd();
      this.getIntersticialSecondAd();
    }, 6000);
  }

  getIntersticialSecondAd () {
    setTimeout(() => {
      AdMobInterstitial.showAd();
      this.chargeAd();
      this.getIntersticialSecondAd();
    }, 15000);
  }

  chargeAd () {
    // Display an interstitial
    AdMobInterstitial.setAdUnitID('ca-app-pub-7498255284251761~6149695323'); // test
    AdMobInterstitial.setTestDevices(['6D1D35847F87DD467EE0D0AD2FE07E63']); // my phone Device
    AdMobInterstitial.requestAd();
  }

  render () {
    return template(this);
  }
}

export default connect()(GhostController);
