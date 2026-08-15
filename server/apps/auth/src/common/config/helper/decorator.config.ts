export const PASSWORD_DECORATOR = {
    MIN_LENGTH : 8,
    MAX_LENGTH : 32,
    REGULAR : /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    MESSAGE: 'Password must contain uppercase letter, lowercase letter, and a special character or number',
}

export const USERNAME_DECORATOR = {
    MIN_LENGTH: 4,
    MAX_LENGTH: 50,
    REGULAR: /^[a-zA-Z0-9_]+$/,
    MESSAGE: 'Username can only contain letters, numbers and underscore',
}

