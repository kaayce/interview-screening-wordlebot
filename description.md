### Summary

This code defines a React component for a Wordle game helper. The main component, `Guess`, manages the game state, handles fetching word suggestions from an API, and provides a user interface for interacting with the game. It incorporates a subcomponent, `GuessTile`, which represents individual tiles displaying each character of the word being guessed.

### Design Choices

1. **Component Architecture**:
   - The code splits the application into reusable components (`Guess` and `GuessTile`).

2. **State Management**:
   - `useState` hooks are used manage local states such as `guess`, `attemptsCount`, `wordState`, `isLoading`, `errorMessage`, and `isComplete`.

3. **Asynchronous Data Fetching**:
   - The `fetchGuess` function uses `async/await` to handle asynchronous API calls to the Wordle solver API endpoint.

4. **Conditional Rendering**:
   - Different parts of the UI are conditionally rendered based on the game state, such as displaying loading indicators, success, or failure messages.

5. **Interactive Elements**:
   - The `GuessTile` component supports interactive clue updates using dropdown menus, allowing users to input the color-coded feedback from the Wordle game.

### Technical Choices
   - **Character State**:
     - An array of `CharacterState` holding the character and clue state of the  guess was used to ensure order and allow easy mapping and updating of indivual characters and clues without affecting others
     - Encapsulating each character's state in an object makes the code more readable and maintainable.
     - `stringToState` and `stateToString` functions convert between `string` and `CharacterState` representation of the guess and state objects

### Potential Improvements and Features

1. **Guess History**:
   - Display a history of all previous guesses along with the clues received.

2. **Navigation Controls (Go Back and Forth)**:
   - Allow users to navigate between previous guesses and clues.

3. **Persistence**:
   - Allow users to save/persist application state on refresh.

4. **Testing**:
   - Add unit tests to verify functioanlity.

### Glossary

#### Guess
- **State Variables**:
  - `guess`: The current word to guess.
  - `attemptsCount`: The number of attempts made.
  - `wordState`: The state of each character in the word, including the letter and its clue.
  - `isLoading`: Boolean flag indicating if the app is waiting for an API response.
  - `errorMessage`: Error message to display if the API request fails.
  - `isComplete`: Boolean flag indicating if the puzzle is completed.

- **Key Functions**:
  - `fetchGuess`: Fetches the next guess from the API based on the current state.
  - `handleSubmit`: Handles the submission of the user's feedback.
  - `updateState`: Updates the clue state of a character in the word.

#### GuessTile

- **Props**:
  - `value`: The character displayed in the tile.
  - `interactive`: Boolean flag indicating if the tile is interactive.
  - `clue`: The clue for the character (color feedback).
  - `updateState`: Function to update the clue for the character.
