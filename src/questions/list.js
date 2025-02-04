// list.js

import inquirer from 'inquirer';

export async function runList() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'listChoice',
        message: 'Choose your favorite fruit:',
        choices: ['Apple', 'Banana', 'Cherry', 'Date'],
      },
    ]);

    console.log('\nFavorite Fruit:', answers, '\n');
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
