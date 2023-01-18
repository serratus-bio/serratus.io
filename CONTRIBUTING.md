# How to contribute

serratus.io is under active development. This document is in place to make it easier for anyone to help us.

## Serratus Project Overview

1. [ababaiain/serratus](https://github.com/ababaiain/serratus) : Repository for Serratus bioinformatics/computational analyses
2. [serratus-bio/serratus.io](https://github.com/serratus-bio/serratus.io) : Repository for Serratus front-facing website
3. [serratus-bio/serratus-summary-uploader](https://github.com/serratus-bio/serratus-summary-uploader) : Repository for Serratus database curation
4. [serratus-bio/serratus-summary-api](https://github.com/serratus-bio/serratus-summary-api) : Repository for Serratus database API

## Getting Started

### Finding a task

- See the [issues page](https://github.com/serratus-bio/serratus.io/issues) for tasks that could use some help. You can filter by the **good first issue** label.
    - Alternatively, visit the [project board](https://github.com/orgs/serratus-bio/projects/1?fullscreen=true) which includes tasks from serratus-db.
- Feel free to comment on any issue, even those you're not assigned to if you have a helpful suggestion.
- If you'd like to work on a given task, simply add a comment saying this to the issue and it will be "Assigned" to you.

### Running the site locally

Prerequisites:

1. Make sure you have `npm` and `nodejs` (> 12.x)  installed.
2. Clone this repository
3. Setup environment

    ```sh
    # 1. Install npm / tailwind
    sudo apt-get install npm
    npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
    
    # 2. Clone repository
    git clone https://github.com/serratus-bio/serratus.io.git

    # 3. Setup environment
    cd path/to/serratus.io
    npm install

    # Increase build memory
    export NODE_OPTIONS=--max_old_space_size=4096
    ```

#### Option 1: with local API (default)

1. In a separate console, run [serratus-summary-api](https://github.com/serratus-bio/serratus-summary-api) locally on `http://localhost:5000` (default)
2. Run `npm start` for serratus.io.

#### Option 2: with live API

If you want to use the live backend API (`api.serratus.io`) instead of running it locally.

1. Open `.env.development` in a text editor
2. Replace `http://localhost:5000` with `https://api.serratus.io`
3. Run `npm start`.

## Making Changes

1. Make sure you have a [GitHub account](https://github.com/join).
2. [Fork this repository on GitHub](https://github.com/serratus-bio/serratus.io/fork).
3. Create a new branch from the `main` branch.
4. Make commits of logical and atomic units, with meaningful messages.

### Coding Conventions

Custom [ESLint](https://eslint.org/) rules and [Prettier](https://prettier.io/) options are set to warn on violations. Warnings don't block local builds, but they should be fixed before merging a pull request.

To fix prettier warnings, run `npm run prettier:write`. Be sure to commit these changes.

## Submitting Changes

1. Push your changes to a topic branch in your fork of the repository.
2. Submit a pull request to the repository in the `serratus-bio` organization.

## Other Resources

- [Wiki Reference](https://github.com/serratus-bio/serratus.io/wiki) : some further documentation that isn't necessary for contributing, but good to know.
