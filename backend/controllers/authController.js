const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

function signToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function sanitize(user) {
  const { password, ...rest } = user.toJSON();
  return rest;
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Lengkapi semua data." });
    }

    const exist = await User.findOne({ where: { email } });
    if (exist) {
      return res.status(409).json({ success: false, message: "Email sudah digunakan." });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const token = signToken(user);

    res.status(201).json({ success: true, token, user: sanitize(user) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: "Email atau Password salah." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Email atau Password salah." });
    }

    const token = signToken(user);

    res.json({ success: true, token, user: sanitize(user) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.me = async (req, res) => {
  const user = await User.findByPk(req.userId);
  if (!user) return res.status(404).json({ success: false, message: "User tidak ditemukan." });
  res.json({ success: true, user: sanitize(user) });
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User tidak ditemukan." });

    const { name, nim, semester, phone, university, program, photo } = req.body;

    await user.update({
      name: name ?? user.name,
      nim: nim ?? user.nim,
      semester: semester ?? user.semester,
      phone: phone ?? user.phone,
      university: university ?? user.university,
      program: program ?? user.program,
      photo: photo ?? user.photo,
    });

    res.json({ success: true, user: sanitize(user) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
