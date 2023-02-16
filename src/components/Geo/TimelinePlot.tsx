// Create a TimelinePlot.tsx which is a bargraph which reads the actively selected points in 
// MapPlot.tsx (or if nothing is selected, display all points), and draws a timeline histogram 
// for how many data points exist for each Month. The X-axis should remain static and encompass 
// the total timeline of datapoints available, while the Y-axis should be dynamic and scale to the 
// maximum height of points selected.

//[] TODO: Data should be fetched in parent component and passed to both TimelinePlot and MapPlot children

import React from "react"
import * as d3 from 'd3'
import Plotly from 'plotly.js'
import Plot from 'react-plotly.js'
import { RunData } from './types'
import rdrpPosTsv from './rdrp_pos.tsv'

// temp fix pending https://github.com/DefinitelyTyped/DefinitelyTyped/pull/44030
type PlotlyData = any
//Plotly.Data
//[] TODO: Fix this type issue

type RunDataHistogram = Plotly.Datum & {
  [key: string]: string

  run_id: string
  release_date: string
}


type Props = {
  selectedPoints?: RunData[]
}

const fetchDataFromTSV = async () => {
  const rows = ((await d3.tsv(rdrpPosTsv)) as object) as RunDataHistogram[]
  //console.log(`ROWS >> ${rows.map((row) => row.release_date)}\n`)

  const findMaxMinDates = (rows: RunDataHistogram[]) => {
    const validDates = rows.filter(row => !isNaN(new Date(row.release_date).getTime()));

    const maxDate = validDates.reduce((accu, row) => {
      return Math.max(accu, new Date(row.release_date).getTime());
    }, new Date("1970-01-01T00:00:00.000Z").getTime());

    //2019-10-10 14:22:46,2019-10-10 14:22:46,2019-10-10 14:22:46,2019-10-10 14:22:46,2019-10-10 14:22:46,2019-10-10 14:22:46,

    //const minDate = new Date(Math.min(...rows.map(e => new Date(e.release_date))))
    const minDate = validDates.reduce((accu, row) => {
      return Math.min(accu, new Date(row.release_date).getTime());
    }, new Date("9999-01-01T00:00:00.000Z").getTime()); //returning NaN

    console.log(`MaxDate = ${maxDate} & MinDate = ${minDate}`)
    return { maxDate, minDate }
  }

  const { maxDate, minDate } = findMaxMinDates(rows)
  //const yearMonthFormat = d3.timeFormat("%Y-%m")

  //nbinsx is 12 months * # of years
  return [{
    type: 'histogram',
    x: rows.map((row) => row.release_date),
    autobinx: false,
    xbins: {
        end: maxDate,
        size: "M1",
        start: minDate
    },
    marker: { color: 'Maroon' }
  }]

}

export const HistogramTimeline = ({ selectedPoints }: Props) => {
  //[] TODO: Display only points from selectedPoints

  const [config, setConfig] = React.useState<{ data: PlotlyData[] }>({data: []});

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromTSV();
      setConfig({ data });
    };
    fetchData();
  }, []);

  if (!config.data || !config.data.length) return null

  return (
    <Plot
      data={config.data}
      layout={{ width: 320, height: 420}}
    />
  )
}

