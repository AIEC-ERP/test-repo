import { findUserByUsername, updateRefreshToken,findUserByRefreshToken,userLogoutQuery } from "./model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/tokenUtils.js";
import bcrypt from "bcrypt";

//Login services (checks user credentials and generating new refresh token and access token)
export const loginUserAuthentication = async (username, password) => {
  
    const userResult = await findUserByUsername(username);
    if (!userResult || userResult.length === 0) {
      throw new Error("Invalid credentials");
    }

    const user = userResult[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Invalid credentials");
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
    await updateRefreshToken(refreshToken, user.id);

    return {
      user,
      accessToken,
      refreshToken,
    };

};

//checking refresh token validation and generating new access token
export const refreshUserToken = async (token) =>{
const user = await findUserByRefreshToken(token);
if (user.length === 0) {
        throw new Error("REFRESH_TOKEN_NOT_MATCHING");
    }
    return new Promise((resolve, reject) => {
      jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(err,decoded)=>{
        if (err || user.id !== decoded.UserInfo.id) {
                     return reject(new Error("INVALID_REFRESH_TOKEN"));
                }
                const tokenPayload = {
                    UserInfo: {
                        id: user.id,
                        username: user.username,
                        role: user.role_name,
                        role_id: user.role_id
                    }
                };
                const newAccessToken = generateAccessToken(tokenPayload);
                resolve(newAccessToken);
      })
    })
}

export const Logout = async (token)=>{
  
}