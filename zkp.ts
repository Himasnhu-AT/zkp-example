type BallColor = 'Red' | 'Green' | 'Blue' | 'Yellow';

class MagicBox {
  private secretColor: BallColor;

  constructor(secretColor: BallColor) {
    this.secretColor = secretColor;
  }

  public verifyColor(color: BallColor): boolean {
    return this.secretColor === color;
  }
}

class Prover {
  private color: BallColor;

  constructor(color: BallColor) {
    this.color = color;
  }

  public proveColor(magicBox: MagicBox): boolean {
    return magicBox.verifyColor(this.color);
  }
}

class Verifier {
  public verify(prover: Prover, magicBox: MagicBox, testColor: BallColor): boolean {
    const originalSecretColor = (magicBox as any).secretColor; // Only for demo purposes, to simulate the box having a hidden state
    (magicBox as any).secretColor = testColor;
    const result = prover.proveColor(magicBox);
    (magicBox as any).secretColor = originalSecretColor; // Restore original color
    return result;
  }
}

const myColor: BallColor = 'Blue'; // Prover's color
const testColor: BallColor = 'Blue'; // Color to verify against

const prover = new Prover(myColor);
const magicBox = new MagicBox(testColor);
const verifier = new Verifier();

const isColorVerified = verifier.verify(prover, magicBox, testColor);
console.log(`Is the prover's color verified? ${isColorVerified}`);

