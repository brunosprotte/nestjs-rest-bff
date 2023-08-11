import { BadRequestException } from '@nestjs/common';

/**
 * Schema exception class, used by NestJS filters on {@link main#bootsrap()}
 */
export default class SchemaValidationException extends BadRequestException {
  constructor(public schemaValidationErrors) {
    super();
  }
}
