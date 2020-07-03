# serratus.io

Serratus website built using Flask and Vue.js.

## Quickstart

Clone the repository, build and preview the site locally:

```
git clone https://github.com/serratus-bio/serratus.io.git
cd serratus.io
cd frontend
npm install
npm run build
cd ..
bash run.sh
```

Go to http://localhost:5000/

## API (in development)

- `/api/summary/<sra_accession>`: raw JSON of summary file
    - Example: https://dev.serratus.io/api/summary/ERR2756788
- `/api/summary/<sra_accession>/coverage_heatmap.png`: coverage heatmap constructed from coverage cartoons.
    - Example: https://dev.serratus.io/api/summary/ERR2756788/coverage_heatmap.png

## Useful links

- [Vue.js Configuration Reference](https://cli.vuejs.org/config/)
