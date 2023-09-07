# Setting up the Development Environment

Setting up the development environment for robottikoodieditori is a straightforward process. Here's how you can get started.

## Prerequisites (Esitietovaatimukset)

Before setting up the development environment, make sure you have the following installed:

Make sure you have `npm` and `poetry` installed on your computer.


## Setup Instructions

1. Navigate to the `scripts` directory from the root of the project.

    ```bash
    cd scripts/
    ```

2. Grant execute permissions to the setup script (this is a one-time step):

    ```bash
    chmod +x setup_dev_environment.sh
    ```

3. Run the setup script:

    ```bash
    ./setup_dev_environment.sh
    ```

This script will:
- Prompt you for confirmation before proceeding.
- Install the necessary dependencies for both the frontend and backend.
- Open separate terminals to run the frontend and backend services.

## Troubleshooting

- **Script Permission Issues**: If you face issues related to permissions when running the script, ensure you have granted execute permissions as mentioned in step 2 above.

- **Dependency Installation Issues**: Make sure your internet connection is stable. If npm or poetry fails to fetch a package, retry after some time or check the respective package repositories for any known issues.
