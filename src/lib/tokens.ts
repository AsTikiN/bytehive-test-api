import jwt from "jsonwebtoken";

const secretKey = "O27cu0XqK2";

export const generateToken = (payload: Record<string, string>, expiresIn: string): string =>
  jwt.sign(payload, secretKey, { expiresIn, algorithm: "HS256" });

export const extractPayloadFromToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
};
