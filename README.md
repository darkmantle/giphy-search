# Giphy Searcher & Viewer

This is a basic React App (typescript) that allows you to search for and view GIF's from Giphy.

## Running locally

Install dependencies and run using either NPM or YARN

### NPM
```bash
npm install
```
```bash
npm start
```

### Yarn
```bash
yarn
```
```
yarn start
```

## Note:
The library uses the Giphy SDK's typings, however I opted to use fetch directly for using their API due to the fact only 2 endpoints are being used, to reduce the amount of code being imported from 3rd party libraries.