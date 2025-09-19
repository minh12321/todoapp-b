import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const generateRefreshToken = (user) => {
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  refreshTokens.push(token);
  return token;
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email đã được sử dụng" });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({name,email,password_hash,});

    res.status(201).json({ message: "Đăng ký thành công", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // Check trạng thái
    if (user.status !== "active") {
      return res.status(403).json({
        error: "Account locked",
        reason: user.status, 
      });
    }

    //khởi tạo số lần log
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      user.login_attempts += 1;
      if (user.login_attempts >= 5) {
        user.status = "locked_login";
      }
      await user.save();
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // restet log
    user.login_attempts = 0;
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const logout = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token);
  res.json({ message: "Logged out" });
};

export const refresh = (req, res) => {
  const { token } = req.body;
  if (!token || !refreshTokens.includes(token)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
};