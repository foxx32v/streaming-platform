export const GLOBAL_LIMITER = {
    COUNT : 20,
    TIMEOUT : 15 * 1000 * 60,
    MESSAGE : 'Rate limit exceeded. Please try again later.'
}

export const ADMIN_LIMITER = {
    COUNT : 50,
    TIMEOUT : 10 * 1000 * 60,
    MESSAGE : 'Error limit.'
}