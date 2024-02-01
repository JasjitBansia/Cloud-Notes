import { MongoClient } from "mongodb";
import inquirer from "inquirer";
import { login } from "./Account/login.js";
import { register } from "./Account/register.js";
import dotenv from "dotenv";
dotenv.config();
export const client = new MongoClient(process.env.STRING);
function prompt() {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "input",
        message: "Register or login? (r/l): ",
      },
    ])
    .then((response) => {
      if (response.choice.toLowerCase().trim() === "r") {
        register();
      } else if (response.choice.toLowerCase().trim() === "l") {
        login();
      } else {
        prompt();
      }
    });
}
prompt();
