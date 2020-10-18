import Cryptr from 'cryptr';

export function encode(input: string, cypher: string): string {
    const cryptr = new Cryptr(cypher);
    const encryptedString = cryptr.encrypt(input);
    return encryptedString;
}

export function decode(input: string, cypher: string): string {
    const cryptr = new Cryptr(cypher);
    const decryptedString = cryptr.decrypt(input);
    return decryptedString;
}
