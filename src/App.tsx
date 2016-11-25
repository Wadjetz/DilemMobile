import React, { Component, ViewStyle, TextStyle } from 'react'
import { StyleSheet, Navigator, Image, Text, View, Animated, PanResponder, Dimensions, PixelRatio, TouchableOpacity } from 'react-native'
import clamp from 'clamp'

import ProfilesList from './ProfilesList'
import LoginScene from './LoginScene'


export const routes = [
  {title: 'Signup', index: 0},
  {title: 'ProfileList', index: 1},
]

export default class DilemMobile extends Component<void, void> {
  render() {
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => {
          switch (route.index) {
            case 0: return <LoginScene navigator={navigator} />
            case 1: return <ProfilesList navigator={navigator} />
            default: return <LoginScene navigator={navigator} />
          }
        }}
      />
    )
  }
}

