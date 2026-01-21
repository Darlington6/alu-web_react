# Task 1 - Lifecycles

This task adds lifecycle methods to the App component to handle keyboard events.

## Features

- Added `logOut` prop with type function and default empty function
- Added event listener on component mount to listen for Ctrl+H keyboard shortcut
- When Ctrl+H is pressed, displays alert "Logging you out" and calls logOut function
- Properly removes event listener on component unmount
- Added tests to verify the functionality

## Usage

```bash
npm install
npm start
npm test
```

Press Ctrl+H to trigger the logout functionality.
