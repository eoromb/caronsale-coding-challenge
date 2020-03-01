import { ICarOnSaleClient } from '../interface/ICarOnSaleClient';
import { IAuction } from '../interface/IAuction';
import * as superagent from 'superagent';
import { PasswordHash } from './PasswordHash';
import { IAuthenticationInfo } from '../interface/IAuthenticationInfo';
import { inject, injectable } from 'inversify';
import { DependencyIdentifier } from '../../../DependencyIdentifiers';
import { IConfig } from '../../Config/interfaces/IConfig';

/**
 * Car on sale client implementation
 */
@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    private authInfo: IAuthenticationInfo;
    public constructor(@inject(DependencyIdentifier.CONFIG) private config: IConfig) {
    }
    public async getRunningAuctions(): Promise<IAuction[]> {
        await this.authenticate();
        const auctionResult = await this.setHeaders(
            superagent
                .get(`${this.config.getBaseUrl()}/v1/auction/salesman/${this.authInfo.userId}/_all`)
        );
        return auctionResult.body;
    }
    private setHeaders(req: superagent.SuperAgentRequest): superagent.SuperAgentRequest {
        return req
            .set('userid', this.authInfo.userId)
            .set('authtoken', this.authInfo.token);
    }
    private async authenticate(): Promise<IAuthenticationInfo> {
        if (this.authInfo != null) {
            return this.authInfo;
        }
        const passwordHash = PasswordHash.hashPasswordWithCycles(this.config.getPassword(), 5);
        const authResult = await superagent
            .put(`${this.config.getBaseUrl()}/v1/authentication/${this.config.getEmail()}`)
            .send({ password: passwordHash });
        const { body: { token, userId } } = authResult;
        this.authInfo = { token, userId };

        return this.authInfo;
    }
}
