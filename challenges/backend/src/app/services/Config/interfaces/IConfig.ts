/**
 * Config interface
 */
export interface IConfig {
    getEmail(): string;
    getPassword(): string;
    getBaseUrl(): string;
}
