import { createHash } from "crypto";
/**
 * Calculate password hash to be able to access CarOnSale API
 */
export class PasswordHash {
    /**
     * Hashes password using multiple hash cycles
     */
    public static hashPasswordWithCycles(plainTextPassword: string, cycles: number): string {
        let hashResult = plainTextPassword;
        for (let i = 0; i < cycles; i++) {
            hashResult = createHash("sha512")
                .update(hashResult)
                .digest("hex");
        }
        return hashResult;
    }
}
