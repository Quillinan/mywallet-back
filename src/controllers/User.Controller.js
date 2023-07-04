class UserController {
  index(req, res) {
    // Lógica para listar usuários
    res.send("Lista de usuários");
  }

  create(req, res) {
    // Lógica para criar um usuário
    res.send("Usuário criado");
  }
}

module.exports = new UserController();
