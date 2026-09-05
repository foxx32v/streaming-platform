import { CORS_CONFIG } from "../../configs"

export const corsObject = {
        origin: CORS_CONFIG.ORIGIN,
        methods: CORS_CONFIG.METHODS,
        credentials: CORS_CONFIG.CREDENTIALS,
    }