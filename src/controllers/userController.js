import bcrypt from "bcrypt";
import User from "../models/User.js";

export const getMe = async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: { exclude: ["password_hash"] } });
  res.json(user);
};

export const updateMe = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findByPk(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.name = name || user.name;
  user.email = email || user.email;
  await user.save();

  res.json({
    message: "Profile updated",
    user: { id: user.id, name: user.name, email: user.email }
  });
};

export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findByPk(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const match = await bcrypt.compare(oldPassword, user.password_hash);
  if (!match) return res.status(400).json({ error: "Wrong old password" });

  user.password_hash = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password updated" });
};
