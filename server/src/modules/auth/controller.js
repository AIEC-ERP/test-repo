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
    if (error.message === "Invalid credentials") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    console.log("Login Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error"});
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
    if (!cookies?.refresh_token) {
        return res.status(204).json({success:true, message:"User is logged out Successfully"}); 
    }
    try {
       const refresh_token = cookies.refresh_token;
    const result = await Logout(refresh_token);
     res.clearCookie('refresh_token', { 
        httpOnly: true, 
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', 
        secure: process.env.NODE_ENV === 'production',
        path: '/api/auth/'
    });
    return  res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error occured during logout",error);
      return res.status(400).json({success:false, message:"Error during logout",error:error})
    }
   
}
