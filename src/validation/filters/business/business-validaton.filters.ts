import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import ExceptionResponseDto from '../../../dto/exception.response.dto';
import BusinessValidationException from './business-validation.exception';

/**
 * Filter that implements {@link ExceptionFilter#catch()}
 *
 * All {@link BusinessValidationException} exception trhown will be catch by this filter
 */
@Catch(BusinessValidationException)
export default class BusinessValidationFilter implements ExceptionFilter {
    // eslint-disable-next-line class-methods-use-this
    catch(exception: BusinessValidationException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        return response.status(422).json({
            status: 422,
            message: 'Erro na validação dos campos',
            errors: exception.businessValidationErrors,
        } as ExceptionResponseDto);
    }
}
