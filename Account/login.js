import inquirer from "inquirer";
import { client } from "../index.js";
import { decrypt } from "text-encryption-tool";
import { Command } from "../Interface Functions/command.js";
import chalk from "chalk";
let username, password;
function returnUsername() {
  return username;
}
export { returnUsername };
export function login() {
  let db = client.db("users");
  async function getPassword() {
    let prompt = await inquirer.prompt([
      {
        name: "password",
        type: "password",
        mask: true,
        message: "Password: ",
      },
    ]);
    password = prompt.password;
    let user = await db.collection("userData").findOne({
      username: username,
    });
    let actualPass = decrypt(user.password.text, user.password.key);
    if (password === actualPass.text) {
      console.log(chalk.greenBright("Logged in!"));
      Command();
    } else {
      console.log(chalk.redBright("Incorrect password entered"));
      getPassword();
    }
  }
  async function getUsername() {
    let prompt = await inquirer.prompt([
      {
        name: "username",
        type: "input",
        message: "Username: ",
      },
    ]);
    username = prompt.username.trim();
    let user = await db.collection("userData").findOne({ username: username });
    if (user) {
      getPassword();
    } else {
      console.log(chalk.yellowBright("User not found"));
      getUsername();
    }
  }
  getUsername();
}
