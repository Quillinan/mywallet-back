import { db } from "../app.js";
import bcrypt from "bcrypt";

const userController = {
  signUp: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const User = db.collection("users");
      const hash = bcrypt.hashSync(password, 10);

      const newUser = {
        name,
        email,
        password: hash,
      };

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email já utilizado!" });
      }

      await User.insertOne(newUser);
      res.status(200).json({ message: "Usuário criado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, name, password } = req.body;
      const User = db.collection("users");

      let user;
      if (email) {
        user = await User.findOne({ email });
      } else if (name) {
        user = await User.findOne({ name });
      } else {
        return res
          .status(400)
          .json({ error: "Falta fornecer o email ou o nome do usuário" });
      }

      if (!user) {
        return res.status(400).json({ error: "Usuário não cadastrado" });
      }
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (!checkPassword) {
        return res.status(400).json({ error: "Senha incorreta" });
      }

      res.status(200).json({ message: "Usuário logado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default userController;
