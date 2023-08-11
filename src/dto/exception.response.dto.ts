import ErrorResponse from './error.response.dto';

export default class ExceptionResponseDto {
    status: number;

    message: string;

    name?: string;

    errors?: ErrorResponse[];
}
