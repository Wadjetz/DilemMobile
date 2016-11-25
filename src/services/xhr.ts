/**
 * xr (c) James Cleveland 2015
 * URL: https://github.com/radiosilence/xr
 * License: BSD
 *
 * Rewritten in typescript and adapted for NomadMobile
 */

import { encode } from 'querystring'

export interface Methods {
  GET: string
  POST: string
  PUT: string
  DELETE: string
  PATCH: string
  OPTIONS: string
}

interface RequestInit {
  url: string
  method: string
  params?: { [key: string]: any }
  data?: any
  headers: Obj<string>
  dump: (data: Object) => string
  load: (str: string) => Object
  withCredentials: boolean
  raw: boolean
  timeout?: number
  events: {[k: string]: (...args: any[]) => any}
  setAbortCallback?: (fn: () => void) => void
}

export interface RequestOptions {
  url?: string
  method?: string
  params?: { [key: string]: any }
  data?: any
  headers?: Obj<string>
  withCredentials?: boolean
  raw?: boolean
  timeout?: number
  events?: {[k: string]: (...args: any[]) => any}
  setAbortCallback?: (fn: () => void) => void
}

export interface Response {
  status: number
  xhr: XMLHttpRequest
  data?: any
}

export const Methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  OPTIONS: 'OPTIONS',
}

export const Events = {
  READY_STATE_CHANGE: 'readystatechange',
  LOAD_START: 'loadstart',
  PROGRESS: 'progress',
  ABORT: 'abort',
  ERROR: 'error',
  LOAD: 'load',
  TIMEOUT: 'timeout',
  LOAD_END: 'loadend',
}

const defaults: RequestInit = {
  url: '',
  method: Methods.GET,
  data: undefined,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  dump: JSON.stringify,
  load: JSON.parse,
  withCredentials: false,
  raw: false,
  events: {}
}

function res(xhr: XMLHttpRequest, data?: any): Response {
  return {
    status: xhr.status,
    data,
    xhr
  }
}

function log(xhr: XMLHttpRequest) {
  if (__DEV__) {
    let data: any
    try {
      data = JSON.parse(xhr.responseText)
    } catch (e) {
      data = xhr.responseText
    }
    console.log('[XHR]', xhr.status, (xhr as any)._method, (xhr as any)._url, '\n', xhr.getAllResponseHeaders(), data)
  }
}

function getData(xhr: XMLHttpRequest, opts: RequestInit) {
  log(xhr)
  if (xhr.responseText) {
    if (opts.raw === true) {
      return xhr.responseText
    } else {
      try {
        return opts.load(xhr.responseText)
      } catch (e) {
      }
    }
  }
}

let config = {}

export function request(args: RequestOptions): Promise<Response> {
  return new Promise((resolve, reject) => {
    const opts: RequestInit = Object.assign({}, defaults, config, args)
    const xhr = new XMLHttpRequest()

    xhr.withCredentials = opts.withCredentials

    if (opts.timeout !== undefined) xhr.timeout = opts.timeout

    if (opts.setAbortCallback !== undefined) {
      opts.setAbortCallback(() => {
        reject(res(xhr))
        xhr.abort()
      })
    }

    xhr.open(
      opts.method,
      opts.params
        ? `${opts.url.split('?')[0]}?${encode(opts.params)}`
        : opts.url,
      true
    )

    xhr.addEventListener(Events.LOAD, () => {
      const data = getData(xhr, opts)
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(res(xhr, data))
      } else {
        reject(res(xhr, data))
      }
    })

    xhr.addEventListener(Events.ABORT, () => reject(res(xhr, getData(xhr, opts))))
    xhr.addEventListener(Events.ERROR, () => reject(res(xhr, getData(xhr, opts))))
    xhr.addEventListener(Events.TIMEOUT, () => reject(res(xhr, getData(xhr, opts))))

    for (const k in opts.headers) {
      if (!{}.hasOwnProperty.call(opts.headers, k)) continue
      xhr.setRequestHeader(k, opts.headers[k])
    }

    for (const k in opts.events) {
      if (!{}.hasOwnProperty.call(opts.events, k)) continue
      xhr.addEventListener(k, opts.events[k].bind(null, xhr), false)
    }

    const data = (typeof opts.data === 'object' && !opts.raw)
        ? opts.dump(opts.data)
        : opts.data

    if (data !== undefined) xhr.send(data)
    else xhr.send()
  })
}
