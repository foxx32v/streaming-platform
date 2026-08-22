import Cookies from 'js-cookie';

export const CookieParser = (name: string): string | null => {
    const cookie = Cookies.get(name);
    return cookie || null;
}