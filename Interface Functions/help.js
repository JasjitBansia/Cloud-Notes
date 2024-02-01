import chalk from "chalk";
export function listCommands() {
  console.log(chalk.yellowBright("help") + " - Lists all the commands");
  console.log(
    `${chalk.yellowBright("add note")} ${chalk.yellowBright(
      chalk.italic("note")
    )} - Add a note`
  );
  console.log(`${chalk.yellowBright("list notes")} - Lists all of your notes`);
  console.log(
    `${chalk.yellowBright("delete note")} ${chalk.yellowBright(
      chalk.italic("note id")
    )} - Delete a note`
  );
  console.log(
    `${chalk.yellowBright("list tags")} ${chalk.yellowBright(
      chalk.italic("tag(s) (separated by comma)")
    )} - List all of your notes containing some specific tag(s)`
  );
  console.log(
    `${chalk.yellowBright("note info")} ${chalk.yellowBright(
      chalk.italic("note id")
    )} - Shows all the details of a note`
  );
}
