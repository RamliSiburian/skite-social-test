import { IModelDefinitions } from '@afx/interfaces/global.iface'
import { IPayloadLogin } from '@afx/interfaces/main/auth.iface'
import { LoginService, UserInfoService } from "@afx/services/main/auth.service"
import LynxStorages from "@afx/utils/storage.util"
import { notification } from 'antd'

export type IStateAuth = {}

export type IActionAuth = {
  loginAdmin: (
    params: IPayloadLogin,
    callback: () => void
  ) => void
  getUserInfo: (data: IPayloadLogin) => void
}

const modelAuth: IModelDefinitions<IStateAuth, IActionAuth> = {
  name: 'auth',
  subscriptions:
    (getStates, useActions) =>
      ({ pathname }) => { },
  model: (put, getState, useActions) => ({
    state: {},
    actions: {
      async loginAdmin(params, callback) {
        try {
          const res = await LoginService(params)
          if (res.status) {
            LynxStorages
              .setItem(
                '@UTOKEN',
                res.response
              )
            notification.success({
              message: 'Success',
              description: res?.message,
              duration: 2
            })
            return new Promise(resolve => {
              setTimeout(() => {
                callback()
                resolve()
                useActions('auth')('getUserInfo', [params], true)
              }, 1000)
            })
          } else {
            throw new Error(res?.message)
          }

        } catch (err: any) {
          notification.warning({
            message: 'Authentication Failed',
            description: err?.message,
            duration: 2,
            key: 'FUNC-LOGIN'
          })
        }
      },

      async getUserInfo(data) {
        try {
          const res = await UserInfoService(data)
          if (res?.status) {
            LynxStorages.setItem('@UUSER', JSON.stringify(res?.response), true)
          }
        } catch (er: any) {
          return null
        }
      },
    }
  })
}

export default modelAuth
