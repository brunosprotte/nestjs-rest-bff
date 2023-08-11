import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import BusinessValidationFilter from './validation/filters/business/business-validaton.filters';
import SchemaValidationFilter from './validation/filters/schema/schema-validaton.filters';
import AnyExceptionFilter from './validation/filters/server-error/any-exception.filters';
import schemaValidationErrorMapper from './validation/model/schema-validation-error.mapper';
import { AppModule } from './app.module';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // From the most generic to the most specific
    app.useGlobalFilters(new AnyExceptionFilter(), new SchemaValidationFilter(), new BusinessValidationFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            validationError: {
                target: false,
                value: false,
            },
            forbidNonWhitelisted: true,
            // forbidUnknownValues: true,
            whitelist: true,
            exceptionFactory: schemaValidationErrorMapper,
        }),
    );

    await app.listen(3000);
}
bootstrap();
