import "readline";
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let round = 1;

function startGame() {
  console.clear();
  console.log(`Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
You have 5 chances to guess the correct number`);

  console.log("");

  console.log(`Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)`);

  console.log("");
  rl.question("Enter your choice: ", (choice) => {
    if (choice === "1") {
      console.log("You selected Easy mode with 10 chances.");
      guessNumber(10, targetNumber);
      return;
    } else if (choice === "2") {
      console.log("");
      console.log(`Great! You have selected the Medium difficulty level.
Let's start the game!.`);

      guessNumber(5, targetNumber);
      return;
    } else if (choice === "3") {
      console.log("You selected Hard mode with 3 chances.");
      guessNumber(3, targetNumber);
      return;
    } else {
      console.log("Invalid choice. Please select a valid difficulty level.");
      rl.close();
      return;
    }
  });
}

function guessNumber(chances, targetNumber) {
  if (chances <= 0) {
    console.log(
      `Sorry, you've run out of chances. The number was ${targetNumber}.`
    );
    rl.question("Do you want to play again? (yes/no): ", (answer) => {
      if (answer.toLowerCase() === "yes") {
        attempts = 0;
        round++;
        console.log("");
        startGame();
      } else {
        console.log("Thanks for playing! Goodbye!");
        rl.close();
        return;
      }
    });
    return;
  }

  rl.question(
    `You have ${chances} chances left. Guess the number: `,
    (input) => {
      const guess = parseInt(input, 10);
      if (isNaN(guess) || guess < 1 || guess > 100) {
        console.log("Please enter a valid number between 1 and 100.");
        guessNumber(chances, targetNumber);
        return;
      }

      attempts++;
      if (guess === targetNumber) {
        console.log(
          `Congratulations! You've guessed the number ${targetNumber} in ${attempts} attempts.`
        );
        rl.close();
      } else if (guess < targetNumber) {
        console.log("Too low!");
        guessNumber(chances - 1, targetNumber);
      } else {
        console.log("Too high!");
        guessNumber(chances - 1, targetNumber);
      }
    }
  );
}

startGame();
