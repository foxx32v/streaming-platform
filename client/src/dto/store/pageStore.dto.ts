export type PageStoreType = 
    | 'home'
    | 'login'
    | 'register'
    | 'profile'
    | 'cardVerify'
    | 'feed'
    | 'logout'
    | 'trending'
    | 'categories'
    | 'about'
    | 'subscriptions'
    | 'library'
    | 'history'
    | 'watchLater'
    | 'live'
    | 'settings'
    | 'forgetPassword'
    | 'forgetEmail'
    | 'about'
    | 'blog'
    | 'faq'
    | 'support'
    | 'privacy'
    | 'terms'
    | 'cookies'
    | 'contact'
    | 'careers'
    | 'developers'
    | 'api'
    | 'status'

export interface IPageStore {
    currentPage: PageStoreType
    setPage: (page: PageStoreType) => void
    togglePage: (page: PageStoreType) => void
}