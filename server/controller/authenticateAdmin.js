const User = require("../models/Admin");

const login = async (req, res) => {  
  const { email, password } = req.body;   

  try {
    const user = await User.findOne({ email });  

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  login,
};


// email : test@gmail.com
// password : test@123