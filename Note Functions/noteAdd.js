import { client } from "../index.js";
import chalk from "chalk";
import inquirer from "inquirer";
let tags;
export async function noteAdd(username, note) {
  const db = client.db("notes");
  await inquirer
    .prompt([
      {
        name: "tags",
        type: "input",
        message: "Any tags? (separate with comma or press enter to skip): ",
      },
    ])
    .then((Tags) => {
      tags = Tags.tags
        ? String(Tags.tags)
            .trim()
            .split(",")
            .map((tag) => tag.toLowerCase().trim())
        : null;
    });
  function randomizeID() {
    let id = Math.floor(Math.random() * 1000) + 1;
    db.collection(`${username}-notes`)
      .findOne({ id: id })
      .then((document) => {
        if (!document) {
          db.collection(`${username}-notes`).insertOne({
            note: note,
            creationDate: new Date().toDateString(),
            creationTime: new Date().toLocaleTimeString("en-US", {
              hour12: true,
            }),
            tags: tags,
            id: id,
          });
        } else {
          randomizeID();
        }
      });
  }
  randomizeID();
  console.log(chalk.greenBright("Note added"));
}
