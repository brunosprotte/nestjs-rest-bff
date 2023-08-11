import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import SchemaValidationException from '../validation/filters/schema/schema-validation.exception';
import { FilterDTO, QueryDTO } from '../dto/query.dto';

export class QueryConverterPipe implements PipeTransform {
    async transform(query: any, metadata: ArgumentMetadata): Promise<QueryDTO> {
        const dto = plainToClass(FilterDTO, JSON.parse(query.query));

        const errors = await validate(dto);

        if (errors.length) throw new SchemaValidationException(errors);

        return { query: dto };
    }
}
