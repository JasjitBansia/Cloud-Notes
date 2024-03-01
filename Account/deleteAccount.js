import inquirer from "inquirer";
import { client } from "../index.js";
import chalk from "chalk";
export async function deleteAccount(username) {
  let prompt = await inquirer.prompt({
    name: "confirmation",
    type: "confirm",
    message: chalk.redBright("Are you sure?"),
  });
  if (prompt.confirmation) {
    client
      .db("users")
      .collection("userData")
      .findOneAndDelete({ username: username });
    await client.db("notes").dropCollection(`${username}-notes`);
    console.log(chalk.yellowBright("Your account has been deleted"));
    console.log("Exiting...");
    setTimeout(() => {
      process.exit(1);
    }, 1500);
  } else {
    console.log(chalk.yellowBright("Aborted"));
  }
}
