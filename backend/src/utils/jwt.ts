import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

// Usually I keep the token between 5 minutes - 15 minutes
function generateAccessToken(user: User) {
  return jwt.sign(
    { userId: user.userId },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: '5m'
    }
  );
}

// Expires after 5h of inactivity
function generateRefreshToken(user: User, jti: jwt.Secret) {
  return jwt.sign(
    {
      userId: user.userId,
      jti
    },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: '15h'
    }
  );
}

function generateTokens(user: User, jti: jwt.Secret) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken
  };
}

export default {
  generateAccessToken,
  generateRefreshToken,
  generateTokens
};
