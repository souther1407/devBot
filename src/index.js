import DevBot from "./bot.js";
import server from "./server.js";

server.listen(8080, () => {
  console.log("server listening at", 8080);
});
