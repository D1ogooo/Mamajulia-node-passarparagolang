import dotenv from 'dotenv';
dotenv.config();

const jwtConfig = {
  secretJWT: process.env.JWT_SECRET,
}

export { jwtConfig }