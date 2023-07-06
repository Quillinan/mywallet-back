import { db } from "../app.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import { v4 as uuid } from "uuid";

const userController = {
  signUp: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
      });

      const validationResult = schema.validate(req.body);

      if (validationResult.error) {
        return res
          .status(422)
          .json({ error: validationResult.error.details[0].message });
      }

      const User = db.collection("users");
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "Email já utilizado!" });
      }

      const newUser = {
        name,
        email,
        password,
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
      if (email) {
        const schema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        });

        const validationResult = schema.validate({ email, password });

        if (validationResult.error) {
          return res
            .status(422)
            .json({ error: validationResult.error.details[0].message });
        }
        user = await User.findOne({ email });
      } else if (name) {
        const schema = Joi.object({
          name: Joi.string().required(),
          password: Joi.string().required(),
        });

        const validationResult = schema.validate({ name, password });

        if (validationResult.error) {
          return res
            .status(422)
            .json({ error: validationResult.error.details[0].message });
        }
        user = await User.findOne({ name });
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
