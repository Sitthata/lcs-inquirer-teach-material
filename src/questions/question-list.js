// icecream-order.js

import inquirer from "inquirer";

const questions = [
  /**
   * Question 1: Select Ice Cream Flavors
   * - Type: Checkbox
   * - Name: 'flavors'
   * - Message: 'Select your favorite ice cream flavors:'
   * - Choices: ['Vanilla', 'Chocolate', 'Strawberry', 'Mint', 'Cookie Dough']
   * - Validation: Ensure at least one flavor is selected
   * - Filter: Capitalize each selected flavor
   */
  {
    type: "checkbox",
    name: "flavors",
    message: "Select your favorite ice cream flavors:",
    choices: ["Vanilla", "Chocolate", "Strawberry", "Mint", "Cookie Dough"],
    validate: (answer) => {
      if (answer.length < 1) {
        return "You must choose at least one flavor.";
      }
      return true;
    },
    filter: (flavors) =>
      flavors.map((flavor) => flavor.charAt(0).toUpperCase() + flavor.slice(1)),
  },

  /**
   * Question 2: Number of Scoops
   * - Type: Input
   * - Name: 'scoops'
   * - Message: 'How many scoops would you like? (1-5):'
   * - Validation: Ensure the input is a number between 1 and 5
   * - Filter: Convert input to a number
   */
  {
    type: "input",
    name: "scoops",
    message: "How many scoops would you like? (1-5):",
    validate: (input) => {
      const num = parseInt(input, 10);
      if (isNaN(num) || num < 1 || num > 5) {
        return "Please enter a valid number between 1 and 5.";
      }
      return true;
    },
    filter: (input) => parseInt(input, 10),
  },

  /**
   * Question 3: Add Toppings
   * - Type: List
   * - Name: 'toppings'
   * - Message: 'Would you like to add toppings?'
   * - Choices: ['Yes', 'No']
   * - Filter: Convert 'Yes' to true and 'No' to false
   */
  {
    type: "list",
    name: "toppings",
    message: "Would you like to add toppings?",
    choices: ["Yes", "No"],
    filter: (input) => input === "Yes",
  },
];

/**
 * Function to execute the prompts and handle user responses.
 */
export async function runOrder() {
  try {
    const answers = await inquirer.prompt(questions);
    const { flavors, scoops, toppings } = answers;

    const order = {
      Flavors: flavors.join(", "),
      "Number of Scoops": scoops,
      "Add Toppings": toppings ? "Yes" : "No",
    };

    // Display the collected order details
    console.log("\n--- Your Ice Cream Order ---");
    for (const [key, value] of Object.entries(order)) {
      console.log(`${key}: ${value}`);
    }
    console.log("-----------------------------\n");

    console.log("Thank you for your order! Enjoy your ice cream!\n");
  } catch (error) {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment.");
    } else {
      console.error("An error occurred:", error);
    }
  }
}
