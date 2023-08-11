import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import BusinessValidationFilter from '../../src/validation/filters/business/business-validaton.filters';
import SchemaValidationFilter from '../../src/validation/filters/schema/schema-validaton.filters';
import AnyExceptionFilter from '../../src/validation/filters/server-error/any-exception.filters';
import schemaValidationErrorMapper from '../../src/validation/model/schema-validation-error.mapper';
import { ComparisonOperator } from '../../src/dto/query.dto';
import { TracemarketQueryBuilder } from '../../src/api/tracemarket-query-builder';

const complete_order = {
        id: 'orderId',
        externalId: 'orderExternalId',
        externalOrderNumber: '20',
        orderNumber: '10',
        status: 'orderStatus',
        userId: 'userId',
        externalUserId: 'userExternalId',
        userName: 'userName',
        itens: [{
            id: 'itemId',
            externalId: 'itemExternalId',
            description: 'itemDescription',
            value: 10,
            amount: 10,
            images: [{
                id: 'imageId',
                externalId: 'imageExternalId',
                url: 'imageURL',
                description: 'imageDescription',
            }]
        },],
        orderTotalValue: 100,
        payment: {
            id: 'paymentId',
            externalId: 'paymentExternalId',
        }
}

describe('Orders (e2e)', () => {
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

    it('GET - /orders/:id ', async () => {

        const expected = JSON.stringify(complete_order);

        return request(app.getHttpServer())
            .get('/orders/orderId')
            .expect(200)
            .expect(expected);
    });

    it('GET - findAll ', () => {

        const expected = JSON.stringify({
            id: 'orderId',
            externalId: 'orderExternalId',
            externalOrderNumber: '20',
            orderNumber: '10',
            status: 'orderStatus',
            userId: 'userId',
            externalUserId: 'userExternalId',
            userName: 'userName',
            itens: [{
                id: 'itemId',
                externalId: 'itemExternalId',
                description: 'itemDescription',
                value: 10,
                amount: 10,
                images: [{
                    id: 'imageId',
                    externalId: 'imageExternalId',
                    url: 'imageURL',
                    description: 'imageDescription',
                }]
            },],
            orderTotalValue: 100,
            payment: {
                id: 'paymentId',
                externalId: 'paymentExternalId',
            }
        });

        // api.selectField('api').selectField('externalId')
        const api = new TracemarketQueryBuilder();
        const query = api
            .selectMultipleField(['api', 'externalId', 'externalOrderNumber', 'orderNumber', 'status', 'userId', 'externalUserId', 'userName', 'orderTotalValue', 'items'])
            .withWhere({field:'userId', operation: ComparisonOperator.EQ, value: '123'})
            .withPagination({sortBy: ['orderTotalValue', 'status'], order: 'asc', page: 1, pageSize: 10})
            .buildQuery()

        return request(app.getHttpServer())
            .get('/orders')
            .query({query})
            .expect(200)
            .expect(expected);

    });
});
