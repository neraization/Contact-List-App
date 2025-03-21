# Playwright Test Automation Setup

## Prerequisites

Before setting up and running the tests, ensure you have the following installed on your machine:

- **Node.js** (Latest LTS version recommended) - [Download Node.js](https://nodejs.org/)
- **Git** - [Download Git](https://git-scm.com/)
- **Visual Studio Code** (or any preferred code editor) - [Download VS Code](https://code.visualstudio.com/)

## Installation

1. Clone the repository using Git:

   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies by running the following command in the terminal:
   ```sh
   npm install
   ```

## Running Tests

The following scripts are available to run different types of tests:

| Script              | Command              | Description                               |
| ------------------- | -------------------- | ----------------------------------------- |
| Smoke Tests         | `npm run smoke`      | Runs all Playwright tests                 |
| Headed Mode         | `npm run headed`     | Runs tests in a visible browser window    |
| Show Report         | `npm run report`     | Displays the test report after execution  |
| UI Tests            | `npm run UI`         | Runs only UI-related tests in headed mode |
| UI Tests (Headless) | `npm run UIheadless` | Runs all UI tests in headless mode        |
| API Tests           | `npm run API`        | Runs API tests located in `tests/API`     |

### Example Commands:

- To run **UI tests**:
  ```sh
  npm run UI
  ```
- To run **UI tests in headless mode**:
  ```sh
  npm run UIheadless
  ```
- To run **smoke tests**:
  ```sh
  npm run smoke
  ```
- To run **API tests**:
  ```sh
  npm run API
  ```

## Viewing Test Reports

After running the tests, you can view the Playwright test report by executing:

```sh
npm run report
```

This will open a browser displaying the detailed test results.

---
