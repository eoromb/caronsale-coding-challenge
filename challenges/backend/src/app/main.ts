import {Container} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {Logger} from "./services/Logger/classes/Logger";
import {AuctionMonitorApp} from "./AuctionMonitorApp";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import { IConfig } from './services/Config/interfaces/IConfig';
import { Config } from './services/Config/classes/Config';
import { ICarOnSaleClient } from './services/CarOnSaleClient/interface/ICarOnSaleClient';
import { CarOnSaleClient } from './services/CarOnSaleClient/classes/CarOnSaleClient';
import { IAuctionAggregator } from './services/AuctionAggregator/interfaces/IAuctionAggregator';
import { AuctionAggregator } from './services/AuctionAggregator/classes/AuctionAggregator';

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<IConfig>(DependencyIdentifier.CONFIG).to(Config);
container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);
container.bind<IAuctionAggregator>(DependencyIdentifier.AUCTION_AGGREGATOR).to(AuctionAggregator);

/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    try {
        await app.start();
        process.exit(0);
    } catch (error) {
        process.exit(-1);
    }
})();
