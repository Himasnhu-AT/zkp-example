import { signAadhaarDetails, verifyAadhaarDetails } from "./zkp";
import { AadhaarDetails } from "./aadhar.types";
import { sampleAadharDetails } from "./sample";

describe("AadhaarVerification", () => {
  let token: string;

  beforeAll(() => {
    token = signAadhaarDetails(sampleAadharDetails);
  });

  test("should verify the token and return true if it's correct", () => {
    const verified = verifyAadhaarDetails(token, sampleAadharDetails);
    expect(verified).toBe(true);
  });

  test("should fail verification with an invalid token", () => {
    const verified = verifyAadhaarDetails("invalid-token", sampleAadharDetails);
    expect(verified).toBe(false);
  });

  test("should return true if its correct", () => {
    const verified = verifyAadhaarDetails(token, sampleAadharDetails);
    expect(verified).toBe(true);
  });

  test("should return false if its incorrect", () => {
    const wrongData: AadhaarDetails = sampleAadharDetails;
    wrongData.email = "";
    const verified = verifyAadhaarDetails(token, wrongData);
    expect(verified).toBe(false);
  });
});
