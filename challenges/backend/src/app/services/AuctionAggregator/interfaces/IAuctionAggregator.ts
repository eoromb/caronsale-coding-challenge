import { IAuctionAggregatedInfo } from './IAuctionAggregatedInfo';

/**
 * Auction aggregator interface
 */
export interface IAuctionAggregator {
    /**
     * Gets aggregated information
     */
    getAuctionAggregatedInfo(): Promise<IAuctionAggregatedInfo>;
}
