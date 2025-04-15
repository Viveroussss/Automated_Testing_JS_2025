# Automated Testing JS 2025

## Setup Instructions

Follow these steps to get started with the project and run the tests.

### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Viveroussss/Automated_Testing_JS_2025.git
cd Automated_Testing_JS_2025
```

### 2. Install the necessary dependencies for testing, coverage, and reporting:

Run this script: 

```bash
npm install
```

This will install the following development dependencies:

Mocha: A JavaScript test framework for Node.js, used for running tests.

Chai: An assertion library used with Mocha for writing test expectations.

C8: A code coverage tool to track and report test coverage.

Mochawesome: A test reporter to generate a detailed and visually appealing HTML report.

### 3. Run Tests
To run the tests, use the following command:

```bash
npm test
``` 
This will execute Mocha tests with Mochawesome as the reporter and C8 for code coverage.

### 4. View Test Report
Once the tests are completed, a detailed HTML report will be generated in the mochawesome-report folder, with the filename index.html.

You can open this report in your browser to view test results and coverage details.

### 5. Code Coverage
To check code coverage without running the tests, use:

```bash
npm run coverage
```
This will generate a coverage report showing how much of the code is covered by tests.
