const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const { schimbareParola } = require("../utils/emailTemplates");
const { logout } = require("../controllers/authController");

const User = require("../models/User");

exports.changePassword = async (req, res) => {
  try {
    const { email, parolaVeche, parolaNoua } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const verifyPass = await bcrypt.compare(parolaVeche, user.parola);

    if (!verifyPass) {
      return res.status(401).json({ message: "User sau parola incorecte" });
    }

    const newPass = await bcrypt.hash(parolaNoua, 10);

    await user.update({ parola: newPass });

    sendEmail(email, schimbareParola.subiect, schimbareParola.text);
    logout(req, res);
    res.status(200);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Server error" });
  }
};
