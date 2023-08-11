import { ValidationError } from 'class-validator';
import SchemaValidationException from '../filters/schema/schema-validation.exception';

/**
 * This function mapps the incoming error list to {@link AppValidationErros}
 *
 * {
 *  property: "email",
 *  message: [
 *      "Email usuário@email.com already in use"
 *  ]
 * }
 *
 * @param errors Errors list comming from NestJS Pipe Validation
 */
export default function schemaValidationErrorMapper(errors: ValidationError[]) {
  const validations = errors.map((error) => {
    const messages = Object.keys(error.constraints).map((key) => {
      return error.constraints[key];
    });

    return {
      property: error.property,
      messages,
    };
  });

  return new SchemaValidationException(validations);
}
