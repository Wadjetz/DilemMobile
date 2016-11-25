const BASE_URL = 'http://10.192.3.255:3000'
import { requestData } from './request'


export function signup(token: string): Promise<{user: any, token: string}> {
  return requestData(`${BASE_URL}/users/signup`, {
    method: 'POST',
    data: {
      facebook_token: token
    }
  })
}
