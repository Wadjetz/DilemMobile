import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native'

const FBSDK = require('react-native-fbsdk')
const {
  LoginButton,
  AccessToken
} = FBSDK

export default class login extends React.Component<void, void> {
  render() {
    return (
      <LoginButton
        publishPermissions={['publish_actions']}
        onLoginFinished={
          (error: any, result: any) => {
            if (error) {
              console.error('Login failed with error: ' + error)
            } else if (result.isCancelled) {
              console.error('Login was cancelled')
            } else {
                AccessToken.getCurrentAccessToken().then(
                  (data: any) => {
                    try {
                      AsyncStorage.setItem('access_token', data.accessToken.toString())
                    } catch (error) {
                      console.error('No save accessToken')
                    }
                  }
                )
            }
          }
        }
        onLogoutFinished={() => alert('logout.')}/>
    )
  }
}
