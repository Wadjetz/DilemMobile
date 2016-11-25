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

export interface User {
  name: string
  birthday: string
  picture: string
  gender: string
}

export function usersList(token: string): Promise<User[]> {
  return requestData(`${BASE_URL}/users`, {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })
}
