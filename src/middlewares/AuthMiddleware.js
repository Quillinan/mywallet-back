const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token || token == "") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

export default verifyToken;
