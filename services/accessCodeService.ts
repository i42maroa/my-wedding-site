const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ346789"; 
const CODE_LEN = 6;

export const generateAccessCode = (len = CODE_LEN) =>{
  let out = "";
  for (let i = 0; i < len; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return formatCode(out);
}

const formatCode = (raw: string) =>{
  return `${raw.slice(0, 3)}-${raw.slice(3, 6)}`;
}
