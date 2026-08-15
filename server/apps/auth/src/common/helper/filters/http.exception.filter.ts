import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { LOGGER_CONFIG } from "../../config/logger.config";

@Catch()
export class HttpExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name)
    catch(exception: unknown, host: ArgumentsHost) {
        try {
        const res = host.switchToHttp().getResponse<Response>()
        const req = host.switchToHttp().getRequest<Request>()
        let status = HttpStatus.INTERNAL_SERVER_ERROR
        let message = `Server error`
        let errors: any = null
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            if (typeof res === 'string') message = res;
            else if (typeof res === 'object' && res !== null) {
                message = (res as any).message || message;
                errors = (res as any).errors || null;
            }}
        if (LOGGER_CONFIG.IS_ON) this.logger.error(`${req.method} ${req.url} - ${status}: ${message}. ${exception}`);
        res.status(status).json({
            statusCode: status,
            message: message,
            errors: errors,
            timestamp: new Date().toISOString(),
            path: req.url,
        })
    } catch(error) {console.error('FILTER ERROR:', error);}
    }
}