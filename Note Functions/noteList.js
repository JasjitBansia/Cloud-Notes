import { client } from "../index.js";
import chalk from "chalk";
export async function noteList(username) {
  let db = client.db("notes");
  let notes = "";
  let index = 1;
  await db
    .collection(`${username}-notes`)
    .find()
    .forEach((document) => {
      notes += `${chalk.yellowBright(index++)}. ${
        document.note
      } (id: ${chalk.yellowBright(document.id)})\n`;
    });
  if (notes === "") {
    console.log(chalk.yellowBright("No notes found"));
  } else {
    console.log("");
    console.log(notes);
  }
}
