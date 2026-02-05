const usersCollection = require("../DB/Models/users.model");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { password, ...data } = req.body;

    const pwdHash = await bcrypt.hash(password, 10);
    await usersCollection.create({ ...data, password: pwdHash });
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occured" });
  }
};

module.exports = { registerUser };
