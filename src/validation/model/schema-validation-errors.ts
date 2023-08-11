/**
 * Schema validation error model
 *
 * property: DTO property under validation name
 * message: A list of validations fails for the property
 */
export default class SchemaValidationErrors {
  property: string;

  message: string[];
}
