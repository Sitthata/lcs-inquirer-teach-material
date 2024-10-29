// rawlist.js

import inquirer from 'inquirer';

export async function runRawList() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'rawlist',
        name: 'rawListChoice',
        message: 'Select your preferred programming language:',
        choices: ['JavaScript', 'Python', 'Java', 'C++'],
      },
    ]);

    console.log('\nPreferred Programming Language:', answers.rawListChoice, '\n');
  } catch (error) {
    handleError(error);
  }
}

function handleError(error) {
  if (error.isTtyError) {
    console.error('Prompt couldn\'t be rendered in the current environment.');
  } else {
    console.error('An error occurred:', error);
  }
}
