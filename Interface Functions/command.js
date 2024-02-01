import inquirer from "inquirer";
import { listCommands } from "./help.js";
import { exit } from "./exit.js";
import { returnUsername } from "../Account/login.js";
import { returnUsernameOnRegisteration } from "../Account/register.js";
import { noteAdd } from "../Note Functions/noteAdd.js";
import { noteList } from "../Note Functions/noteList.js";
import { noteDelete } from "../Note Functions/noteDelete.js";
import { tagList } from "../Note Functions/tagList.js";
import { noteInfo } from "../Note Functions/noteInfo.js";
import chalk from "chalk";

export function Command() {
  inquirer
    .prompt([
      {
        name: "command",
        type: "input",
        message: ">: ",
      },
    ])
    .then(async (response) => {
      let command = String(response.command.toLowerCase().trim());
      let username = returnUsername() || returnUsernameOnRegisteration();
      if (command.startsWith("help")) {
        listCommands();
        Command();
      } else if (command.startsWith("add note ")) {
        let note = command.slice(9).trim();
        await noteAdd(username, note);
        Command();
      } else if (command.startsWith("exit")) {
        exit(username);
      } else if (command.startsWith("list notes")) {
        await noteList(username);
        Command();
      } else if (command.startsWith("delete note ")) {
        let id = command.slice(12).trim();
        await noteDelete(username, parseInt(id));
        Command();
      } else if (command.startsWith("list tags ")) {
        let tags = command
          .slice(10)
          .trim()
          .split(",")
          .map((tag) => {
            return tag.toLowerCase().trim();
          });
        await tagList(username, tags);
        Command();
      } else if (command.startsWith("note info ")) {
        let id = command.slice(10).trim();
        await noteInfo(username, parseInt(id));
        Command();
      } else {
        Command();
      }
    });
}
