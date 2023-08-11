import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import ExceptionResponseDto from '../../../dto/exception.response.dto';

/**
 * Filter that implements {@link ExceptionFilter#catch()}
 *
 * All {@link SchemaValidationException} exception trhown will be catch by this filter
 */
@Catch()
export default class AnyExceptionFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();

        const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const { message, name } = error;

        return response.status(status).json({
            status,
            message,
            name,
        } as ExceptionResponseDto);
    }
}
