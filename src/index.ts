// index.ts
import { generateProof, verifyProof } from "./zkp";
import { sampleAadharDetails, wrongAadharDetails } from "./sample";

// (async () => {
//   const proof = await generateProof(sampleAadharDetails);
//   const isValid = verifyProof(sampleAadharDetails, proof);
//   console.log("Proof is valid:", isValid);
// })();

// (async () => {
//   const proof = await generateProof(sampleAadharDetails);
//   const isValid = verifyProof(wrongAadharDetails, proof);
//   console.log("Proof is valid:", isValid);
// })();
