# Contributing to Robottikoodieditori

This guide outlines the process for contributing to this project. Please follow these steps to ensure smooth collaboration.

## Getting Started

1. **Fork the Organization Repository**: Navigate to the GitHub page of the organizational repository and click the "Fork" button at the top-right corner.
2. **Clone Your Fork**: Open your terminal and run `git clone https://github.com/YourUsername/YourForkedRepo.git` to clone the forked repository to your local machine.

## Before Making Changes / Starting a New Feature

1. **Fetch Upstream Changes**: Keep your local and forked repository up-to-date with the organization's repository.
    ```bash
    git remote add upstream git@github.com:robottikoodieditori/ohtuprojekti-robottikoodieditori.git
    git fetch upstream
    git merge upstream/main
    ```
2. **Create a Feature Branch**: Always create a new branch for each feature or fix.
    ```bash
    git checkout -b feature/your-feature-name
    ```

## Making Changes

1. **Code**: Implement your feature or fix.
2. **Stage Changes**: Run `git add .` to stage all changes.
3. **Commit Changes**: Run `git commit -m "Your Commit Message"` to commit your changes.

## Submitting Changes

1. **Push to Fork**: Push the committed changes in your feature branch to your fork.
    ```bash
    git push origin feature/your-feature-name
    ```
2. **Open a Pull Request**: Navigate to the "Pull Requests" tab of your forked repository and click on "New Pull Request". Compare your feature branch against the `main` branch of the organization's repository.

## After the Pull Request is Merged

1. **Delete Feature Branch from Fork**: Delete the feature branch from your forked repository on GitHub.
2. **Update Local Clone**: Fetch and merge upstream changes to your local clone.
    ```bash
    git checkout main
    git fetch upstream
    git merge upstream/main
    ```
3. **(Optional) Delete Local Feature Branch**: If you are certain that you will no longer need the local feature branch, you can delete it.
    ```bash
    git branch -d feature/your-feature-name
    ```

By following this guide, you can ensure a smooth and consistent workflow for all contributors. Thank you for your contribution!
