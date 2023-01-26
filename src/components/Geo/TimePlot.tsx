import { Data } from 'plotly.js'
import React from 'react'
import Plot from 'react-plotly.js'
import { RunData } from './types'

type Props = {
    allRowsTimePlot: { [key: string]: number } | undefined
    rowsToDisplay: RunData[] | undefined
    speciesColors: { [key: string]: string } | undefined
}

const createTimePlotSelected = (dataObject: Data[]) => {
    return (
        <Plot
            useResizeHandler
            style={{ width: '80%', height: '100%', minHeight: '500px', margin: 'auto' }}
            data={dataObject}
            layout={{
                xaxis: {
                    title: 'Release Date',
                },
                yaxis: {
                    title: 'Quantity',
                },
                barmode: 'stack',
            }}
        />
    )
}

const createTimePlotAll = (dataObject: { [key: string]: number }) => {
    const data: Data[] = [
        {
            x: Object.keys(dataObject),
            y: Object.values(dataObject),
            type: 'bar',
            marker: { color: 'blue' },
        },
    ]

    return (
        <Plot
            useResizeHandler
            style={{ width: '90%', height: '80%', minHeight: '500px', margin: 'auto' }}
            data={data}
            layout={{
                xaxis: {
                    title: 'Release Date',
                },
                yaxis: {
                    title: 'Quantity',
                },
                barmode: 'stack',
            }}
        />
    )
}

/**
 * This component:
 * - Displays a bar chart with the x-axis the same regardless of props passed in, which is the total number of months represented in the rdrpPosTsv file.
 * - The y-axis and number of bars reflect selected points if there are any, and if not then all points are shown.
 */
export const TimePlot = ({ allRowsTimePlot, rowsToDisplay, speciesColors }: Props) => {
    // If specific rows are selected
    // Create a different data object for each species,
    /**
     * type: 'bar',
     * marker: speciesColor[species]
     * x: allMonthsArr
     * y: months where this species shows up
     *
     * First up, let's create an x-axis with the entire range of months
     * For each row, if it's a new species, create a new object to add to array; if it's the same species then increment the month for that species
     * How can I increment that specific month?
     */

    if (rowsToDisplay && rowsToDisplay.length > 0 && speciesColors && allRowsTimePlot) {
        let rowsToDisplayData: { [key: string]: any } = []
        const allMonthsArr = Object.keys(allRowsTimePlot)

        rowsToDisplay.forEach((row) => {
            if (rowsToDisplayData[row.scientific_name] === undefined) {
                rowsToDisplayData[row.scientific_name] = {
                    x: allMonthsArr,
                    y: new Array(allMonthsArr.length),
                    type: 'bar',
                    marker: { color: speciesColors[row.scientific_name] },
                    name: row.scientific_name,
                }
                const rowDate: string = row.release_date.split(' ')[0].slice(0, -3)
                rowsToDisplayData[row.scientific_name].y[allMonthsArr.indexOf(rowDate)] = 1
            } else {
                const rowDate: string = row.release_date.split(' ')[0].slice(0, -3)
                rowsToDisplayData[row.scientific_name].y[allMonthsArr.indexOf(rowDate)] += 1
            }
        })

        return createTimePlotSelected(Object.values(rowsToDisplayData))
    }

    // The else condition is if there are no selected rows in which case we display the full TimePlot for all possible rows
    else if (allRowsTimePlot && (!rowsToDisplay || rowsToDisplay.length === 0)) {
        return createTimePlotAll(allRowsTimePlot)
    } else return null
}
