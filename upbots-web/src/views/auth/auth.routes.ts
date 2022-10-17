import { RouteRecordRaw } from 'vue-router'

const Login = () => import('./Login.vue' /* webpackChunkName: "Login" */)
const Register = () => import('./Register.vue' /* webpackChunkName: "Register" */)
const TwoFactorAuth = () => import('./TwoFactorAuth.vue'/* webpackChunkName: "TwoFactorAuth" */)
const TwoFactorAuthRecovery = () => import('./TwoFactorAuthRecovery.vue'/* webpackChunkName: "TwoFactorAuth" */)
const TwoFactorAuthReset = () => import('./TwoFactorAuthReset.vue'/* webpackChunkName: "TwoFactorAuth" */)
const PasswordRecover = () => import('./PasswordRecover.vue' /* webpackChunkName: "PasswordRecover" */)
const PasswordRecoverDone = () => import('./PasswordRecoverDone.vue' /* webpackChunkName: "PasswordRecoverDone" */)
const PasswordReset = () => import('./PasswordReset.vue' /* webpackChunkName: "PasswordReset" */)
const Activation = () => import('./Activation.vue' /* webpackChunkName: "Activation" */)
const Oauth = () => import('./Oauth.vue' /* webpackChunkName: "Activation" */)

export const authRouteNames = {
  login: 'login',
  register: 'register',
  twoFactorAuth: 'twoFactorAuth',
  twoFactorAuthRecovery: 'twoFactorAuthRecovery',
  twoFactorAuthReset: 'twoFactorAuthReset',
  recover: 'recover',
  recoverDone: 'recoverDone',
  reset: 'reset',
  activation: 'activation',
  oauth: 'oauth'
}

export const authRoutes: RouteRecordRaw[] = [
  {
    path: 'login',
    name: authRouteNames.login,
    meta: {
      title: 'Login to your account',
      subtitle: 'Please enter yor email and password for sign in'
    },
    component: Login
  },
  {
    path: 'register',
    name: authRouteNames.register,
    meta: {
      title: 'Ready to get started?',
      subtitle: 'Create an account to start your trading adventure.'
    },
    component: Register
  },
  {
    path: 'two-factor-authentication',
    name: authRouteNames.twoFactorAuth,
    meta: {
      title: 'Two Factor Authentication',
      subtitle: 'Submit your code from Authenticator app.'
    },
    component: TwoFactorAuth
  },
  {
    path: 'two-factor-authentication-recovery',
    name: authRouteNames.twoFactorAuthRecovery,
    meta: {
      title: 'Two Factor Authentication Recovery',
      subtitle: 'Submit your email.'
    },
    component: TwoFactorAuthRecovery
  },
  {
    path: 'two-factor-authentication-reset',
    name: authRouteNames.twoFactorAuthReset,
    meta: {
      title: 'Two Factor Authentication Recovery Check',
      subtitle: 'Submit your email and reset code.'
    },
    component: TwoFactorAuthReset
  },
  {
    path: 'recover',
    name: authRouteNames.recover,
    meta: {
      title: 'Lost your password?',
      subtitle: 'You will receive a link to create a new password via email.'
    },
    component: PasswordRecover
  },
  {
    path: 'recover-done',
    name: authRouteNames.recoverDone,
    component: PasswordRecoverDone
  },
  {
    path: 'reset-password',
    name: authRouteNames.reset,
    meta: {
      title: 'Enter new password',
      subtitle: 'Create your password using 8 characters or more.'
    },
    component: PasswordReset
  },
  {
    path: 'activation',
    name: authRouteNames.activation,
    component: Activation
  },
  {
    path: 'oauth',
    name: authRouteNames.oauth,
    component: Oauth
  }
]
