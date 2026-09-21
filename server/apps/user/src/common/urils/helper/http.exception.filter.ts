import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class HttpExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name)
    catch(exception: unknown, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>()
        const req = host.switchToHttp().getRequest<Request>()
        let status = HttpStatus.INTERNAL_SERVER_ERROR
        let message = `Server error`
        let errors: any = null
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const resException = exception.getResponse();
            if (typeof resException === 'string') message = resException;
            else if (typeof resException === 'object' && resException !== null) {
                message = (resException as any).message || message;
                errors = (resException as any).errors || null;
            }}
        this.logger.error(`${req.method} ${req.url} - ${status}: ${message}. ${exception}`);
        res.status(status).json({
            statusCode: status,
            message: message,
            errors: errors,
            timestamp: new Date().toISOString(),
            path: req.url,
    })
}}