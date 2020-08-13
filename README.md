# serratus.io

Serratus is an Open Science project with a goal of uncovering coronaviruses hidden in the NCBI SRA database.
This repository is home to the front-facing website of the project, and contains tools for anyone to observe Serratus analyses.

The website was bootstrapped with `create-react-app` and leverages D3.js for visualizations. If you are interested in contributing, see [CONTRIBUTING.md](CONTRIBUTING.md).

This repository is just one of the main repositories involving Serratus:

1. Repository for database-related development: [serratus-bio/serratus-db](https://github.com/serratus-bio/serratus-db)
2. Repository for Serratus bioinformatics work: [ababaian/serratus](https://github.com/ababaian/serratus)

## Visualization Pages

### Explore

This page allows users to explore a family-level overview of the data processed by Serratus.

<img src="doc/explore-coronaviridae.png" width="700" alt="Explore page for Coronaviridae with filters applied">

In the near future, users will be able to click a button to view the respective Query page for applied filters.

### Query

The Query page allows users to view a visual summary report of any SRA run analyzed by Serratus.

Example: [Frank (ERR2756788)](https://serratus.io/query?run=ERR2756788)

<img src="doc/query-frank.png" width="500" alt="Query page for Frank (ERR2756788)">

Users can also query for all SRA runs matching a given viral family or GenBank accession:

<img src="doc/query-genbank.png" width="500" alt="Query page for EU769558.1">
