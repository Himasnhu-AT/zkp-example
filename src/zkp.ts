import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import { AadhaarDetails } from "./aadhar.types";
import { sampleAadharDetails } from "./sample";

// Load public and private keys
const publicKey = fs.readFileSync("./public.key", "utf8");
const privateKey = fs.readFileSync("./private.key", "utf8");

class AadhaarVerification {
  static signAadhaarDetails(details: AadhaarDetails): string {
    const token = jwt.sign(details, privateKey, { algorithm: "RS256" });
    // Save the token to a secure location or database
    // ...
    return token;
  }

  static verifyAadhaarDetails(
    token: string,
    originalData: AadhaarDetails
  ): boolean {
    try {
      var decoded = jwt.verify(token, publicKey, {
        algorithms: ["RS256"],
      }) as AadhaarDetails;
      console.log(decoded);
      delete (decoded as unknown as { iat?: Number })?.iat;
      const isVerified =
        JSON.stringify(decoded) === JSON.stringify(originalData);

      return isVerified;
    } catch (error) {
      console.error("Verification failed:", error);
      return false;
    }
  }
}

export const signAadhaarDetails = AadhaarVerification.signAadhaarDetails;
export const verifyAadhaarDetails = AadhaarVerification.verifyAadhaarDetails;
