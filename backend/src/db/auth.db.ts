import { BinaryLike } from 'crypto';
import { prisma } from '../app';
import { hashToken } from '../utils/hashToken';
import jwt from 'jsonwebtoken';

// used when we create a refresh token.
function createRefreshToken({
  jti,
  refreshToken,
  userId
}: {
  jti: jwt.Secret;
  refreshToken: BinaryLike;
  userId: string;
}) {
  return prisma.refreshToken.create({
    data: {
      refreshTokenId: jti,
      hashedToken: hashToken(refreshToken),
      userId
    }
  });
}

// used to check if the token sent by the client is in the database.
function getRefreshTokenById(refreshTokenId: string) {
  return prisma.refreshToken.findUnique({
    where: {
      refreshTokenId
    }
  });
}

// soft delete tokens after usage.
function deleteRefreshToken(refreshTokenId: string) {
  return prisma.refreshToken.update({
    where: {
      refreshTokenId
    },
    data: {
      revoked: true
    }
  });
}

function revokeUserRefreshTokens(userId: string) {
  return prisma.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}

export default {
  createRefreshToken,
  getRefreshTokenById,
  deleteRefreshToken,
  revokeUserRefreshTokens
};
