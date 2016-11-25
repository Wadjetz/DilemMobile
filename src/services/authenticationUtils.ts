import { ApiStatusError } from './request'
import React from 'react'
import { routes } from '../App'

export function withAuth<T>(response: Promise<T>, navigator: React.NavigatorStatic): Promise<T> {
  return response.catch((err: ApiStatusError) => {
    if (err.status === 401) {
      navigator.replace(routes[0])
    }
    return Promise.reject(err)
  })
}
