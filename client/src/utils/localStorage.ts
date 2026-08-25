export const getItem = (title: string) => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(title)
}

export const setItem = (title: string, item: string) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(title, item)
}

export const DeleteItem = (title: string) => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(title)
}