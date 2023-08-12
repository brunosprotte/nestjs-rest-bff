import { Injectable } from '@nestjs/common';
import { TracemarketQueryBuilder } from '../../api/tracemarket-query-builder';
import { FilterDTO } from '../../dto/query.dto';
import { api } from '../../api/api';

@Injectable()
export class OrderClient {

    async getById(orderId: string) {
        try {
            console.log('getOrderById - ', orderId)

            console.log(api.getUri())

            const {data} = await api.get(`/orders/${orderId}`)
            return data
        } catch(e) {
            throw new Error(e)
        }
    }

    async getOrders(query: FilterDTO) {
        const api = new TracemarketQueryBuilder()
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