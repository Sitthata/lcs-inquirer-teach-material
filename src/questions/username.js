// input.js

import inquirer from "inquirer";

export async function runInput() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "inputValue",
        message: "Enter your username:",
        // 6. Validate
        validate: (input) => {
          if (input.length < 3) {
            return "Username must be at least 3 characters long.";
          }
          return true;
        },
        // 7. Filter
        filter: (input) => input.trim(),
      },
    ]);

    console.log("\nUsername:", answers.inputValue, "\n");
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
