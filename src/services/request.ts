import { merge } from 'lodash'
import * as xhr from './xhr'

export interface ApiStatusError {
  status: number
  message: string
  data?: any
  error?: Error
}

/*
 * Low level request: it returns the Response type of xhr wrapper
 */
export function request(path: string, options?: xhr.RequestOptions): Promise<xhr.Response> {
  const init: xhr.RequestOptions = {
    url: path,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Api-Version': '2',
      'X-Canal': 'MOBILE',
      'X-Ontologie-Version': '1'
    }
  }

  merge(init, options)

  return xhr.request(init).catch(normalizeError)
}

/*
 * High level request: returns directly parsed json data, or raw data if
 * specified in options
 */
export function requestData<T>(path: string, options?: xhr.RequestOptions): Promise<T> {
  return request(path, options).then(res => res.data)
}

export function getError(error: ApiStatusError | undefined, path: string) {
  if (error && error.data && error.data[`/${path}`] && error.data[`/${path}`].length > 0) {
    return error.data[`/${path}`][0]
  }
}

function isXhrResponse(res: xhr.Response | Error): res is xhr.Response {
  return res.hasOwnProperty('status')
}

function normalizeError(reason: xhr.Response | Error): Promise<ApiStatusError> {
  if (isXhrResponse(reason)) {
    return Promise.reject({
      status: reason.status,
      data: reason.data,
      message: reason.xhr.statusText
    })
  } else {
    return Promise.reject({
      status: 0,
      error: reason,
      message: reason.message
    })
  }
}
