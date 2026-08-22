export type PageStoreType = 'home' | 'login' | 'register' | 'profile' | 'cardVerify'

export interface IPageStore {
    currentPage: PageStoreType
    setPage: (page: PageStoreType) => void
    togglePage: (page: PageStoreType) => void
}