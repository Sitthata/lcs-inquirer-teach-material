// filter.js

import inquirer from "inquirer";

export async function runFilter() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "checkbox",
        name: "technologies",
        message: "Select the technologies you are familiar with:",
        choices: [
          { name: "HTML" },
          { name: "CSS" },
          { name: "JavaScript" },
          { name: "TypeScript" },
          { name: "React" },
          { name: "Node.js" },
        ],
        // 6. Validate
        validate: (answer) => {
          if (answer.length < 2) {
            return "Select at least two technologies.";
          }
          return true;
        },
        // 7. Filter
        filter: (choices) => choices.map((choice) => choice.toLowerCase()),
      },
    ]);

    console.log("\nTechnologies:", answers.technologies.join(", "), "\n");
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
