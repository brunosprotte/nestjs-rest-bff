import { Module } from '@nestjs/common';
import { OrdersController } from './orders/orders.controller';
import { UsersService } from './users/users.service';
import { OrdersService } from './orders/orders.service';
import { UsersController } from './users/users.controller';
import { OrderClient } from './client/order/order.client';

@Module({
    imports: [],
    controllers: [UsersController, OrdersController],
    providers: [UsersService, OrdersService, OrderClient],
})
export class AppModule {}
