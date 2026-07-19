import Hashids from 'hashids';

const hashids = new Hashids('akademi-umkm-digital-secret-salt', 8);

/**
 * Encodes a numeric ID into an obfuscated string.
 * @param {number|string} id 
 * @returns {string}
 */
export const encodeId = (id) => {
    if (!id) return '';
    // Hashids requires numeric input
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return id; // Fallback if not a number
    return hashids.encode(numericId);
};

/**
 * Decodes an obfuscated string back into a numeric ID.
 * @param {string} encodedId 
 * @returns {number|string}
 */
export const decodeId = (encodedId) => {
    if (!encodedId) return '';
    const decoded = hashids.decode(encodedId);
    if (decoded.length === 0) return encodedId; // Fallback if cannot decode
    return decoded[0];
};
