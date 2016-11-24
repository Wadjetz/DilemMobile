import React, { Component, ViewStyle, TextStyle } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Login from './components/login/login'

import Swiper from './components/Swiper'
import Profile from './components/Profile'
import fb from './test/profile'

export default class DilemMobile extends Component<void, void> {
  render() {
    const { picture, name, birthday } = fb

    return (
      <Swiper style={s.container}>
        <Profile
          name={name}
          birthday={birthday}
          picture={picture}
        />

        <Profile
          name={name}
          birthday={birthday}
          picture={picture}
        />

        <Profile
          name={name}
          birthday={birthday}
          picture={picture}
        />
      </Swiper>
    );
  }
}

interface Style {
  container: ViewStyle
}

const s = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
