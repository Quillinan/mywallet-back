const transactionController = {
  addTransaction: async (req, res) => {
    try {
      const { tipo } = req.params;
      const { valor, descricao } = req.body;

      if (tipo !== "entrada" && tipo !== "saida") {
        return res.status(400).json({ error: "Tipo de transação inválido" });
      }

      if (typeof valor !== "number" || valor <= 0) {
        return res.status(400).json({ error: "Valor da transação inválido" });
      }

      if (!descricao) {
        return res
          .status(400)
          .json({ error: "Descrição da transação é obrigatória" });
      }

      res.status(200).json({ message: "Transação adicionada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default transactionController;
