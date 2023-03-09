import crypto from 'crypto';

export function hashToken(token: crypto.BinaryLike) {
  return crypto.createHash('sha512').update(token).digest('hex');
}
