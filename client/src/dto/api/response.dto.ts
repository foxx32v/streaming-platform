export interface IResponse<T = unknown> {
    statusCode: number
    message: string
    data: any
    errors: any
    timestamp: string
    path?: string
}