export interface ResponseDto {
    message: string;
    errors?: string[]|null|unknown;
    statusCode: number;
    data?: any;
    timestamp: string;
}