// confirm.js

import inquirer from "inquirer";

export async function runConfirm() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmChoice",
        message: "Do you want to continue?",
        default: true,
      },
    ]);

    console.log("\nContinue:", answers.confirmChoice ? "Yes" : "No", "\n");
  } catch (error) {
    handleError(error);
  }
}

function handleError(error) {
  if (error.isTtyError) {
    console.error("Prompt couldn't be rendered in the current environment.");
  } else {
    console.error("An error occurred:", error);
  }
}
