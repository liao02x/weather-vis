# Weather-Vis - search and visualize weather data

## Introduction
This is a web app that allows users to search and visualize weather data. The app is built with React and Ant Design. The weather data is fetched from Meteomatics API.

## Features
- Search location or use my location
- Pick time range and group by day/hour
- Select data fields to display
- Switch unit

## How to run
1. Clone the repo
2. Run `pnpm install` to install dependencies
3. Before running the app, make sure the API keys are set in `.env` file.
4. Run `pnpm start` to start the app

## How to set up AWS Amplify for deployment
1. Connect repo to AWS Amplify
2. Set environment variables in AWS Amplify
3. Change the build settings in AWS Amplify like this:
```
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npx pnpm install
    build:
      commands:
        - npx pnpm run build
  artifacts:
    # IMPORTANT - Please verify your build output directory
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```
4. Now you can manually deploy the app or utilize the CI/CD pipeline to deploy the app automatically.
