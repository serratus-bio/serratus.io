// Create a TimelinePlot.tsx which is a bargraph which reads the actively selected points in 
// MapPlot.tsx (or if nothing is selected, display all points), and draws a timeline histogram 
// for how many data points exist for each Month. The X-axis should remain static and encompass 
// the total timeline of datapoints available, while the Y-axis should be dynamic and scale to the 
// maximum height of points selected.

//[] TODO: Data should be fetched in parent component and passed to both TimelinePlot and MapPlot children
//[] TODO: Fix this type issue with PlotlyData
//[] TODO: Display only points from selectedPoints

import React from "react"
import * as d3 from 'd3'
import Plotly from 'plotly.js'
import Plot from 'react-plotly.js'
import { RunData } from './types'
import rdrpPosTsv from './rdrp_pos.tsv'

type PlotlyData = any
//Plotly.Data

type RunDataHistogram = Plotly.Datum & {
  [key: string]: string

  run_id: string
  release_date: string
}


type Props = {
  selectedPoints?: RunData[] | undefined
}

const fetchDataFromTSV = async ({selectedPoints}: Props) => {
    let rows: RunDataHistogram[] | undefined

    if (selectedPoints === undefined){
        rows = ((await d3.tsv(rdrpPosTsv)) as object) as RunDataHistogram[]
    } else {
        rows = selectedPoints as RunDataHistogram[]
    }
    //console.log(`ROWS >> ${rows.map((row) => row.release_date)}\n`)

    const findMaxMinDates = (rows: RunDataHistogram[]) => {
    //2019-10-10 14:22:46,2019-10-10 14:22:46,2019-10-10 14:22:46,2019-10-10 14:22:46,2019-10-10 14:22:46,2019-10-10 14:22:46,
    const validDates = rows.filter(row => !isNaN(new Date(row.release_date).getTime()));

    const maxDate = d3.max(validDates, row => new Date(row.release_date).getTime())
    const minDate = d3.min(validDates, row => new Date(row.release_date).getTime())
    return { maxDate, minDate }
    }

    const { maxDate, minDate } = findMaxMinDates(rows)
    return [{
    type: 'histogram',
    x: rows.map((row) => row.release_date),
    autobinx: false,
    xbins: {
        end: maxDate,
        size: "M1",
        start: minDate
    },
    xaxis: {title:{text:"SRA count"}},
    yaxis: {title:{text:"release date"}},
    marker: { color: 'Purple' }
    }]

}

export const HistogramTimeline = ({ selectedPoints }: Props) => {

  const [config, setConfig] = React.useState<{ data: PlotlyData[] }>({data: []});

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromTSV({selectedPoints});
      setConfig({ data });
    };
    fetchData();
  }, []);

  if (!config.data || !config.data.length) return null
 
  return (
    <Plot
      data={config.data}
      layout={{}} //Setting as {} to avoid having to calculate container size and setting width/height to number based on this
    />
  )
}

