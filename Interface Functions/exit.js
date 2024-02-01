export function exit(username) {
  console.log(`Bye Bye ${username}👋`);
  setTimeout(() => {
    process.exit(1);
  }, 1500);
}
