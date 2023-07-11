import { db } from "../app.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token || token == "") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const sessions = db.collection("sessions");
    const session = await sessions.findOne({ token });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = {
      email: session.email,
    };

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default verifyToken;
