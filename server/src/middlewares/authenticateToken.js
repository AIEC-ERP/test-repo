import { jwt } from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access Token Required" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.message === "jwt expired") {
        return res.status(401).json({ message: "Access Token expired" });
      }
      if (err.message === "jwt malformed") {
        return res
          .status(403)
          .json({ message: "Invalid token. Please provide a valid token." });
      }

      return res.status(403).json({ message: err.message });
    }
    req.user = decoded.UserInfo;
    next();
  });
};
