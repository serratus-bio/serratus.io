import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { SpeciesSelect } from './SpeciesSelect'
import { MapPlot } from './MapPlot'
import { TimePlot } from './TimePlot'
import { SelectionInfo } from './SelectionInfo'
import { RunData } from './types'
import { helpIcon } from 'common'
import * as d3 from 'd3'
import rdrpPosTsv from './rdrp_pos.tsv'
import { DateTime } from 'luxon'
import chroma from 'chroma-js'

async function retrieveAllPossibleRows(
    inputFile: any,
    setAllPossibleRows: React.Dispatch<React.SetStateAction<RunData[] | undefined>>
) {
    let rows = ((await d3.tsv(inputFile)) as object) as RunData[]
    setAllPossibleRows(rows)
}

/**
 * This component:
 * - Begins by reading in all the possible rows contained in the rdrpPosTsv file
 * - Gets all the unique species to pass to the multi-select dropdown
 * - Creates an object of release dates (months) to number of species for all rows
 * - Returns the components of the Geo page
 */

export const Geo = () => {
    const [allPossibleRows, setAllPossibleRows] = React.useState<RunData[]>()
    const [speciesColors, setSpeciesColors] = React.useState<{ [key: string]: string }>()
    const [allRowsTimePlot, setAllRowsTimePlot] = React.useState<{ [key: string]: number }>()

    const [selectedPoints, setSelectedPoints] = React.useState<RunData[]>()
    const [selectedSpecies, setSelectedSpecies] = React.useState<string[]>()
    const [rowsToDisplay, setRowsToDisplay] = React.useState<RunData[]>()
    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false)

    // Retrieve all possible rows from the rdrpPosTsv file
    if (allPossibleRows === undefined) retrieveAllPossibleRows(rdrpPosTsv, setAllPossibleRows)
    // From all of the possible rows, create a set of unique species and from that create a dictionary with key: value pairs of species name to its color value
    if (allPossibleRows && speciesColors === undefined) {
        const uniqueSpecies = [...new Set(allPossibleRows.map((d) => d.scientific_name))].sort()
        const speciesColorsInit: { [key: string]: string } = {}

        for (let i = 0; i < uniqueSpecies.length; i++) {
            speciesColorsInit[uniqueSpecies[i]] = chroma
                .hsl((i / uniqueSpecies.length) * 360, 1, 0.5)
                .hex()
        }
        setSpeciesColors(() => speciesColorsInit)
        console.log('speciesColors', speciesColors)
    }
    // Create an object with key:value pairs corresponding to all months from earliest to latest release date and the number of species' release dates per month
    if (allPossibleRows && allRowsTimePlot === undefined) {
        // Create an array of months spanning the earliest one within all rows on to the latest
        let monthsArray: string[] = []
        const uniqueMonths = [...new Set(allPossibleRows.map((row) => row.release_date))].sort()
        let earliestMonth = DateTime.fromISO(uniqueMonths.slice(0)[0].split(' ')[0])
        const latestMonth = DateTime.fromISO(uniqueMonths.slice(-1)[0].split(' ')[0])

        if (latestMonth < earliestMonth) {
            throw 'Latest date must be greater than earliest.'
        }

        while (earliestMonth < latestMonth) {
            monthsArray.push(earliestMonth.toFormat('yyyy-LL'))
            earliestMonth = earliestMonth.plus({ months: 1 })
        }

        // Convert monthsArr to an object with a key:value pair of string (month) to number, an abbreviation.
        let allRowsTimePlotInit: { [key: string]: number } = {}
        monthsArray.forEach((month) => (allRowsTimePlotInit[month] = 0))

        // Add to the months array +1 for each month that's in alignment
        allPossibleRows.forEach((row) => {
            const rowDate: string = row.release_date.split(' ')[0].slice(0, -3)
            allRowsTimePlotInit[rowDate] = allRowsTimePlotInit[rowDate] + 1
        })

        setAllRowsTimePlot(allRowsTimePlotInit)
    }

    // Derive new selected rows from selectedSpecies and selectedPoints so that changes in either one informs the other
    useEffect(() => {
        if (allPossibleRows) {
            console.log('selected points', selectedPoints)
            console.log('selected species', selectedSpecies)
            console.log('rows to display', rowsToDisplay)

            // If there are selectedPoints but no selectedSpecies
            if (
                selectedPoints &&
                selectedPoints.length > 0 &&
                (!selectedSpecies || selectedSpecies.length === 0)
            ) {
                console.log('in if statement')

                setRowsToDisplay(() => selectedPoints)
            }
            // If there are both selectedPoints and selectedSpecies
            // TODO: Is this one necessary?
            else if (selectedPoints && selectedSpecies) {
                console.log('in first else if')

                setRowsToDisplay(() =>
                    selectedPoints.filter((row) => selectedSpecies.includes(row.scientific_name))
                )
            }
            // If there are only selectedSpecies and no points selected on MapPlot
            else if (selectedSpecies && (!selectedPoints || selectedPoints.length === 0)) {
                console.log('in second else if')

                setRowsToDisplay(() =>
                    allPossibleRows.filter((row) => selectedSpecies.includes(row.scientific_name))
                )
            }
        }
    }, [selectedPoints, selectedSpecies])

    const headTags = (
        <Helmet>
            <title>Serratus | Planetary RNA Virome</title>
        </Helmet>
    )

    return (
        <div className='mx-4 my-2'>
            {headTags}
            <div className='text-center text-xl'>The Planetary RNA Virome</div>

            <button
                className='text-left collapse-button'
                onClick={() => setIsCollapsed(!isCollapsed)}>
                {helpIcon} Info
            </button>
            <div
                className={`collapse-content ${!isCollapsed ? 'collapsed' : 'expanded'}`}
                aria-expanded={isCollapsed}>
                <p>
                    We searched 5.7 million public sequencing libraries for the RNA virus hallmark
                    gene, RNA-dependent RNA Polymerase (RdRP).
                </p>

                <p>
                    This map shows the location of BioSamples from which an intact RdRP sequence
                    could be recovered and geographical meta-data was present.
                </p>

                <p>A 100-meter randomization is applied to all points to prevent overplotting.</p>
            </div>

            <div className='my-2'>
                <SpeciesSelect
                    speciesColors={speciesColors}
                    setSelectedSpecies={setSelectedSpecies}
                />
            </div>
            <div className='my-2'>
                <MapPlot
                    allPossibleRows={allPossibleRows}
                    selectedSpecies={selectedSpecies}
                    setSelectedPoints={setSelectedPoints}
                />
            </div>
            <div className='d-flex justify-content-between'>
                <div className='d-inline text-left text-gray-600'>
                    Use <b>`Shift`</b>-click to select multiple points or the <b>`Box Select`</b> or{' '}
                    <b>`Lasso Select`</b> icons in the top-right.
                </div>
            </div>
            <TimePlot
                allRowsTimePlot={allRowsTimePlot}
                rowsToDisplay={rowsToDisplay}
                speciesColors={speciesColors}
            />
            <SelectionInfo rowsToDisplay={rowsToDisplay} />
        </div>
    )
}
