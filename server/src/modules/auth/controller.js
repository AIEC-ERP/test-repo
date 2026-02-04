import { loginUserAuthentication, refreshUserToken,Logout } from "./services.js";

//Login controller
export const loginAuthenticate = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await loginUserAuthentication(username, password);
    res.cookie("refresh_token", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/auth/",
    });
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      access_token: result.accessToken,
      user: {
        username: result.user.username,
        role: result.user.role_name,
        role_id: result.user.role_id,
      },
    });
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    console.log("Login Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};

//Gettng new access token using refresh token -  controller code
export const refreshAuthToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refresh_token) {
    return res
      .status(401)
      .json({ success: false, message: "Missing refresh Token" });
  }
  try {
    const RefreshToken = cookies.jwt;
    const newAccessToken = await refreshUserToken(RefreshToken);
    return res
      .status(201)
      .json({
        success: true,
        message: "Access Token Generated Successfully",
        access_token: newAccessToken,
      });
  } catch (error) {
    console.log("Error Generating Access Token:", error);
    if (error.message === "INVALID_REFRESH_TOKEN")
      return res
        .status(403)
        .json({ success: false, message: "Refresh Token is not valid" });
  }
  return res.status(403).json({ success: false, message: error.message });
};

export const userLogout = async (req,res) =>{
  const cookies = req.cookies;
    if (!cookies?.jwt) {
        // No content to send back, user is already "logged out" locally
        return res.sendStatus(204); 
    }
}