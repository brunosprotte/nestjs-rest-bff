/**
 * Business validations error model
 *
 * status: HTTP status code, 400 will be used if none was informed by validators
 * property: DTO/Entity property under validation name
 * message: A list of validations fails for the property
 */
export default class ServerErrorErros {
  stackTrace: string;
}
