import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native'

import { signup } from '../services/DilemService'
import { routes } from '../App'

const FBSDK = require('react-native-fbsdk')
const {
  LoginButton,
  AccessToken
} = FBSDK

interface Props {
  navigator: React.NavigatorStatic
}

export default class Login extends React.Component<Props, void> {
  render() {
    return (
      <LoginButton
        publishPermissions={['publish_actions']}
        onLoginFinished={
          (error: any, result: any) => {
            console.log("onLoginFinished")
            if (error) {
              console.error('Login failed with error: ' + error)
            } else if (result.isCancelled) {
              console.error('Login was cancelled')
            } else {
                AccessToken.getCurrentAccessToken().then(
                  (data: any) => {
                    try {
                      const token = data.accessToken.toString()
                      signup(token).then(user => {
                        console.log('onLoginFinished', token, user)
                        AsyncStorage.setItem('access_token', user.token)
                        AsyncStorage.setItem('user', JSON.stringify(user))
                        this.props.navigator.replace(routes[1])
                      }).catch(e => {
                        console.error('signup error', e)
                      })
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
