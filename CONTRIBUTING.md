# How to contribute

serratus.io is under active development. This document is in place to make it easier for anyone to help us.

## Serratus Project Overview

There are 3 repositories:

1. [ababaiain/serratus](https://github.com/ababaiain/serratus) : Repository for Serratus bioinformatics/computational analyses
2. [serratus-bio/serratus.io](https://github.com/serratus-bio/serratus.io) : Repository for Serratus front-facing website
3. [serratus-bio/serratus-db](https://github.com/serratus-bio/serratus-db) : Repository for Serratus database curation and API

## Getting Started

### Finding a task

- See the [issues page](https://github.com/serratus-bio/serratus.io/issues) for tasks that could use some help.
- Feel free to comment on any issue, even those you're not assigned to if you have a helpful suggestion.
- If you'd like to work on a given task, simply add a comment saying this to the issue and it will be "Assigned" to you.

### Running the site locally

1. Make sure you have `npm` installed.
2. Clone the repository and run the following commands:

```sh
cd path/to/serratus.io
npm install
npm start
```

## Making Changes

- Make sure you have a [GitHub account](https://github.com/join).
- Fork the repository on GitHub.
- Create a topic branch from the `dev` branch. We use the following branch naming structure:
    - `feature/<username>/<description>` (example: `feature/victorlin/add-explore-page`)
    - `fix/<username>/<description>` (example: `fix/victorlin/query-page-floating`)
- Make commits of logical and atomic units, with descriptive but concise messages.

## Submitting Changes

- Push your changes to a topic branch in your fork of the repository.
- Submit a pull request to the repository in the `serratus-bio` organization.

## Other Resources

- [Wiki Reference](https://github.com/serratus-bio/serratus.io/wiki) : some further documentation that isn't necessary for contributing, but good to know.
