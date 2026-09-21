export const USERNAME_DECORATOR_CONFIG = {
    MIN_LENGTH: 4,
    MAX_LENGTH: 50,
    REGULAR: /^[a-zA-Z0-9_]+$/,
    MESSAGE: 'Username can only contain letters, numbers and underscore',
}

export const USER_STATUS_DECORATOR_CONFIG = {
    MAX_LENGTH: 730,
    MIN_LENGTH: 0,
    REGULAR: /^[\s\S]{0,730}$/,
    MESSAGE: 'Status must be 0-730 characters',
}
