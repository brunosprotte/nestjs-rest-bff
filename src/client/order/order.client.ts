import { Injectable } from '@nestjs/common';
import { TracemarketApi } from '../../api/tracemarket-api';
import { FilterDTO } from '../../dto/query.dto';

@Injectable()
export class OrderClient {

    async getOrders(query: FilterDTO) {
        const api = new TracemarketApi()
        // return await api.selectAllField(query.query.select)
        //     .addAllWhere(query.query.where)
        //     .withPagination(query.query.pagination)
        //     .doGet("/orders")

        return {
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
    }
    


}