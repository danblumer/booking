# Hotel Booking

## Overview

This is a simple hotel booking project web application built with React and TypeScript. It uses Jest as the testing framework and React Testing Library for component tests.

## Directory Structure

- `src/components`: This directory contains all the reusable components used across different pages of the application.
- `src/pages`: This directory contains all the page components. Each page component corresponds to a different route in the application.
- `src/provider`: This directory contains the context providers for state management. The main state management is done in the `BookingContextProvider.tsx` file.
- `src/utils`: This directory contains utility functions like `formatCurrency` in `numberUtils.ts`.
- `src/services`: This directory contains business rules shared in the project.

## State Management
State management is done using React's Context API. The main context provider is located in src/provider/BookingContextProvider.tsx.

## Components and Pages
Components are located in the `src/components` directory. Each component has its own directory which contains the component file and its corresponding test file.

Pages are located in the `src/pages` directory. Each page corresponds to a different route in the application.

## Currency Formatting
Currency values are formatted using the formatCurrency function in `src/utils/numberUtils.ts` This function formats a number as a string in USD currency format.

## Testing

- We use Jest as our testing framework. You can run the tests with the following command:

- Tests for components are located in the same directory as the component they are testing. For example, tests for src/components/MyComponent.tsx would be in src/components/MyComponent.test.tsx.

## Setup

To set up the project, follow these steps:

1. Clone the repository:

 `git clone https://github.com/yourusername/yourrepository.git`

3. Navigate to the project directory:
   
 `cd yourrepository`

4. Install the dependencies:
   
 `npm install`

6. Running the App
 `npm start`

#Your application should be ready in the url http://localhost:5173/
