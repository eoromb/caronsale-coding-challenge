import { IAuction } from "../interface/IAuction";

/**
 * Maps http responses to model
 */
export class AuctionMapper {
    /**
     * Maps http auction to model
     */
    public static mapHttpAuctionToModel(body: any): IAuction {
        return body;
    }
    /**
     * Maps http auctions to models
     */
    public static mapHttpAuctionsToModels(body: any): IAuction[] {
        return body.map(AuctionMapper.mapHttpAuctionToModel);
    }
}
