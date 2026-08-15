export function Responser<T>(
    statusCode: number,
    message: string,
    data?: T,
    errors?: unknown
) {
    return {
        statusCode,
        data: data || null,
        message,
        errors: errors || null,
        timestamp: new Date().toISOString(),
    }
}