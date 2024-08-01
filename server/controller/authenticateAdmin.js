const authenticateAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    var result;
    if (email === "test@gmail.com" && password === "test@123") {
      result = { isAuthenticated: true, error: null };
    } else {
      result = { isAuthenticated: false, error: "Invalid email or password" };
    }

    if (result.isAuthenticated) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: result.error });
    }
  } catch (e) {
    console.error("Error Authenticate", e);
    res.status(500).json({ message: "Server Error", e: e.message });
  }
};

module.exports = {
  authenticateAdmin,
};
