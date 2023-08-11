import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import BusinessValidationFilter from '../src/validation/filters/business/business-validaton.filters';
import SchemaValidationFilter from '../src/validation/filters/schema/schema-validaton.filters';
import AnyExceptionFilter from '../src/validation/filters/server-error/any-exception.filters';
import schemaValidationErrorMapper from '../src/validation/model/schema-validation-error.mapper';
import { ComparisonOperator, FilterDTO } from '../src/dto/query.dto';


describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

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

        await app.init();
    });

    it('/ (GET)', () => {

        const EQ = ComparisonOperator.EQ;
        const GE = ComparisonOperator.GE;
  
        const filterDTO: FilterDTO = {
            select: ['name', 'age', 'status'],
            where: [{field: 'name', value: 'john doe', operation: EQ}, {field: 'age', operation: GE, value: '10'}],
            pagination: {
                order: 'asc',
                page: 1,
                pageSize: 10,
            }
        };

        const expected = JSON.stringify(filterDTO);

        return request(app.getHttpServer())
        .get('/')
        .query({query: JSON.stringify(filterDTO)})
        .expect(200)
        .expect(expected);

    });
});
