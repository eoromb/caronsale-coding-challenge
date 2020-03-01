import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { IAuctionAggregator } from './services/AuctionAggregator/interfaces/IAuctionAggregator';

@injectable()
export class AuctionMonitorApp {
    public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger,
                       @inject(DependencyIdentifier.AUCTIONAGGREGATOR) private auctionAggregator: IAuctionAggregator) {
    }
    public async start(): Promise<void> {
        this.logger.log(`Auction Monitor started.`);
        const aggregatedInfo = await this.auctionAggregator.getAuctionAggregatedInfo();
        this.logger.log(`Number of auctions: ${aggregatedInfo.numberOfAuctions}`);
        this.logger.log(`Average number of bids: ${aggregatedInfo.avgNumBids}`);
        this.logger.log(`Average percentage of auction progress: ${aggregatedInfo.avgPercentageOfAuctionProgress}`);
        this.logger.log(`Auction Monitor stopped.`);
    }
}
