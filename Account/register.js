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
  function confirmPassword(pass1) {
    inquirer
      .prompt([
        {
          name: "password",
          type: "password",
          mask: true,
          message: chalk.blueBright("Confirm password: "),
        },
      ])
      .then((password) => {
        if (password.password === pass1) {
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
      });
  }
  function getPassword() {
    console.log(
      chalk.redBright("Note: ") +
        "Use a password that you don't use anywhere else"
    );
    inquirer
      .prompt([
        {
          name: "password",
          type: "password",
          mask: true,
          message: "Password: ",
        },
      ])
      .then((Password) => {
        password = Password.password;
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
      });
  }
  function getUsername() {
    inquirer
      .prompt([
        {
          name: "username",
          type: "input",
          message: "Username: ",
        },
      ])
      .then(async (Username) => {
        username = Username.username.trim();
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
      });
  }
  getUsername();
}
