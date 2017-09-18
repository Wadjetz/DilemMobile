import React, { Component, ViewStyle } from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native'
import { getMessages, sendMessage, Message, User } from './services/DilemService'
import Chat from './components/chat'

interface Props {
  navigator: React.NavigatorStatic
  to: User
}

export default class ChatScene extends React.Component<Props, void> {

  render() {
    return (
      <View style={styles.container}>
        <Chat to={this.props.to} />
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