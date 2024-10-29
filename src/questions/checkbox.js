// checkbox.js

import inquirer from "inquirer";

export async function runCheckbox() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "checkbox",
        name: "checkboxChoices",
        message: "Select your hobbies:",
        choices: [
          { name: "Reading" },
          { name: "Gaming" },
          { name: "Traveling" },
          { name: "Cooking" },
        ],
        // 6. Validate
        validate: (answer) => {
          if (answer.length < 1) {
            return "You must choose at least one hobby.";
          }
          return true;
        },
        // 7. Filter
        filter: (choices) => choices.map((choice) => choice.toUpperCase()),
      },
    ]);

    console.log("\nHobbies:", answers.checkboxChoices.join(", "), "\n");
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
