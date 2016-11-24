import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import Swiper from './components/Swiper'
import Profile from './components/Profile'
import description from './test/profile'

export default class DilemMobile extends React.Component<void, void> {
  render() {
    return (
      <Swiper style={styles.container}>
        <Profile {...description}>
        </Profile>
        <Profile {...description}>
        </Profile>
        <Profile {...description}>
        </Profile>
      </Swiper>
    );
  }
}

interface Style {
  container: React.ViewStyle
  welcome: React.TextStyle
  instructions: React.TextStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
