import { HttpService } from '../../core/http'
import { AuthorizationRole, AuthorizationType } from './authorization.model'

export class AuthorizationApi {
  static sendCode(
    type: AuthorizationType,
    email: string,
  ): Promise<{ keyPublic: string }> {
    return HttpService.api.post(`/v1/authorization/${type}/code`, {
      body: { email },
      headers: {}, // Add any required headers here
    })
  }

  static verifyCode(
    type: AuthorizationType,
    email: string,
    values: {
      keyPublic: string
      keyPrivate: string
    },
  ): Promise<void> {
    const body = { ...values, email }

    return HttpService.api.post(`/v1/authorization/${type}/code-verification`, {
      body,
      headers: {}, // Add any required headers here
    })
  }

  static getPermissions(): Promise<{ roles: AuthorizationRole[] }> {
    return HttpService.api.get(`/v1/users/me/authorization/permissions`, {
      headers: {},
      params: {},
    })
  }
}
