import { loginUserAuthentication } from "./services.js";

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
