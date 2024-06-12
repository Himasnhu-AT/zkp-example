var MagicBox = /** @class */ (function () {
    function MagicBox(secretColor) {
        this.secretColor = secretColor;
    }
    MagicBox.prototype.verifyColor = function (color) {
        return this.secretColor === color;
    };
    return MagicBox;
}());
var Prover = /** @class */ (function () {
    function Prover(color) {
        this.color = color;
    }
    Prover.prototype.proveColor = function (magicBox) {
        return magicBox.verifyColor(this.color);
    };
    return Prover;
}());
var Verifier = /** @class */ (function () {
    function Verifier() {
    }
    Verifier.prototype.verify = function (prover, magicBox, testColor) {
        var originalSecretColor = magicBox.secretColor; // Only for demo purposes, to simulate the box having a hidden state
        magicBox.secretColor = testColor;
        var result = prover.proveColor(magicBox);
        magicBox.secretColor = originalSecretColor; // Restore original color
        return result;
    };
    return Verifier;
}());
var myColor = 'Blue'; // Prover's color
var testColor = 'Red';
var prover = new Prover(myColor);
var magicBox = new MagicBox(testColor);
var verifier = new Verifier();
var isColorVerified = verifier.verify(prover, magicBox, testColor);
console.log("Is the prover's color verified? ".concat(isColorVerified));
