import { http } from './http'
import { vuex } from '@/store'
import { router, routeNames } from '@/router'
import {
  ILoginRequestPayload,
  IConfirmNewIpRequestPayload,
  IRegisterRequestPayload,
  IRecoverPasswordPayload,
  IEmailVerificationPayload,
  IResetPasswordPayload,
  ITotpTokenRequestPayload,
  IRecover2FaCode
} from '@/types'

class AuthService {
  login (payload: ILoginRequestPayload) {
    // eslint-disable-next-line camelcase
    return http.post<{ access_token: string; user: any; require2FA: boolean; }>('/auth/login', payload)
      .then((response) => {
        if (response.status === 202) {
          router.push({ name: routeNames.twoFactorAuth })
          response.data.require2FA = true
          return response
        } else {
          response.data.require2FA = false
          return response
        }
      })
  }

  confirmNewIp (payload: IConfirmNewIpRequestPayload) {
    // eslint-disable-next-line camelcase
    return http.post<{ access_token: string; user: any; require2FA: boolean; }>('/auth/confirm-new-ip', payload)
      .then((response) => {
        if (response.status === 202) {
          router.push({ name: routeNames.twoFactorAuth })
          response.data.require2FA = true
          return response
        } else {
          response.data.require2FA = false
          return response
        }
      })
  }

  register (payload: IRegisterRequestPayload) {
    // eslint-disable-next-line camelcase
    return http.post<{ access_token: string; user: any; }>('/auth/register', payload)
  }

  resetPassword (payload: IResetPasswordPayload) {
    return http.post('/auth/recover-password', payload)
  }

  verifyEmail (payload: IEmailVerificationPayload) {
    return http.post('/auth/send-verify-email-link', payload)
  }

  activateAccount (payload: IEmailVerificationPayload) {
    return http.post('/account/verify', payload)
  }

  // not used in legacy app
  resendVerifyEmail (payload: any) {
    return http.post('/auth/resendEmail', payload)
  }

  recoverPassword (payload: IRecoverPasswordPayload) {
    return http.post<boolean>('/auth/send-recover-link', payload)
  }

  requestReset2fa (payload: IRecover2FaCode) {
    return http.post<boolean>('/auth/request-reset-2fa', payload)
  }

  reset2fa (payload: IRecover2FaCode) {
    return http.post<boolean>('/auth/reset-2fa', payload)
  }

  get2FASecret () {
    return http.get<any>('/auth/totp-secret').then((res) => {
      const payload: any = res && res.data
      const secretKey = /secretkey/gi
      const upbotsKey = vuex.auth?.user ? ''.concat('UpBots(', vuex.auth?.user.email, ')') : 'UpBots'
      payload.otpauth_url = ''.concat(payload.otpauth_url.replace(secretKey, upbotsKey), '&issuer=upbots.com')

      return payload
    })
  }

  verify2FA (payload: ITotpTokenRequestPayload) {
    // eslint-disable-next-line camelcase
    return http.post<{ access_token: string; user: any; }>('/auth/totp-verify', payload)
  }

  deactivate2FA (payload: ITotpTokenRequestPayload) {
    return http.post('/auth/totp-deactivate', payload)
  }

  sendEmailNotify2FAEnabled () {
    return http.post('/auth/send-2fa-enabled-email-notif')
  }

  updateMarketing () {
    return http.post('/active-campaign/add-marketing-list')
  }

  updateUserList () {
    return http.post('/active-campaign/add-user-list')
  }
}

export const authService = new AuthService()
