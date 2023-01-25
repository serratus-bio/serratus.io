import React from 'react'
import Plot from 'react-plotly.js'
import { RunData } from './types'

type Props = {
    allRowsTimePlot: { [key: string]: number } | undefined
    selectedRows: RunData[] | undefined
}

const createTimePlot = (dataObject: { [key: string]: number }) => {
    const data = [
        {
            x: Object.keys(dataObject),
            y: Object.values(dataObject),
            mode: 'markers',
        },
    ]
    return (
        <Plot
            useResizeHandler
            style={{ width: '100%', height: '100%', minHeight: '500px' }}
            data={data}
            layout={{
                xaxis: {
                    title: 'Release Date',
                },
                yaxis: {
                    title: 'Quantity',
                },
            }}
        />
    )
}

/**
 * This component:
 * - Displays a bar chart with the x-axis the same regardless of props passed in, which is the total number of months represented in the rdrpPosTsv file.
 * - The y-axis and number of bars reflect selected points if there are any, and if not then all points are shown.
 */
export const TimePlot = ({ allRowsTimePlot, selectedRows }: Props) => {
    if (selectedRows && selectedRows.length > 0) {
        let selectedRowsTimePlot: { [key: string]: number } = {}

        //  Initialize the selectedRowsTimePlot to have each month correspond to a 0
        if (allRowsTimePlot) {
            Object.keys(allRowsTimePlot).forEach((month) => (selectedRowsTimePlot[month] = 0))
        }

        // Add to the months array +1 for each month that's in alignment
        if (selectedRows) {
            selectedRows.forEach((row) => {
                const rowDate: string = row.release_date.split(' ')[0].slice(0, -3)
                selectedRowsTimePlot[rowDate] = selectedRowsTimePlot[rowDate] + 1
            })
        }

        return createTimePlot(selectedRowsTimePlot)
    }

    // The else condition is if there are no selected rows in which case we display the full TimePlot for all possible rows
    else if (allRowsTimePlot && (!selectedRows || selectedRows.length === 0)) {
        return createTimePlot(allRowsTimePlot)
    } else return null
}
