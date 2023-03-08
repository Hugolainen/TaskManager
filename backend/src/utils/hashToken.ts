import crypto from 'crypto';

function hashToken(token: crypto.BinaryLike) {
  return crypto.createHash('sha512').update(token).digest('hex');
}

module.exports = { hashToken };
