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
    const [allUniqueSpecies, setAllUniqueSpecies] = React.useState<string[]>()
    const [allRowsTimePlot, setAllRowsTimePlot] = React.useState<{ [key: string]: number }>()

    const [selectedPoints, setSelectedPoints] = React.useState<RunData[]>()
    const [selectedSpecies, setSelectedSpecies] = React.useState<String[]>()
    const [selectedRows, setSelectedRows] = React.useState<RunData[]>()
    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false)

    // Retrieve all possible rows from the rdrpPosTsv file
    if (allPossibleRows === undefined) retrieveAllPossibleRows(rdrpPosTsv, setAllPossibleRows)
    // From all of the possible rows, distill the unique species to be passed into the SpeciesSelect component
    if (allPossibleRows && allUniqueSpecies === undefined)
        setAllUniqueSpecies([...new Set(allPossibleRows.map((d) => d.scientific_name))].sort())
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
            if (selectedPoints && (!selectedSpecies || selectedSpecies.length === 0)) {
                setSelectedRows(() => selectedPoints)
            } else if (selectedPoints && selectedSpecies) {
                setSelectedRows(() =>
                    selectedPoints.filter((row) => selectedSpecies.includes(row.scientific_name))
                )
            } else if (selectedSpecies && (!selectedPoints || selectedPoints.length === 0)) {
                setSelectedRows(() =>
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
                    allUniqueSpecies={allUniqueSpecies}
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

            <div className='text-left text-gray-600'>
                Use <b>`Shift`</b>-click to select multiple points or the <b>`Box Select`</b> or{' '}
                <b>`Lasso Select`</b> icons in the top-right.
            </div>
            <TimePlot allRowsTimePlot={allRowsTimePlot} selectedRows={selectedRows} />
            <SelectionInfo selectedRows={selectedRows} />
        </div>
    )
}
