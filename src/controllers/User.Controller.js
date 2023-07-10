import { db } from "../app.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { signInSchema, signUpSchema } from "../schemas/schemaUser.js";

const userController = {
  signUp: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const { error } = signUpSchema.validate(req.body);

      if (error) {
        return res.status(422).json({ error: error.details[0].message });
      }

      const User = db.collection("users");
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "Email já utilizado!" });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = {
        name,
        email,
        password: hashedPassword,
      };

      await User.insertOne(newUser);
      res.status(201).json({ message: "Usuário criado" });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, name, password } = req.body;

      const User = db.collection("users");

      let user;
      if (email || name) {
        const { error } = signInSchema.validate({ email, name, password });

        if (error) {
          return res.status(422).json({ error: error.details[0].message });
        }

        if (email) {
          user = await User.findOne({ email });
        } else {
          user = await User.findOne({ name });
        }
      }

      if (!user) {
        return res.status(404).json({ error: "Usuário não cadastrado" });
      }

      const checkPassword = bcrypt.compareSync(password, user.password);
      if (!checkPassword) {
        return res.status(401).json({ error: "Senha incorreta" });
      }

      res.status(200).json({ message: "Usuário logado", token: uuid() });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
};

export default userController;
