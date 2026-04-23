const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ346789"; 
const CODE_LEN = 4;

export const generateAccessCode = (len = CODE_LEN) =>{
  let out = "";
  for (let i = 0; i < len; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}