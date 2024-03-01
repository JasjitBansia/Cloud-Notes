import inquirer from "inquirer";
import { encrypt } from "text-encryption-tool";
import chalk from "chalk";
import { client } from "../index.js";
import { Command } from "../Interface Functions/command.js";
let username, password;
function returnUsernameOnRegisteration() {
  return username;
}
export { returnUsernameOnRegisteration };
export function register() {
  let db = client.db("users");
  async function confirmPassword(pass1) {
    let prompt = await inquirer.prompt([
      {
        name: "password",
        type: "password",
        mask: true,
        message: chalk.blueBright("Confirm password: "),
      },
    ]);
    password = prompt.password;
    if (password === pass1) {
      db.collection("userData").insertOne({
        username: username,
        password: encrypt(pass1),
      });
      client.db("notes").createCollection(`${username}-notes`);
      console.log(
        "Hi " +
          chalk.greenBright(`${username}!`) +
          " Use " +
          chalk.yellowBright("`help` ") +
          "to see all the available commands"
      );
      Command();
    } else {
      console.log(chalk.redBright("Passwords do not match"));
      confirmPassword(pass1);
    }
  }
  async function getPassword() {
    console.log(
      chalk.redBright("Note: ") +
        "Use a password that you don't use anywhere else"
    );
    let prompt = await inquirer.prompt([
      {
        name: "password",
        type: "password",
        mask: true,
        message: "Password: ",
      },
    ]);

    password = prompt.password;
    if ([...password].length >= 5) {
      confirmPassword(password);
    } else {
      console.log(
        chalk.yellowBright(
          "Your password should be equal to or more than 5 characters"
        )
      );
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
    if (username !== "") {
      await db
        .collection("userData")
        .findOne({ username: username })
        .then((user) => {
          if (!user) {
            getPassword();
          } else {
            console.log(chalk.yellowBright("Username is already taken 🗿"));
            getUsername();
          }
        });
    } else {
      console.log(
        chalk.yellowBright("Username should be atleast 1 character long")
      );
      getUsername();
    }
  }
  getUsername();
}
