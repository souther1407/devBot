import dotenv from "dotenv";
dotenv.config();

export default {
  token: process.env.TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  port: process.env.PORT || 8080,
  channelId: process.env.CHANNEL_ID,
};
