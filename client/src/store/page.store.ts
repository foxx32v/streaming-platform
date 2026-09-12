import { create } from 'zustand'
import { IPageStore, PageStoreType } from '../dto/';
import { getItem, setItem } from '../utils';

export const usePageStore = create<IPageStore>((set) => ({
    currentPage: getItem('currentPage') as PageStoreType || 'home',
    setPage: (page) => {setItem('currentPage', page); set({ currentPage: page })},
    togglePage: (page) => set({ currentPage: page }),
    initPage: () => {
        const saved = (getItem('currentPage') as PageStoreType) || 'home'
        set({ currentPage: saved })
    }
}))