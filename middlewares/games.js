const games = require("../models/game");

const findAllGames = async (req, res, next) => {
  // console.log("GET /games"); +++
  // Поиск всех игр в проекте по заданной категории (добавил)
  if(req.query["categories.name"]) { 
    req.gamesArray = await games.findGameByCategory(req.query["categories.name"]);
    next();
    return;
  }
    // Поиск всех игр в проекте (было)
  req.gamesArray = await games
  .find({})
  .populate("categories")
  .populate({path: "users", select: "-password"});
  next();
};

const checkEmptyFields = async (req, res, next) => {
  if(req.isVoteRequest) {
    next();
    return;
  }
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Заполните все поля" }));
  } else {
    next();
  }
};

const checkIsGameExists = async (req, res, next) => {
  // console.log(req.gamesArray);
  const isInArray = req.gamesArray.find((game) => {
    return req.body.title === game.title;
  });
  // console.log(isInArray);
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Игра с таким названием уже существует" }));
  } else {
    next();
  }
};

// const checkIfCategoriesAvaliable = async (req, res, next) => {  --было--
//   if (req.isVoteRequest) {
//     next();
//   }
//   if (!req.body.categories || req.body.categories.length === 0) {
//     res.headers = { "Content-Type": "application/json" };
//     res.status(400).send({ message: "Выберите хотя бы одну категорию" });
//   } else {
//     next();
//   }
// };
const checkIfCategoriesAvaliable = async (req, res, next) => {
  if(req.isVoteRequest) {
    next();
    return;
  }
  if (!req.body.categories || req.body.categories.length === 0) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Выберите хотя бы одну категорию" }));
  } else {
    next();
  }
};

const findGameById = async (req, res, next) => {
  // console.log("GET /games/:id");
  try {
    req.game = await games
      .findById(req.params.id)
      .populate("categories")
      // .populate({path: "users", select: "-password"});
      .populate("users");
      next();
  } catch (error) {
    res.status(404).send({ message: "Игра не найдена" });
  }
};

const createGame = async (req, res, next) => {
  console.log("POST /games");
  try {
    console.log(req.body);
    req.game = await games.create(req.body);
    next();
  } catch (error) {
    res.status(400).send("Error creating game");
  }
};

const checkIfUsersAreSafe = async (req, res, next) => {
  // console.log(req.body.users);
  if (!req.body.users) {
    next();
    return;
  }
  if (req.body.users.length - 1 === req.game.users.length) {
    next();
    return;
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Нельзя удалять пользователей или добавлять больше одного пользователя" }));
  }
};

const checkIsVoteRequest = async (req, res, next) => {
  if (Object.keys(req.body).length === 1 && req.body.users) {
    //Голосование за игру
    req.isVoteRequest = true;
  }
  next();
};

const updateGame = async (req, res, next) => {
  // console.log("PUT /games/:id");
  try {
    req.game = await games.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка обновления игры" });
  }
};

const deleteGame = async (req, res, next) => {
  // console.log("DELETE /games/:id");
  try {
    req.game = await games.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка удаления игры" });
  }
};

module.exports = {
  findAllGames,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  findGameById,
  createGame,
  checkIfUsersAreSafe,
  updateGame,
  deleteGame,
  checkIsVoteRequest,
  checkEmptyFields,
};