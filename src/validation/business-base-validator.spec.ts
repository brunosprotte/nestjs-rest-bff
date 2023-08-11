import BusinessBaseValidator from './business-base-validator';
import BusinessValidationException from './filters/business/business-validation.exception';

class DummyService extends BusinessBaseValidator {}

describe('BusinessBaseValidator', () => {
  describe('BusinessBaseValidator extended by a DummyClass', () => {
    let instance;
    beforeEach(() => {
      instance = new DummyService();
    });

    it('should add error to validationMessages when addError is called matching the expected shape when there is no previous messagem to the property', () => {
      type ExpectedListShape = [
        {
          property: string;
          message: [];
        },
      ];

      instance.addError('property', 'message');

      const { validationMessages } = instance;

      expect(validationMessages).toMatchObject<ExpectedListShape>(
        validationMessages,
      );
    });

    it('should add error to validationMessages when addError is called matching the expected shape when there is previous messagem to the property', () => {
      type ExpectedListShape = [
        {
          property: string;
          message: [];
        },
      ];

      instance.addError('property', 'message');
      instance.addError('property', 'message2');
      instance.addError('property', 'message3');

      const { validationMessages } = instance;

      expect(validationMessages).toMatchObject<ExpectedListShape>(
        validationMessages,
      );
    });

    it('should add error to validationMessages when addError is called matching the expected shape when there is several validations', () => {
      type ExpectedListShape = [
        {
          property: string;
          message: [];
        },
      ];

      instance.addError('property', 'message');
      instance.addError('property', 'message2');
      instance.addError('property', 'message3');

      instance.addError('property2', 'message');
      instance.addError('property2', 'message2');
      instance.addError('property2', 'message3');

      const { validationMessages } = instance;

      expect(validationMessages).toMatchObject<ExpectedListShape>(
        validationMessages,
      );
    });

    it('should add error to validationMessages when addError is called', () => {
      instance.addError('property', 'message');

      expect(() => {
        instance.throwFoundErrors();
      }).toThrow(BusinessValidationException);
    });
  });
});
