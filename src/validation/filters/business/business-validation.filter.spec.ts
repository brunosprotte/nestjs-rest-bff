import BusinessValidationException from './business-validation.exception';
import BusinessValidationFilter from './business-validaton.filters';

describe('BusinessValidationFilter', () => {
    let jsonMock;
    let statusMock;
    let host;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({
            json: jsonMock,
        });

        host = {
            getArgs: jest.fn(),
            getArgByIndex: jest.fn(),
            switchToRpc: jest.fn(),
            switchToWs: jest.fn(),
            getType: jest.fn(),
            switchToHttp: jest.fn().mockReturnValue({
                getResponse: jest.fn().mockReturnValue({
                    status: statusMock,
                }),
            }),
        };

        const businessValidationException = new BusinessValidationException([
            {
                property: 'basicAttributes.multichannelProductType.description',
                message: ['Campo obrigatório'],
            },
        ]);
        new BusinessValidationFilter().catch(businessValidationException, host);
    });

    it("sets the error's status on the response", () => {
        const statusError = 422;

        expect(statusMock).toHaveBeenCalledWith(statusError);
        expect(jsonMock).toHaveBeenLastCalledWith(expect.objectContaining({ status: statusError }));
    });

    it("sets the error's message on the response", () => {
        expect(jsonMock).toHaveBeenLastCalledWith(expect.objectContaining({ message: 'Erro na validação dos campos' }));
    });

    it("sets the error's array on the response", () => {
        expect(jsonMock).toHaveBeenLastCalledWith(
            expect.objectContaining({
                errors: [
                    {
                        property: 'basicAttributes.multichannelProductType.description',
                        message: ['Campo obrigatório'],
                    },
                ],
            }),
        );
    });
});
