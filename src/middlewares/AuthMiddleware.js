function auth(req, res, next) {
  // Lógica de autenticação
  console.log("Autenticado");
  next();
}

module.exports = auth;
