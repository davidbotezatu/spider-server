require("dotenv").config();
const User = require("../models/User");
const UserRole = require("../models/UserRole");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { redisClient } = require("../config/redis.config");

exports.login = async (req, res) => {
  try {
    const { email, parola } = req.body;
    const user = await User.findOne({
      include: [{ model: UserRole, as: "role" }],
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "User sau parola incorecte" });
    }

    const verifyPass = await bcrypt.compare(parola, user.parola);

    if (!verifyPass) {
      return res.status(401).json({ message: "User sau parola incorecte" });
    }

    var accessToken = jwt.sign(
      { id: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "8h" }
    );

    res.status(200).json({
      id: user.id,
      nume: user.nume,
      prenume: user.prenume,
      avatar: user.avatar,
      email: user.email,
      rol: user.role.nume,
      accessToken: accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(403).send({ message: "No token provided!" });

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.decode(token);
    const expTimeLeft = decodedToken.exp - Math.floor(Date.now() / 1000);

    if (expTimeLeft > 0) {
      await redisClient.set(token, "revoked", "EX", expTimeLeft);
    }

    res.status(200).json({ message: "Logout success" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
