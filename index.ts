// main.js

import { runCheckbox } from "./src/questions/checkbox";
import { runConfirm } from "./src/questions/confirm";
import { runList } from "./src/questions/list";
import { runOrder } from "./src/questions/question-list.js";
import { runRawList } from "./src/questions/rawList";
import { runInput } from "./src/questions/username";
import { runFilter } from "./src/questions/validate-filter.js";


async function main() {
  console.log('--- Inquirer.js Demonstration ---\n');
    // await runOrder();
  // await runList();
//   await runRawList();
//   await runConfirm();
  await runInput();
//   await runCheckbox();
//   await runFilter();

  console.log('\n--- End of Demonstration ---');
}

main();
