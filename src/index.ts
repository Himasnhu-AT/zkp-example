import { signAadhaarDetails, verifyAadhaarDetails } from "./zkp";
import { sampleAadharDetails } from "./sample";

const token = signAadhaarDetails(sampleAadharDetails)
console.log(verifyAadhaarDetails(token, sampleAadharDetails))
