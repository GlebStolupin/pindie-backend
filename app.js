const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const apiRouter = require("./routes/api");
const pagesRouter = require("./routes/pages");

const connectToDatabase = require("./database/connect");
const cors = require("./middlewares/cors.js");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3001;

connectToDatabase();

app.use(
  cors,
  cookieParser(),
  bodyParser.json(),
  apiRouter,
  pagesRouter,
  express.static(path.join(__dirname, "public"))
);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});