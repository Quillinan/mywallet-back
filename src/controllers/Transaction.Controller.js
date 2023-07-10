import transactionSchema from "../schemas/schemaTransaction.js";
import { db } from "../app.js";

const transactionController = {
  addTransaction: async (req, res) => {
    try {
      const type = req.params.tipo;

      if (type !== "entrada" && type !== "saida") {
        return res.status(422).json({ error: "Tipo de transação inválido" });
      }

      const validationResult = transactionSchema.validate(req.body);

      if (validationResult.error) {
        return res
          .status(422)
          .json({ error: validationResult.error.details[0].message });
      }

      const { value, description } = req.body;

      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const formattedDate = `${day}/${month}`;

      const newTransaction = {
        type,
        date: formattedDate,
        value,
        description,
      };

      const transactionsCollection = db.collection("transactions");
      await transactionsCollection.insertOne(newTransaction);

      res.status(200).json({ message: "Transação adicionada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default transactionController;
