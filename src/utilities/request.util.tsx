import axios, { ResponseType } from 'axios'
import LynxStorages from './storage.util'
import { Modal } from 'antd'
// import LynxStorages from './storage.util'

interface IRequestPayloads<T = any> {
  url: string
  method: 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'POST'
  headers?: any
  data?: T
  bodyType?: 'raw' | 'formData'
  responseType?: ResponseType
}

interface IResponsePayloads<T = any> {
  status: boolean,
  message: string,
  response: T
}

const randomAuthKey = (Math.random() * 1738).toFixed(3)

export default async function request<T = any, R = any>({
  url,
  method = 'GET',
  headers = {},
  bodyType = 'raw',
  responseType = 'json',
  data
}: IRequestPayloads<R>): Promise<T | IResponsePayloads<T>> {
  const [token] = LynxStorages.getItem('@UTOKEN').data
  const baseUrl = process.env.BASEURL

  let extendedItems: any = {}

  if (method === 'GET') {
    extendedItems = {
      params: data
    }
  } else {
    extendedItems = {
      data: bodyType === 'formData' ? data : JSON.stringify({ ...data })
    }
  }

  return new Promise((resolve, reject) =>
    axios
      .request({
        url: `${baseUrl}${url}`,
        headers: {
          'Content-Type':
            bodyType === 'formData'
              ? 'multipart/form-data'
              : 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          token
        },
        method,
        responseType,
        ...extendedItems
      })
      .then(response => resolve(response.data))
      .catch(error => {
        const msg = error?.response?.data?.meta
        const newMsg = []
        if (
          msg?.message &&
          typeof msg?.message === 'object' &&
          !Array.isArray(msg?.message)
        ) {
          for (const a in msg?.message) {
            newMsg.push(msg?.message?.[a])
          }
          newMsg.flat()
        } else if (typeof msg?.message === 'string') {
          newMsg.push(msg?.message)
        }

        if (
          error?.response?.data?.meta?.code == '40100' &&
          globalThis?.window?.location?.pathname !== 'auth/login'
        ) {
          const [authKey] = LynxStorages.getItem('@UTOKEN', true).data

          if (authKey != randomAuthKey) {
            LynxStorages.setItem('@UTOKEN', randomAuthKey, true)
            Modal.warning({
              title: 'Not Authenticated',
              content: 'Please login first',
              onOk: () => {
                if (globalThis?.window?.location?.replace) {
                  globalThis.window.location.replace(
                    `${window.location.origin}/auth/login`
                  )
                }
                LynxStorages.dropAll()
              },
              onCancel: undefined
            })
          }
        } else if (
          error?.response?.data?.meta?.code == '5030' &&
          globalThis?.window?.location?.pathname !== 'auth/login'
        ) {
          Modal.warning({
            title: 'Server Down',
            content: 'Please try again later',
            onOk: () => {
              if (globalThis?.window?.location?.replace) {
                globalThis.window.location.replace(
                  `${window.location.origin}/auth/login`
                )
              }
              LynxStorages.dropAll()
            },
            onCancel: undefined
          })
        }
        return reject(error?.response?.data)
      })
  )
}

