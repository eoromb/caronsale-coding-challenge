import { IConfig } from '../interfaces/IConfig';
import { injectable } from 'inversify';

/**
 * Provider configuration
 */
@injectable()
export class Config implements IConfig {
    public getEmail(): string {
        return 'salesman@random.com';
    }
    public getPassword(): string {
        return '123test';
    }
    public getBaseUrl(): string {
        return 'https://caronsale-backend-service-dev.herokuapp.com/api';
    }
}
