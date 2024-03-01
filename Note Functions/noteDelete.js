import chalk from "chalk";
import { client } from "../index.js";
export async function noteDelete(username, note_id) {
  let db = client.db("notes");
  let document = await db
    .collection(`${username}-notes`)
    .findOneAndDelete({ id: note_id });
  if (document) {
    console.log(chalk.redBright("Note deleted"));
  } else {
    console.log(chalk.yellowBright(`No note found with id ${note_id}`));
  }
}
