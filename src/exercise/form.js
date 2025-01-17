// form.js

import inquirer from 'inquirer';

/**
 * Define mock user credentials for login
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
  console.log('Welcome! Please log in.');

  try {
    // Use inquirer.prompt to ask for username and password
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Enter your username:',
        validate: (input) => {
          if (!input.trim()) {
            return 'Username cannot be empty.';
          }
          return true;
        },
        filter: (input) => input.trim(),
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
        mask: '*',
        validate: (input) => {
          if (!input.trim()) {
            return 'Password cannot be empty.';
          }
          return true;
        },
      },
    ]);

    // Validate credentials
    const { username, password } = answers;

    if (username === MOCK_USERNAME && password === MOCK_PASSWORD) {
      console.log('Login successful!');
      return true;
    } else {
      console.log('Invalid username or password.');
      return false;
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
    console.log('\nWelcome to the Form!\n');

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'fullName',
        message: 'Please enter your full name:',
        validate: (input) => {
          if (!input.trim()) {
            return 'Name cannot be empty.';
          }

          // Ensure at least two words
          const words = input.trim().split(/\s+/);
          if (words.length < 2) {
            return 'Please enter at least first and last name.';
          }

          return true;
        },
        filter: (input) => {
          // Capitalize each word
          const words = input.trim().split(/\s+/);
          const capitalizedWords = words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          });
          return capitalizedWords.join(' ');
        },
      },
      {
        type: 'list',
        name: 'preferredLanguage',
        message: 'Select your preferred programming language:',
        choices: ['JavaScript', 'Python', 'Java', 'C++', 'Go'],
      },
      {
        type: 'rawlist',
        name: 'experienceLevel',
        message: 'What is your experience level?',
        choices: ['Beginner', 'Intermediate', 'Advanced'],
      },
      {
        type: 'confirm',
        name: 'subscribe',
        message: 'Subscribe to our newsletter?',
        default: false,
      },
    ]);

    console.log('\nThank you for completing the form!');
    console.log('Here are your responses:\n');
    console.log(`Full Name: ${answers.fullName}`);
    console.log(`Preferred Language: ${answers.preferredLanguage}`);
    console.log(`Experience Level: ${answers.experienceLevel}`);
    console.log(
      `Subscribed to Newsletter: ${answers.subscribe ? 'Yes' : 'No'}\n`
    );
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
    console.error('Prompt could not be rendered in the current environment.');
  } else {
    console.error('An error occurred:', error);
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
    console.log(`\n--- Login Attempt ${attempt} of 3 ---`);
    isAuthenticated = await login();

    if (isAuthenticated) {
      break;
    }

    if (attempt < 3) {
      console.log('Please try again.\n');
    }
  }

  if (isAuthenticated) {
    await displayForm();
  } else {
    console.log('\nMaximum login attempts exceeded. Exiting...');
  }
}

/**
 * Execute the main function to start the application
 */
main();
