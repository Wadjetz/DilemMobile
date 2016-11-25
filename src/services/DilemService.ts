const BASE_URL = 'http://localhost:3000'
import { requestData } from './request'
import { AsyncStorage } from 'react-native'

export function signup(token: string): Promise<{user: any, token: string}> {
  return requestData(`${BASE_URL}/users/signup`, {
    method: 'POST',
    data: {
      facebook_token: token
    }
  })
}

export function usersList(): Promise<{user: any, token: string}[]> {
  return AsyncStorage.getItem('user').then(JSON.parse).then(user => {
    return requestData(`${BASE_URL}/users/signup`, {
      method: 'GET',
      data: {
        facebook_token: user.token
      }
    })
  })
}
