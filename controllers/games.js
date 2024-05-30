  const sendAllGames = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.gamesArray));
  };
  
  const sendGameById = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.game));
  };
  
  const sendGameCreated = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.game));
  };
  
  const sendGameUpdated = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end("Game updated");
  };
  
  const sendGameDeleted = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.game));
  };
  
  module.exports = {
    sendAllGames,
    sendGameById,
    sendGameCreated,
    sendGameUpdated,
    sendGameDeleted
  };