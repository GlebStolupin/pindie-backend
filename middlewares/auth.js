const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  // мы передавали токен в специальном заголовке Authorizatio - достаем
  const { authorization } = req.headers;

  // проверка на наличие токена
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  // Общепринято использовать приставку Bearer в заголовке авторизации,
  // но для проверки удалим
  const token = authorization.replace("Bearer ", "");

  // проверим с помощью ключа, который использовался при генерации токена
  try {
    // результат проверки — расшифрованные данные, которые изначально были зашифрованы в токене
    req.user = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }
  next();
};

const checkCookiesJWT = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.redirect("/");
  }
  req.headers.authorization = `Bearer ${req.cookies.jwt}`;
  next();
};

module.exports = { checkAuth, checkCookiesJWT };