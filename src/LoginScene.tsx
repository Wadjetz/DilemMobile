import React, { Component, ViewStyle } from 'react'
import { StyleSheet, View } from 'react-native'

import Login from './components/Login'

interface Props {
  navigator: React.NavigatorStatic
}

export default class LoginScene extends React.Component<Props, void> {
  render() {
    return (
      <View style={styles.container}>
        <Login navigator={this.props.navigator} />
      </View>
    )
  }
}

interface Style {
  container: React.ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})