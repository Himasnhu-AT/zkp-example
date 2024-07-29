import * as crypto from "crypto";
import { promisify } from "util";
import { AadhaarDetails } from "./aadhar.types";

const randomBytes = promisify(crypto.randomBytes);

/**
 * Calculates the modular exponentiation of a base raised to an exponent modulo a given modulus.
 * @param base - The base value.
 * @param exp - The exponent value.
 * @param mod - The modulus value.
 * @returns The result of the modular exponentiation.
 */
const modExp = (base: bigint, exp: bigint, mod: bigint) => {
  let result = 1n;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }
    exp = exp >> 1n;
    base = (base * base) % mod;
  }
  return result;
};

/**
 * Represents a Zero-Knowledge Proof for Aadhaar.
 */
class ZKPAadhaar {
  private static readonly N = 3233n;

  /**
   * Generates a proof for the given Aadhaar details.
   * @param details - The Aadhaar details.
   * @returns A promise that resolves to an object containing the proof, challenge, and response.
   */
  static async generateProof(
    details: AadhaarDetails
  ): Promise<{ proof: bigint; challenge: bigint; response: bigint }> {
    const x = BigInt("0x" + ZKPAadhaar.hashDetails(details));
    const r =
      BigInt("0x" + (await randomBytes(32)).toString("hex")) % ZKPAadhaar.N;
    const a = modExp(r, 2n, ZKPAadhaar.N);

    const challenge =
      BigInt("0x" + (await randomBytes(1)).toString("hex")) % 2n;

    const response = (r * modExp(x, challenge, ZKPAadhaar.N)) % ZKPAadhaar.N;

    return { proof: a, challenge, response };
  }

  /**
   * Verifies the proof for the given Aadhaar details.
   * @param details - The Aadhaar details.
   * @param proof - The proof, challenge, and response to verify.
   * @returns A boolean indicating whether the proof is valid or not.
   */
  static verifyProof(
    details: AadhaarDetails,
    proof: { proof: bigint; challenge: bigint; response: bigint }
  ): boolean {
    const x = BigInt("0x" + ZKPAadhaar.hashDetails(details));
    const left = modExp(proof.response, 2n, ZKPAadhaar.N);
    const right =
      (proof.proof * modExp(x, proof.challenge, ZKPAadhaar.N)) % ZKPAadhaar.N;

    return left === right;
  }

  private static hashDetails(details: AadhaarDetails): string {
    const data = JSON.stringify(details);
    return crypto.createHash("sha256").update(data).digest("hex");
  }
}

export const generateProof = ZKPAadhaar.generateProof;
export const verifyProof = ZKPAadhaar.verifyProof;
