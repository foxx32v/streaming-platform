require('dotenv').config()

export const KAFKA_CONFIG = {
    BROKER: process.env.KAFKA_BROKER || 'localhost:9092',
    CLIENT_ID: process.env.KAFKA_CLIENT_ID || 'auth-service',
    GROUP_ID: process.env.KAFKA_GROUP_ID || 'auth-consumer',
    TOPICS: {
        USER_CREATED: 'user.created',
        USER_UPDATED: 'user.updated',
        USER_DELETED: 'user.deleted',
    },
}