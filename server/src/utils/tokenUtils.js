import jwt from "jsonwebtoken";

export const generateAccessToken = async (payload) => {
  try {
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
      algorithm: "HS256", // Using the HMAC-SHA256 algorithm
    });
    return access_token;
  } catch (error) {
    console.error("Error generating access token:", error);
    return null;
  }
};

export const generateRefreshToken = async (payload) => {
  try {
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
      algorithm: "HS256",
    });
    return refresh_token;
  } catch (error) {
    console.error("Error generating access token:", error);
    return null;
  }
};
