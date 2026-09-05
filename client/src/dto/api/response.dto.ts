export interface IResponse<T = unknown> {
    statusCode: number
    message: string
    data: T
    errors: string | null
    timestamp: string
    path?: string
}

export interface IError {
    message: string
    statusCode: number
    errors?: string | null
}