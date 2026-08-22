import { create } from 'zustand'
import { IPageStore } from '../dto/';

export const usePageStore = create<IPageStore>((set) => ({
    currentPage: 'home',
    setPage: (page) => set({ currentPage: page }),
    togglePage: (page) => set({ currentPage: page }),
}))