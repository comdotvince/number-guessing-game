import "readline";
import { createInterface } from "readline";
import fs from "fs";

const data = fs.readFileSync("highScores.json", "utf-8");

let objScores = JSON.parse(data);

if (
  objScores === null ||
  objScores === undefined ||
  Object.keys(objScores).length === 0
) {
  objScores = {
    easy: "No high score yet",
    medium: "No high score yet",
    hard: "No high score yet",
  };
}

let difficultyLevel = "";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let round = 1;

function stopWatch(startTime) {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const timer = `${minutes} minutes and ${seconds} seconds`;

  return timer;
}

function startGame(newTargetNumber, newRound) {
  if (newRound) {
    round = newRound;
  } else {
    round = 1;
  }
  if (newTargetNumber) {
    targetNumber = newTargetNumber;
  }
  console.clear();
  console.log(`Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
You have 5 chances to guess the correct number`);

  console.log("");

  console.log(`High Scores:
    easy: ${objScores.easy || "No high score yet"}
    medium: ${objScores.medium || "No high score yet"}
    hard: ${objScores.hard || "No high score yet"}`);
  console.log("");

  console.log(`Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)`);

  console.log("");
  rl.question("Enter your choice: ", (choice) => {
    if (choice === "1") {
      console.log("You selected Easy mode with 10 chances.");
      const startTime = Date.now();
      difficultyLevel = "easy";
      guessNumber(10, targetNumber, startTime);
      return;
    } else if (choice === "2") {
      console.log("");
      console.log(`Great! You have selected the Medium difficulty level.
Let's start the game!.`);
      difficultyLevel = "medium";
      const startTime = Date.now();
      guessNumber(5, targetNumber, startTime);
      return;
    } else if (choice === "3") {
      console.log("You selected Hard mode with 3 chances.");
      const startTime = Date.now();
      difficultyLevel = "hard";
      guessNumber(3, targetNumber, startTime);
      return;
    } else {
      console.log("Invalid choice. Please select a valid difficulty level.");
      rl.close();
      return;
    }
  });
}

function guessNumber(chances, targetNumber, startTime) {
  if (chances <= 0) {
    const recordHighScore = false;
    console.log(
      `Sorry, you've run out of chances. The number was ${targetNumber}.`
    );
    rl.question("Do you want to play again? (yes/no): ", (answer) => {
      if (answer.toLowerCase() === "yes") {
        attempts = 0;
        round++;
        const newTargetNumber = Math.floor(Math.random() * 100) + 1;
        console.clear();
        console.log("");
        console.log(`Starting round ${round}...`);
        console.log("");
        startGame(newTargetNumber, round);
      } else {
        if (
          attempts < objScores[difficultyLevel] ||
          !objScores[difficultyLevel] ||
          recordHighScore ||
          objScores[difficultyLevel] === "No high score yet"
        ) {
          objScores[difficultyLevel] = attempts;
          fs.writeFileSync(
            "highScores.json",
            JSON.stringify(objScores, null, 2)
          );
          console.log(
            `New high score for ${difficultyLevel} difficulty: ${attempts} attempts!`
          );
        } else {
          console.log(
            `Your score for ${difficultyLevel} difficulty: ${attempts} attempts.`
          );
        }

        console.log("Thanks for playing! Goodbye!");
        rl.close();
        return;
      }
    });
    return;
  }

  if (attempts === 6) {
    targetNumber % 2 === 0
      ? console.log("Hint: The number is even.")
      : console.log("Hint: The number is odd.");
  }

  rl.question(
    `You have ${chances} chances left. \nGuess the number: `,

    (input) => {
      const guess = parseInt(input, 10);
      if (isNaN(guess) || guess < 1 || guess > 100) {
        console.log("Please enter a valid number between 1 and 100.");
        guessNumber(chances, targetNumber);
        return;
      }

      attempts++;
      if (guess === targetNumber) {
        const timer = stopWatch(startTime);
        if (
          attempts < objScores[difficultyLevel] ||
          objScores[difficultyLevel] === "No high score yet" ||
          !objScores[difficultyLevel]
        ) {
          objScores[difficultyLevel] = attempts;
          fs.writeFileSync(
            "highScores.json",
            JSON.stringify(objScores, null, 2)
          );
          console.log(
            `New high score for ${difficultyLevel} difficulty: ${attempts} attempts!`
          );
        } else {
          console.log(
            `Your score for ${difficultyLevel} difficulty: ${attempts} attempts.`
          );
        }

        console.log(
          `Congratulations! You've guessed the number ${targetNumber} in ${attempts} attempts in ${timer}.`
        );

        rl.question("Do you want to play again? (yes/no): ", (answer) => {
          if (answer.toLowerCase() === "yes") {
            attempts = 0;
            round++;
            const newTargetNumber = Math.floor(Math.random() * 100) + 1;
            console.clear();
            console.log("");
            console.log(`Starting round ${round}...`);
            console.log("");
            startGame(newTargetNumber, round);
          } else {
            console.log("Thanks for playing! Goodbye!");
            rl.close();
            return;
          }
        });
      } else if (guess < targetNumber) {
        console.log("Too low!");
        guessNumber(chances - 1, targetNumber, startTime);
      } else {
        console.log("Too high!");
        guessNumber(chances - 1, targetNumber, startTime);
      }
    }
  );
}

startGame();
