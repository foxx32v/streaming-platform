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

export interface IPageStore {
    currentPage: PageStoreType
    setPage: (page: PageStoreType) => void
    togglePage: (page: PageStoreType) => void
}