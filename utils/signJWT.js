import jwt from "jsonwebtoken";

const signJWT = (id) => {
  const token = jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET_KEY
  );
  return token;
};

export default signJWT;
