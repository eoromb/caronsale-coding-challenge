import { IAuctionAggregator } from "../interfaces/IAuctionAggregator";
import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ICarOnSaleClient } from "../../CarOnSaleClient/interface/ICarOnSaleClient";
import { IAuctionAggregatedInfo } from "../interfaces/IAuctionAggregatedInfo";
import { IAuction } from "../../CarOnSaleClient/interface/IAuction";

/**
 * Auction aggregator implementation
 */
@injectable()
export class AuctionAggregator implements IAuctionAggregator {
    /**
     * Gets percentage of auction progress
     */
    public static getPercentageOfAuctionProgress(auction: IAuction): number {
        return auction.minimumRequiredAsk !== 0 ?
            (auction.currentHighestBidValue / auction.minimumRequiredAsk) :
            (auction.numBids > 0 ?
                1 : 0);
    }
    public constructor(@inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private carOnSaleClient: ICarOnSaleClient) {
    }
    /**
     * Gets auctions aggregated information
     */
    public async getAuctionAggregatedInfo(): Promise<IAuctionAggregatedInfo> {
        const auctions = await this.carOnSaleClient.getRunningAuctions();
        if (!Array.isArray(auctions)) {
            throw new Error("auctions must be array");
        }
        if (auctions.length === 0) {
            return {
                numberOfAuctions: 0,
                avgNumBids: 0,
                avgPercentageOfAuctionProgress: 0,
            };
        }
        let numBidsTotal = 0;
        let percentageOfAuctionProgressTotal = 0;
        for (const auction of auctions) {
            numBidsTotal += auction.numBids;
            percentageOfAuctionProgressTotal += AuctionAggregator.getPercentageOfAuctionProgress(auction);
        }
        const numberOfAuctions = auctions.length;
        return {
            numberOfAuctions,
            avgNumBids: numBidsTotal / numberOfAuctions,
            avgPercentageOfAuctionProgress: percentageOfAuctionProgressTotal / numberOfAuctions,
        };
    }
}
