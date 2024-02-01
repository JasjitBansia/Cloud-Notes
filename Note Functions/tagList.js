import chalk from "chalk";
import { client } from "../index.js";
export async function tagList(username, tags) {
  let db = client.db("notes");
  let notes = "";
  let index = 1;
  await db
    .collection(`${username}-notes`)
    .find({ tags: { $elemMatch: { $in: tags } } })
    .forEach((document) => {
      notes += `${chalk.yellowBright(index++)}. ${
        document.note
      } (id: ${chalk.yellowBright(document.id)}) Tags: ${chalk.bold(
        document.tags.join(", ")
      )}\n`;
    });
  if (notes === "") {
    console.log(chalk.yellowBright("No notes found"));
  } else {
    console.log("");
    console.log(notes);
  }
}
