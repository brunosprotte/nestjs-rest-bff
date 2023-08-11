import { plainToClass } from 'class-transformer';
import { IsNotEmpty, IsNumber, validateSync } from 'class-validator';

class EnvironmentVariables {
    @IsNotEmpty()
    COMPOSITION_HOST: string;

    @IsNotEmpty()
    COMPOSITION_API_PATH: string;

    @IsNotEmpty()
    KONG_RD_CLIENT_ID: string;

    @IsNotEmpty()
    KONG_RD_CLIENT_SECRET: string;

    @IsNotEmpty()
    MS_PRODUCTS: string;

    @IsNumber()
    REDIS_PORT: number;

    @IsNumber()
    REDIS_DB: number;

    @IsNumber()
    SERVER_PORT: number;

    @IsNotEmpty()
    MS_MARKETPLACE: string;

    @IsNotEmpty()
    BASE_URL_DROGASIL: string;

    @IsNotEmpty()
    BASE_URL_RAIA: string;

    @IsNotEmpty()
    BASE_URL_ONOFRE: string;
}

function validateEnv(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}

export default validateEnv;
