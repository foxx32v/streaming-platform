export type IsAuthType = boolean

export interface IAuthStore {
    isAuth: IsAuthType
    setAuth: (isAuth: IsAuthType) => void
    logout: () => void
}