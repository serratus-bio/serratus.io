// Create a TimelinePlot.tsx which is a bargraph which reads the actively selected points in 
// MapPlot.tsx (or if nothing is selected, display all points), and draws a timeline histogram 
// for how many data points exist for each Month. The X-axis should remain static and encompass 
// the total timeline of datapoints available, while the Y-axis should be dynamic and scale to the 
// maximum height of points selected.

//[] TODO: Data should be fetched in parent component and passed to both TimelinePlot and MapPlot children
//[] TODO: Fix this type issue with PlotlyData
//[X] TODO: Display only points from selectedPoints

import React from "react"
import * as d3 from 'd3'
import Plotly from 'plotly.js'
import Plot from 'react-plotly.js'
import { RunData } from './types'
import rdrpPosTsv from './rdrp_pos.tsv'

type PlotlyData = any

type RunDataHistogram = Plotly.Datum & {
  [key: string]: string

  run_id: string
  release_date: string
}


type Props = {
  selectedPoints?: RunData[] | undefined
}

const fetchDataFromTSV = async () => {
    const rows = ((await d3.tsv(rdrpPosTsv)) as object) as RunDataHistogram[]
    //Sample format
    //2019-10-10 14:22:46,2019-10-10 14:22:46,2019-10-10 14:22:46,2019-10-10 14:22:46,2019-10-10 14:22:46,2019-10-10 14:22:46,
    const validDates = rows.filter(row => !isNaN(new Date(row.release_date).getTime()));
    const maxDate = d3.max(validDates, row => new Date(row.release_date).getTime())
    const minDate = d3.min(validDates, row => new Date(row.release_date).getTime())
 
    return {
        histogramConfig: {
            type: 'histogram',
            x: rows.map((row) => row.release_date),
            autobinx: false,
            xbins: {
                end: maxDate,
                size: "M1",
                start: minDate
            },
            marker: { color: 'Purple' }
        }
    }

}

export const HistogramTimeline = ({ selectedPoints }: Props) => {
    const [config, setConfig] = React.useState<{ data: PlotlyData[] }>({data: []});
    const [dataFetched, setDataFetched] = React.useState(false)
    const [histogramData, setHistogramData] = React.useState<PlotlyData>()

    React.useEffect(() => {
        if (!dataFetched) {
            const fetchData = async () => {
                const {histogramConfig} = await fetchDataFromTSV();
                setHistogramData(histogramConfig)
                setDataFetched(true)
            };
            fetchData();
        }
    }, [dataFetched]);

    React.useEffect(() => {
        if (!selectedPoints && histogramData){
            setConfig({data: [histogramData]})
        } else if (selectedPoints && histogramData){
            const overlayHistogram = {
                type: "histogram",
                x: selectedPoints.map((point)=> point.release_date),
                autobinx: false,
                xbins: {
                    end: histogramData.xbins.end,
                    size: histogramData.xbins.size,
                    start: histogramData.xbins.start
                },
                marker: {color: "Orange"}
            }
            setConfig({data: [overlayHistogram]})
        }
    }, [selectedPoints, histogramData])

    if (!config.data || !config.data.length) return null

    return (
    <Plot
        data={config.data}
        layout={{
            barmode: "overlay",
            xaxis: {
                title: "release date",
                range: [histogramData?.xbins?.start, histogramData?.xbins?.end]
            },
            yaxis: {title: "SRA count"}
        }}
    />
  )
}

