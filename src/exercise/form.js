// form.js

// Import the Inquirer.js library
// Example: import inquirer from 'inquirer';
import inquirer from 'inquirer';

/**
 * Define mock user credentials for login
 * Replace 'mockUsername' and 'mockPassword' with desired mock values
 */
const MOCK_USERNAME = 'mockUsername';
const MOCK_PASSWORD = 'mockPassword';

/**
 * Function to handle user login
 * - Prompt the user to enter their username
 * - Prompt the user to enter their password (mask the input)
 * - Validate that both username and password are not empty
 * - Check if entered credentials match the mock credentials
 * - Return true if authentication is successful, otherwise false
 */
async function login() {
  // Display a welcome message to the user

  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "username",
        message: "Enter your username",
        validate: (input) => {
          if (input.length < 1) {
            return "not empty";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "password",
        message: "Enter your password",
        validate: (input) => {
          if (input.length < 1) {
            return "not empty";
          }
          return true;
        },
      }
    ])
    if (answers.username === MOCK_USERNAME && answers.password === MOCK_PASSWORD) {
      console.log("login successful")
      return true
    } else {
      console.log("login fail")
      return false
    }
  } catch (error) {
    // Handle any errors that occur during the login process
    handleError(error);
    return false;
  }
}

/**
 * Function to display the form after successful login
 * - Present a 4-question form to the user
 * - Utilize different prompt types: input, list, rawList, confirm
 * - Implement at least two validate and filter methods
 * - Display the user's responses after form submission
 */
async function displayForm() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "full",
        message: "Enter your full name",
        validate: (input) => {

          if (!input.trim()) {
            return 'fullname cannot be empty.';
          }

          if (!input.includes(" ")) {
            return "need first name and last name";
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'listChoice',
        message: 'Select your preferred programming languages :',
        choices: ['JavaScript', 'Python', 'Java', 'C++', 'Go'],
      },
      {
        type: 'rawlist',
        name: 'rawListChoice',
        message: 'Select your preferred programming language:',
        choices: ['Beginner', 'Intermediate', 'Advanced'],
      },
      {
        type: "confirm",
        name: "confirmChoice",
        message: "sub or no",
        default: false,
      }
    ])

    console.log(answers)
    // Display a message indicating that the form is starting

    // Use inquirer.prompt to ask the following questions:
    // 1. Full Name
    //    - Type: input
    //    - Validate: Ensure the input is not empty and contains at least two words
    //    - Filter: Capitalize each word in the name
    //
    // 2. Preferred Programming Language
    //    - Type: list
    //    - Choices: Provide a list of programming languages
    //
    // 3. Experience Level
    //    - Type: rawList
    //    - Choices: Provide options like Beginner, Intermediate, Advanced
    //
    // 4. Subscribe to Newsletter
    //    - Type: confirm
    //    - Default: false

    // Capture the user's responses

    // Display the collected responses in a formatted manner
  } catch (error) {
    // Handle any errors that occur during the form process
    handleError(error);
  }
}

/**
 * Error handling function
 * - Determines if the error is a TTY error (prompt couldn't be rendered)
 * - Logs appropriate error messages based on the error type
 * @param {Error} error - The error object caught during prompts
 */
function handleError(error) {
  if (error.isTtyError) {
    console.error("Prompt couldn't be rendered in the current environment.");
  } else {
    console.error("An error occurred:", error);
  }
}

/**
 * Main function to orchestrate the login and form submission
 * - Allows the user up to 3 attempts to login successfully
 * - If authenticated, proceeds to display the form
 * - Exits the application if maximum login attempts are exceeded
 */
async function main() {
  let isAuthenticated = false;

  // Implement a loop that runs up to 3 times for login attempts
  for (let attempt = 1; attempt <= 3; attempt++) {
    isAuthenticated = await login();

    if (isAuthenticated) {
      console.log('fail')
      break
    }
  }

  // If authenticated, call the displayForm function
}

/**
 * Execute the main function to start the application
 */
main();
