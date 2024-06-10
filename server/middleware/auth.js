const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Expecting format: "Bearer {token}"
  console.log("Token received:", token);

  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });

  try {
    const verified = jwt.verify(token, "secretkey123");
    console.log("Token verified:", verified);
    req.user = verified;
    next();
  } catch (err) {
    console.error("Invalid Token Error:", err);
    return res.status(401).json({ message: "Access Denied: Invalid token" });
  }
};

module.exports = verifyToken;
