import chalk from "chalk";
import { client } from "../index.js";
export async function noteInfo(username, note_id) {
  let db = client.db("notes");
  let document = await db
    .collection(`${username}-notes`)
    .findOne({ id: note_id });
  if (document) {
    console.log(
      `\n${chalk.yellowBright("Note:")} ${document.note}\n${chalk.yellowBright(
        "Date created:"
      )} ${document.creationDate} at ${
        document.creationTime
      }\n${chalk.yellowBright("Tags:")} ${
        document.tags.join(", ") || "None"
      }\n${chalk.yellowBright("id:")} ${document.id}\n`
    );
  } else {
    console.log(`${chalk.yellowBright("No note found with id " + note_id)}`);
  }
}
