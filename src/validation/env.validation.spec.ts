import { mocked } from 'jest-mock';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import validateEnv from './env.validation';

jest.mock('class-transformer');
jest.mock('class-validator');

describe('env validation', () => {
    let mockedPlainToClass;
    let mockedValidateSync;
    describe('All environment variables was setted', () => {
        beforeEach(() => {
            mockedPlainToClass = mocked(plainToClass, true).mockReturnValue('validatedConfig');
            mockedValidateSync = mocked(validateSync, true).mockReturnValue([]);
        });

        afterEach(() => jest.resetAllMocks());

        it('should call plainToClass function', () => {
            const config: Record<string, unknown> = { teste: 'teste' };
            validateEnv(config);
            expect(mockedPlainToClass).toBeCalledWith(expect.anything(), config, { enableImplicitConversion: true });
        });

        it('should call validateSync function', () => {
            const config: Record<string, unknown> = { teste: 'teste' };
            validateEnv(config);
            expect(mockedValidateSync).toBeCalledWith('validatedConfig', { skipMissingProperties: false });
        });

        it('should return a validated config', () => {
            const config: Record<string, unknown> = { teste: 'teste' };
            const validConfig = validateEnv(config);
            expect(validConfig).toBe('validatedConfig');
        });
    });

    describe('Missing an environment variable', () => {
        beforeEach(() => {
            mockedPlainToClass = mocked(plainToClass, true).mockReturnValue('validatedConfig');
            mockedValidateSync = mocked(validateSync, true).mockReturnValue([
                {
                    value: NaN,
                    property: 'REDIS_PORT',
                    children: [],
                    constraints: {
                        isNumber: 'Msg Error',
                    },
                },
            ]);
        });

        afterEach(() => jest.resetAllMocks());

        it('should throw an error', () => {
            const tst = () => {
                const config: Record<string, unknown> = { teste: 'teste' };
                validateEnv(config);
            };
            expect(tst).toThrow();
        });
    });
});
