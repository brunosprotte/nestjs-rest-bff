import { Injectable } from '@nestjs/common';
import { FilterDTO } from '../../dto/query.dto';
import { api } from '../../api/api';

@Injectable()
export class UserClient {

    async getById(userId: string) {
        try {
            const {data} = await api.get(`/users/${userId}`)
            return data
        } catch(e) {
            throw new Error(e)
        }
    }

    async getUsers(query: FilterDTO) {
        return {
            userId: 'userId',
            externalUserId: 'userExternalId',
            userName: 'userName'
        }
    }
}