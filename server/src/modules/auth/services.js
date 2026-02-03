import { findUserByUsername, updateRefreshToken } from "./model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/tokenUtils.js";
import bcrypt from "bcrypt";

export const loginUserAuthentication = async (username, password) => {
  
    const userResult = await findUserByUsername(username);
    if (!userResult || userResult.length === 0) {
      throw new Error("Invalid credentials");
      //return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const user = userResult[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Invalid credentials");
    //return res.status(401).json({success:false, message: "Invalid credentials" });
    const tokenPayload = {
      UserInfo: {
        id: user.id,
        username: user.username,
        role: user.role_name,
        //role_id: user.role_id
      },
    };

    const accessToken = await generateAccessToken(tokenPayload);
    const refreshToken = await generateRefreshToken(tokenPayload);
    await updateRefreshToken(refresh_token, user.id);

    return {
      user,
      accessToken,
      refreshToken,
    };

};
