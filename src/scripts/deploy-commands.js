import { REST, Routes } from "discord.js";
import config from "../config/index.js";
import fs from "fs/promises";
import path from "path";

const commands = [];
const commandPath = path.join(process.cwd(), "src", "commands");
const commandsFolders = await fs.readdir(commandPath);
for (let folder of commandsFolders) {
  const subfolder = path.join(commandPath, folder);
  const files = await fs.readdir(subfolder);
  for (let file of files) {
    const { default: module } = await import(`../commands/${folder}/${file}`);
    if (module.data && module.execute) {
      commands.push(module.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const rest = new REST().setToken(config.token);
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
