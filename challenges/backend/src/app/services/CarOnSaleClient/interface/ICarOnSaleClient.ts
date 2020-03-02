import { IAuction } from "./IAuction";

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {
    getRunningAuctions(): Promise<IAuction[]>;
}
