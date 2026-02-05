const usersCollection = require("../DB/Models/users.model");
const bcrypt = require("bcryptjs");

console.log(require("crypto").randomBytes(64).toString("hex"));

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

const loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    const existingUser = await usersCollection.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    console.log(isMatch)
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: existingUser._id, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
    );

    res.json({ success: true, token });
  } catch (error) {
    console.error(err, err.message);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports = { registerUser, loginUser };
