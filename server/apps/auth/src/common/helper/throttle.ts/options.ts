import {ADMIN_LIMITER, GLOBAL_LIMITER, LOGIN_LIMITER, REGISTER_LIMITER} from "../../config/auth/rateLimiter.config"

export const throttleRegisterOptions = {
    default: {
        limit: REGISTER_LIMITER.COUNT, 
        ttl: REGISTER_LIMITER.TIMEOUT
    }
}

export const throttleLoginOptions = {
    default: { 
        limit: LOGIN_LIMITER.COUNT, 
        ttl: LOGIN_LIMITER.TIMEOUT 
    }
}

export const throttleAdminOptions = {
    default: { 
        limit: ADMIN_LIMITER.COUNT, 
        ttl: ADMIN_LIMITER.TIMEOUT 
    }
}

export const throttleGlobalOptions = {
    default: { 
        limit: GLOBAL_LIMITER.COUNT, 
        ttl: GLOBAL_LIMITER.TIMEOUT 
    }
}