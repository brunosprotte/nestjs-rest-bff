import ErrorResponse from '../dto/error.response.dto';
import BusinessValidationException from './filters/business/business-validation.exception';

/**
 * Abstract class with logic to add business validation message and return an exception at the end of validation
 */
export default abstract class BusinessBaseValidator {
    /**
     * This list will receive errors added by {@link this.addError} and will be trown by {@link this.throwFoundErrors}
     */
    private validationMessages: ErrorResponse[] = [];

    /**
     * Adds the message to the property in validationMessages list if already existes otherwise adds the property to the list
     *
     * @param property property/field under validation name's
     * @param message validation message presented to the user
     */
    addError(property: string, message: string) {
        const existentValidation = this.validationMessages.find(validation => validation.property === property);

        if (existentValidation) {
            existentValidation.message.push(message);

            const newValidations = this.validationMessages.filter(validation => validation.property !== property);
            newValidations.push(existentValidation);
            return;
        }

        this.validationMessages.push({
            property,
            message: [message],
        });
    }

    /**
     * Throw errors if any
     */
    throwFoundErrors() {
        if (this.validationMessages.length > 0) {
            throw new BusinessValidationException(this.validationMessages);
        }
    }
}
