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
  function getPassword() {
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
        db.collection("userData")
          .findOne({
            username: username,
          })
          .then((user) => {
            let actualPass = decrypt(user.password.text, user.password.key);
            if (Password.password === actualPass.text) {
              console.log(chalk.greenBright("Logged in!"));
              Command();
            } else {
              console.log(chalk.redBright("Incorrect password entered"));
              getPassword();
            }
          });
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
      .then((Username) => {
        username = Username.username.trim();
        db.collection("userData")
          .findOne({ username: username })
          .then((user) => {
            if (user) {
              getPassword();
            } else {
              console.log(chalk.yellowBright("User not found"));
              getUsername();
            }
          });
      });
  }
  getUsername();
}
