import { Pool } from 'pg';
import { DB_CONFIG } from '../../config/db.config';

export const db = new Pool({
    host: DB_CONFIG.DB_HOST,
    port: DB_CONFIG.DB_PORT,
    database: DB_CONFIG.DB_NAME,
    user: DB_CONFIG.DB_USER,
    password: DB_CONFIG.DB_PASS,
})