import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { OrdersController } from './orders/orders.controller';
import { UsersService } from './users/users.service';
import { OrdersService } from './orders/orders.service';
import { UsersController } from './users/users.controller';
import { OrderClient } from './client/order/order.client';

@Module({
    imports: [],
    controllers: [AppController, UsersController, OrdersController],
    providers: [AppService, UsersService, OrdersService, OrderClient],
})
export class AppModule {}
