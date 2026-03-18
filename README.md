# super-quacks

Introductory project focused on learning the fundamentals of Playwright and Typescript.

<h3>Tools and technologies</h3>

[Allure](https://allurereport.org/)
[ESlint](https://eslint.org/)
[Github Actions](https://github.com/features/actions)
[Github Pages](https://docs.github.com/es/pages)
[Node.js](https://nodejs.org/en)
[Playwright](https://playwright.dev/docs/intro)
[Prettier](https://prettier.io/)
[Typescript](https://www.typescriptlang.org/docs/handbook/)

<h3>To start this project</h3>

1. Clone the project
2. Make sure to have installed **node.js** on your device
3. Install all dependencies with `npm install`

<h3>Running tests</h3>

To run the tests, use the commands listed in the **scripts** section of the **package.json** file or use the command `npx playwright test` to run all tests.

<h3>Continuous Integration</h3>

The project's pipeline consists of 2 jobs:

1. The first runs static tests (lints) to ensure compliance with code standards, if this job fails, the process stops.
2. The second runs dynamic tests (API and UI) and creates an artifact with the results.

An Allure report is uploaded via GitHub Pages, you can access it after creating a Pull Request (PR) in the **conversation** section.
