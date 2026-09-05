import Cookies from 'js-cookie';

export const GetCookie = (title: string) => {
    return Cookies.get(title) || null
}

export const SetCookie = (title: string, data: string, time?: number) => {
    Cookies.set(title, data, { expires: time || undefined, path: '/'})
}

export const DeleteCookie = (title: string, path?: string) => {
    Cookies.remove(title, { path: path || '/' })
}