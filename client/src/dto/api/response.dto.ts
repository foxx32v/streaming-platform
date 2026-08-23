export interface IResponse<T = unknown> {
    statusCode: number
    message: string
    data: any
    errors: any
    timestamp: string
    path?: string
}

export interface IError {
    message: string
    statusCode: number
    errors?: any
}