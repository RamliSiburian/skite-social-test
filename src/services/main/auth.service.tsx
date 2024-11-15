import { IPayloadLogin } from '@afx/interfaces/main/auth.iface'
import { rest } from '@afx/utils/config.rest'
import request from '@afx/utils/request.util'

export function LoginService(data: IPayloadLogin) {
  return request<any>({
    url: rest.auth.login,
    data,
    method: 'POST'
  })
}
export function UserInfoService(data: IPayloadLogin) {
  return request<any>({
    url: rest.auth.userInfo,
    data,
    method: 'GET'
  })
}

