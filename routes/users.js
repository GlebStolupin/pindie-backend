const usersRouter = require("express").Router();
const { checkAuth } = require("../middlewares/auth.js");

const {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  checkIsUserExists,
  checkEmptyNameAndEmail,
  checkEmptyNameAndEmailAndPassword,
  hashPassword,
} = require("../middlewares/users.js");
const {
  sendAllUsers,
  sendUserById,
  sendUserCreated,
  sendUserUpdated,
  sendUserDeleted,
  sendMe,
} = require("../controllers/users.js");

usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);

// usersRouter.get("/get", checkAuth, sendMe); (--было--)
usersRouter.get("/me", checkAuth, sendMe);

usersRouter.delete("/users/:id", checkAuth, deleteUser, sendUserDeleted);

module.exports = usersRouter;