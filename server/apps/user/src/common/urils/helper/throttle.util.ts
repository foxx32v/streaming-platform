import {ADMIN_LIMITER, GLOBAL_LIMITER } from "../../configs"

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