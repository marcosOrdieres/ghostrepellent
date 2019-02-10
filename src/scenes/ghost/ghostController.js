import { BaseScene } from 'components';
import template from './ghostTemplate';
import { connect } from 'react-redux';
import { Dimensions, ToastAndroid, BackHandler, AppState } from 'react-native';
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
      ghostHunted: false,
      appState: AppState.currentState,
      isAdvertisment: false,
      commingFromAd: false
    };
    let songToPlay;
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', function() {
      BackHandler.exitApp();
    });
    AppState.addEventListener('change', this.handleAppStateChange);
    this.soundOn('scare.mp3');
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if(this.state.ghostHunted){
        //cuando se pone activo otra vez despues de que cerre el ad
        if(this.state.comminFromAd){
          this.setState({comminFromAd: false});
        } else{
          this.soundOn('peaceful.mp3');
        }
      } else{
        if(this.state.comminFromAd){
          this.setState({comminFromAd: false});
        } else{
          this.soundOn('scare.mp3');
        }      }
    } else{
      if(this.state.isAdvertisment){
        this.setState({isAdvertisment: false})
      } else{
        songToPlay.stop();
      }
    }
    this.setState({appState: nextAppState});
  };


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
      this.setState({isAdvertisment: true})
      AdMobInterstitial.showAd();
      AdMobInterstitial.addEventListener("adClosed", () => {
        this.setState({comminFromAd: true});
        setTimeout(() => {this.chargeAd()}, 3000);
      });
      this.chargeAd();
      this.getIntersticialSecondAd();
    }, 8000);
  }

  getIntersticialSecondAd () {
    setTimeout(() => {
      this.setState({isAdvertisment: true})
      AdMobInterstitial.showAd();
      AdMobInterstitial.addEventListener("adClosed", () => {
        this.setState({comminFromAd: true});
        setTimeout(() => {this.chargeAd()}, 3000);
      });      this.getIntersticialSecondAd();
    }, 16000);
  }

  chargeAd () {
    // Display an interstitial
    AdMobInterstitial.setAdUnitID('ca-app-pub-7498255284251761/2559549073');
    AdMobInterstitial.setTestDevices(['6D1D35847F87DD467EE0D0AD2FE07E63']); // my phone Device
    AdMobInterstitial.requestAd();
  }

  render () {
    return template(this);
  }
}

export default connect()(GhostController);
