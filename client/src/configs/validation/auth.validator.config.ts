export const AUTH_VALIDATOR_REGISTER = {
    userNameMin: 4,
    userNameMax: 50,
    userNameMessage: 'Username can only contain letters, numbers and underscore',
    passwordMin: 8,
    passwordMax: 32,
    passwordMessage: 'Password must contain uppercase letter, lowercase letter, and a special character or number',
    emailMessage: 'Invalid email format',
}

export const AUTH_VALIDATOR_LOGIN = {
    emailMessage: 'Invalid email format',
    passwordMin: 8,
    passwordMax: 32,
    passwordMessage: 'Password must contain uppercase letter, lowercase letter, and a special character or number',
}

export const AUTH_VALIDATOR_CHANGE_PASSWORD = {
    oldPasswordMin: 8,
    oldPasswordMax: 32,
    oldPasswordMessage: 'Password must contain uppercase letter, lowercase letter, and a special character or number',
    newPasswordMin: 8,
    newPasswordMax: 32,
    newPasswordMessage: 'Password must contain uppercase letter, lowercase letter, and a special character or number',
    doublePasswordMessage: 'Passwords do not match',
}

export const AUTH_VALIDATOR_RESET_PASSWORD = {
    newPasswordMin: 8,
    newPasswordMax: 32,
    newPasswordMessage: 'Password must contain uppercase letter, lowercase letter, and a special character or number',
    doublePasswordMessage: 'Passwords do not match',
    resetTokenMessage: 'Reset token is required',
}

export const AUTH_VALIDATOR_FORGET_PASSWORD = {
    emailMessage: 'Invalid email format',
}

export const AUTH_VALIDATOR_VERIFY_EMAIL = {
    emailMessage: 'Invalid email format',
}

export const AUTH_VALIDATOR_RESEND_VERIFICATION = {
    emailMessage: 'Invalid email format',
}

export const AUTH_VALIDATOR_VERIFY_TOKEN = {
    tokenMessage: 'Token is required',
}

export const AUTH_VALIDATOR_VALIDATE_TOKEN = {
    tokenMessage: 'Token is required',
}

export const AUTH_VALIDATOR_CHANGE_USER_ROLE = {
    userIdMessage: 'Invalid user ID',
    roleMessage: 'Role is required',
}

export const AUTH_VALIDATOR_BLOCK_USER = {
    userIdMessage: 'Invalid user ID',
    reasonMessage: 'Reason is optional',
}

export const AUTH_VALIDATOR_GET_USER_BY_ID = {
    userIdMessage: 'Invalid user ID',
}

export const AUTH_VALIDATOR_REVOKE_SESSION = {
    sessionIdMessage: 'Invalid session ID',
}