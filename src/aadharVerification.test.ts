import { generateProof, verifyProof } from "./zkp";
import { sampleAadharDetails, wrongAadharDetails } from "./sample";
import { before } from "node:test";

// (async () => {
//   const proof = await generateProof(sampleAadharDetails);
//   const isValid = verifyProof(sampleAadharDetails, proof);
//   console.log("Proof is valid:", isValid);
// })();

describe("Aadhar Verification", () => {
  it("should return true for valid aadhar details", async () => {
    const proof = await generateProof(sampleAadharDetails);
    const isValid = verifyProof(sampleAadharDetails, proof);
    expect(isValid).toBe(true);
  });

  it("should return false for invalid aadhar details", async () => {
    const proof = await generateProof(sampleAadharDetails);
    const isValid = verifyProof(wrongAadharDetails, proof);
    expect(isValid).toBe(false);
  });
});
