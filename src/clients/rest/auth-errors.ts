export namespace AuthErrors {
  export enum LoginErrorCodes {
    AUTH_LOGIN_INVALID_CREDENTIALS = "AUTH_LOGIN_INVALID_CREDENTIALS",
    NOT_CONFIRMED = "NOT_CONFIRMED",
  }

  export enum RegisterErrorCodes {
    AUTH_REGISTER_EMAIL_TAKEN = "AUTH_REGISTER_EMAIL_TAKEN",
    WEAK_PASSWORD = "WEAK_PASSWORD",
  }

  export enum ForgotPasswordErrorCodes {
    AUTH_FORGOT_PASSWORD_INVALID_EMAIL = "AUTH_FORGOT_PASSWORD_INVALID_EMAIL",
  }

  export enum ResetPasswordErrorCodes {
    INVALID_CODE = "INVALID_CODE",
    WEAK_PASSWORD = "WEAK_PASSWORD",
  }
}
