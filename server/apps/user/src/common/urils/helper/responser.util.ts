export function Responser (
    statusCode: number,
    message: string,
    data?: any,
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