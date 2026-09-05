import { ResponseDto } from "../../dto";

export function Responser<T>(
    statusCode: number,
    message: string,
    data?: T,
    errors?: unknown
): ResponseDto {
    return {
        statusCode,
        data: data || null,
        message,
        errors: errors || null,
        timestamp: new Date().toISOString(),
    }
}