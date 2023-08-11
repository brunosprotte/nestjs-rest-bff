import { BadRequestException } from '@nestjs/common';
import ErrorResponseDto from '../../../dto/error.response.dto';

/**
 * Business exception class, used by NestJS filters on {@link main#bootsrap()}
 */
export default class BusinessValidationException extends BadRequestException {
    constructor(public businessValidationErrors: ErrorResponseDto[]) {
        super();
    }
}
