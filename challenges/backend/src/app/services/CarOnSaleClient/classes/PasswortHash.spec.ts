import { PasswordHash } from './PasswordHash';
import { expect } from 'chai';

describe('PasswordHash tests', () => {
    it('should correctly calculate password hash', () => {
        const plainTextPassword = '123';
        const expectedHash = '2ce45428f0c9fb4eacf3dcbc76c29d508e8d64dad60e4b0ca44e025c8756a0ddf08078b885ecf3ba17ccbfa3b518b8d5b411cda7f47e3c19e18b2eaa8d8805de';
        expect(PasswordHash.hashPasswordWithCycles(plainTextPassword, 5)).to.be.equal(expectedHash);
    });
});
