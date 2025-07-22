# Number Guessing Game

A console-based number guessing game built with Node.js where players try to guess a randomly generated number between 1 and 100.

Project Solution at [roadmap.sh](https://roadmap.sh/projects/number-guessing-game)

## Features

- **Multiple Difficulty Levels**: Easy (10 chances), Medium (5 chances), Hard (3 chances)
- **High Score Tracking**: Persistent high scores saved to JSON file for each difficulty level
- **Game Timer**: Tracks time taken to complete each game
- **Hints System**: Provides even/odd hints after 6 attempts
- **Multiple Rounds**: Option to play consecutive rounds
- **Input Validation**: Ensures valid number inputs within the 1-100 range

## Game Rules

1. The computer generates a random number between 1 and 100
2. Select your difficulty level:
   - **Easy**: 10 attempts to guess the number
   - **Medium**: 5 attempts to guess the number
   - **Hard**: 3 attempts to guess the number
3. Enter your guesses and receive feedback (too high/too low)
4. After 6 attempts, you'll receive a hint about whether the number is even or odd
5. Win by guessing the correct number within the allowed attempts
6. Your best scores (fewest attempts) are saved for each difficulty level

## Installation & Setup

1. Ensure you have Node.js installed on your system
2. Clone or download this repository
3. Navigate to the game directory:
   ```bash
   cd number-guessing-game
   ```
4. Create an initial high scores file:
   ```bash
   echo '{}' > highScores.json
   ```

## How to Play

Run the game using Node.js:

```bash
node game.js
```

Follow the on-screen prompts to:

1. Select your difficulty level (1, 2, or 3)
2. Enter your number guesses
3. Choose whether to play again after each round

## File Structure

```
number-guessing-game/
├── game.js          # Main game logic
├── highScores.json  # Persistent high score storage
└── README.md        # This documentation
```

## Code Overview

### Key Functions

- **`startGame(newTargetNumber, newRound)`**: Initializes the game, displays menu and handles difficulty selection
- **`guessNumber(chances, targetNumber, startTime)`**: Main game loop handling user input and game logic
- **`stopWatch(startTime)`**: Calculates and formats elapsed game time

### High Score System

The game maintains persistent high scores in `highScores.json` with the following structure:

```json
{
  "easy": 5,
  "medium": 3,
  "hard": 2
}
```

High scores track the fewest number of attempts needed to guess the correct number for each difficulty level.

## Game Flow

1. **Initialization**: Load existing high scores from JSON file
2. **Menu Display**: Show current high scores and difficulty options
3. **Difficulty Selection**: Player chooses Easy, Medium, or Hard mode
4. **Game Loop**:
   - Player enters guesses
   - Receive feedback (too high/too low/correct)
   - Hint provided after 6 attempts
   - Game ends on correct guess or when chances run out
5. **Score Recording**: Update high scores if a new record is achieved
6. **Play Again**: Option to start a new round

## Dependencies

- **readline**: For interactive command-line input/output
- **fs**: For reading/writing high score data to JSON file

## Error Handling

- Invalid input validation (non-numbers, out of range)
- Graceful handling of missing or corrupted high score files
- Proper game state management across multiple rounds

## Future Enhancements

Potential improvements could include:

- Custom number ranges
- Multiplayer support
- Web-based interface
- Sound effects
- Statistics tracking (total games played, win rate, etc.)
