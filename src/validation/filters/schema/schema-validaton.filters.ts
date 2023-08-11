import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import SchemaValidationException from './schema-validation.exception';

/**
 * Filter that implements {@link ExceptionFilter#catch()}
 *
 * All {@link SchemaValidationException} exception trhown will be catch by this filter
 */
@Catch(SchemaValidationException)
export default class SchemaValidationFilter implements ExceptionFilter {
    // eslint-disable-next-line class-methods-use-this
    catch(exception: SchemaValidationException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        return response.status(422).json({
            status: 422,
            message: 'Erro na validação dos campos',
            errors: exception.schemaValidationErrors,
        });
    }
}
