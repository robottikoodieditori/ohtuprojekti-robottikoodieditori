# How to test

## Backend  

### Running tests
- Navigate to `/backend`
- Run tests: `poetry run invoke test`
 
#### Writing more tests:
- Add them to `test_robottikoodieditori_backend.py`
- See official instructions for [Testing Flask Applications](https://flask.palletsprojects.com/en/2.3.x/testing/)

## Frontend

### Running tests
- Navigate to `/scripts`
- Start frontend and backend: `./setup_dev_environment.sh`
- Set it up:  `press y `
- Navigate to `/frontend`
- Run tests: `npm run test:e2e`

### Writing more tests:
#### Cypress tests
- Add them to `/frontend/cypress/e2e/editor/`
- See official instructions for [Testing Cypress Application](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)


