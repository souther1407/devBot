import DevBot from "./bot.js";
import server from "./server.js";
import config from "./config/index.js";
server.listen(config.port, () => {
  console.log("server listening at", config.port);
});
