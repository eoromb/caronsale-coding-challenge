import "reflect-metadata";
import { AuctionAggregator } from "./AuctionAggregator";
import { IAuction } from "../../CarOnSaleClient/interface/IAuction";
import { expect } from "chai";
import { Container } from "inversify";
import { ICarOnSaleClient } from "../../CarOnSaleClient/interface/ICarOnSaleClient";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";

function createCarOnSaleFake(auctions) {
    return {
        async getRunningAuctions() {
            return auctions;
        },
    };
}
describe("AuctionAggregator test", () => {
    const auction = {
        numBids: 2,
        currentHighestBidValue: 2,
        minimumRequiredAsk: 1,
    };
    const auction2 = {
        numBids: 4,
        currentHighestBidValue: 8,
        minimumRequiredAsk: 2,
    };
    const auctionWithZeroMinimumRequiredAskHasBids = {
        numBids: 2,
        currentHighestBidValue: 2,
        minimumRequiredAsk: 0,
    };
    const auctionWithZeroMinimumRequiredAskHasNoBids = {
        numBids: 0,
        currentHighestBidValue: 2,
        minimumRequiredAsk: 0,
    };
    let container: Container;
    beforeEach(() => {
        container = new Container({
            defaultScope: "Singleton",
        });
    });
    it("should return correct number of auctions", async () => {
        const auctions: IAuction[] = [auction, auction];
        const carOnSaleFake = createCarOnSaleFake(auctions);
        container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).toConstantValue(carOnSaleFake);
        const auctionAggregator = container.resolve(AuctionAggregator);
        const result = await auctionAggregator.getAuctionAggregatedInfo();
        expect(result.numberOfAuctions).to.be.equal(auctions.length);
    });
    it("should return correct aggregated info", async () => {
        const auctions: IAuction[] = [auction, auction2];
        const carOnSaleFake = createCarOnSaleFake(auctions);
        container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).toConstantValue(carOnSaleFake);
        const auctionAggregator = container.resolve(AuctionAggregator);
        const result = await auctionAggregator.getAuctionAggregatedInfo();
        expect(result.numberOfAuctions).to.be.equal(auctions.length);
        expect(result.avgNumBids).to.be.equal(auctions
            .map((a) => a.numBids)
            .reduce((a, b) => a + b, 0) / auctions.length);
        expect(result.avgPercentageOfAuctionProgress).to.be.equal(auctions
            .map((a) => AuctionAggregator.getPercentageOfAuctionProgress(a))
            .reduce((a, b) => a + b, 0) / auctions.length);
    });
    it("should get average percentage of auction progress equal 1 if minimumRequiredAsk is 0 and auction has bids", async () => {
        expect(AuctionAggregator.getPercentageOfAuctionProgress(auctionWithZeroMinimumRequiredAskHasBids)).to.be.equal(1);
    });
    it("should get average percentage of auction progress equal 0 if minimumRequiredAsk is 0 and auction has no bids", async () => {
        expect(AuctionAggregator.getPercentageOfAuctionProgress(auctionWithZeroMinimumRequiredAskHasNoBids)).to.be.equal(0);
    });
    it("should returns aggregation info equal to zero in case of no actions", async () => {
        const carOnSaleFake = createCarOnSaleFake([]);
        container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).toConstantValue(carOnSaleFake);
        const auctionAggregator = container.resolve(AuctionAggregator);
        const result = await auctionAggregator.getAuctionAggregatedInfo();
        expect(result.numberOfAuctions).to.be.equal(0);
        expect(result.avgNumBids).to.be.equal(0);
        expect(result.avgPercentageOfAuctionProgress).to.be.equal(0);
    });
});
