const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const getJwtAccessSecret = (): string => {
  if (!JWT_ACCESS_SECRET) {
    throw new Error("it's shit");
  }

  return JWT_ACCESS_SECRET;
};

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const getJwtRefreshSecret = (): string => {
  if (!JWT_REFRESH_SECRET) {
    throw new Error("it's shit");
  }

  return JWT_REFRESH_SECRET;
};

const JWT_SECRET = process.env.JWT_SECRET;
const getJwtSecret = (): string => {
  if (!JWT_SECRET) {
    throw new Error("it's shit");
  }

  return JWT_SECRET;
};
export default { jwtSecret: getJwtSecret() };

// TODO: Add Jwt env variable check
// const start = async () => {
//     try {
//       if(!process.env.JWT_KEY){
//         throw new Error('JWT_KEY must be defined')
//       }
//       //Connect to database or ...
//     } catch (error) {
//       console.log(error)
//     }
//   }
