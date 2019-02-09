import React, {Component} from 'react';
import { View, StyleSheet, Platform, Image, Text } from 'react-native';

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: this.props.backColor
  },
  image: {
    height: 200,
    width: 200,
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
      <View style={styles.splashContainer}>
        <Image
          style={styles.image}
          source={this.props.logo} />
        {this.props.textSplash ?
          <Text
            style={styles.textStyle}>{this.props.textSplash}</Text>
          : null}
      </View>
    );
  }
}
