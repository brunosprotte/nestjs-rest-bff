import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { QueryDTO } from '../dto/query.dto';
import { QueryConverterPipe } from '../converter/QueryConverterPipe';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @UsePipes(new QueryConverterPipe())
    getHello(@Query() query: QueryDTO): string {
        console.log('raw: ', query.query);
        return JSON.stringify(query.query);
    }
}
