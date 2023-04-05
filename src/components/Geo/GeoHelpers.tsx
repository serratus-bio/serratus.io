import Plotly from 'plotly.js'
import chroma from 'chroma-js'
import { RunData, PlotlyData, GroupedRunDataCounter, RunDataKey, GroupedRunData } from './types'

function getColorFromIndex(index: number) {
    // Ref: https://stackoverflow.com/a/20129594
    const hue = ((index + 1) * 137.508 + 60) % 360 // use golden angle approximation
    return `hsl(${hue}, 100%, 50%)`
}

const DEFAULT_MARKER_COLOR = 'hsl(3.72, 52.22%, 48.43%)'

export function getColorFromSelectedIndex(
    selectionName: string,
    selectedOptions: string[],
    defaultColor: string = DEFAULT_MARKER_COLOR
) {
    const selectedIndex = selectedOptions.indexOf(selectionName)
    return selectedIndex >= 0 ? getColorFromIndex(selectedIndex) : defaultColor
}

export function getRunDataFromPaginatedData(
    paginatedRunData: { [page: string]: RunData[] },
    filterRunIds?: string[]
) {
    const results = Object.values(paginatedRunData).flat()
    if (!filterRunIds || filterRunIds?.length === 0) {
        return results
    }
    const set = new Set(filterRunIds)

    return results.filter((row) => set.has(row.run_id))
}

export function getBioIdsFromRunData(selectedPoints: RunData[]) {
    return selectedPoints.map((point) => point?.[RunDataKey.BiosampleId])
}

export function filterRunDataByGroup(
    runData: RunData[],
    groupOptions: string[],
    groupKey: RunDataKey
): RunData[] {
    if (!runData.length) {
        return []
    }
    if (!groupOptions.length) {
        return runData
    }
    return runData.filter((row) => groupOptions.includes(row?.[groupKey]))
}

export function groupRunDataByKey(runData: RunData[], groupKey: RunDataKey): GroupedRunData {
    const groupedRunData: GroupedRunData = {}
    if (!runData.length) {
        return groupedRunData
    }
    runData.forEach((row) => {
        if (groupedRunData[row?.[groupKey]] === undefined) {
            groupedRunData[row?.[groupKey]] = []
        }
        groupedRunData[row?.[groupKey]].push(row)
    })
    return groupedRunData
}

function convertMapCoordinates(row: RunData, key: string) {
    if (key === 'coordinate_x' || key === 'coordinate_y') {
        // +(0~111) meters per https://www.usna.edu/Users/oceano/pguth/md_help/html/approx_equivalents.htm
        return parseFloat(row[key]) + 0.001 * Math.random()
    }
    return row[key]
}

function getMapHoverText(row: RunData): string {
    let text = `${row.run_id}
        <br>Scientific Name: ${row[RunDataKey.ScientificName]}`
    if (row.from_text) {
        text += `<br>Inferred location: "${row.from_text}"`
    }
    return text
}

export function transformToMapPlotData(
    groupedRunData: GroupedRunData = {},
    selectedSpecies: string[] = [],
    selectedPoints: string[] = []
) {
    const baseConfig: PlotlyData = {
        type: 'scattermapbox',
        mode: 'markers',
        hoverinfo: 'text',
        showlegend: false,
        marker: { size: 5, color: DEFAULT_MARKER_COLOR },
    }

    const plotData = []
    if (Object.keys(groupedRunData).length === 0) {
        plotData.push(baseConfig)
    }

    for (const [scientificName, runData] of Object.entries(groupedRunData)) {
        const geoData: Partial<Plotly.PlotData> = {
            lon: [],
            lat: [],
            customdata: [],
            text: [],
            selectedpoints: [],
        }
        const markerColor = getColorFromSelectedIndex(scientificName, selectedSpecies)
        const colorObj = chroma(markerColor)
        const markerConfig: PlotlyData = {
            selected: {
                marker: {
                    color: colorObj.brighten(1).saturate(1).css(),
                    size: 8,
                    opacity: 1,
                },
            },
            unselected: {
                marker: { color: colorObj.luminance(0.15).css(), opacity: 1 },
                textfont: { color: markerColor },
            },
            hoverlabel: {
                bgcolor: markerColor,
                font: { color: chroma.contrast(colorObj, 'white') > 2 ? 'white' : 'black' },
            },
            marker: { size: 5, color: colorObj.luminance(0.15).css() },
        }
        runData.forEach((row, index) => {
            geoData?.lon?.push(convertMapCoordinates(row, 'coordinate_x'))
            geoData?.lat?.push(convertMapCoordinates(row, 'coordinate_y'))
            geoData?.customdata?.push(row as any)
            typeof geoData?.text === 'object' && geoData?.text?.push(getMapHoverText(row))
            if (selectedPoints.includes(row?.[RunDataKey.BiosampleId])) {
                geoData?.selectedpoints?.push(index)
            }
        })
        plotData.push({
            ...baseConfig,
            ...markerConfig,
            ...geoData,
        })
    }
    return plotData
}

export function countRunDataByDateAndKey(
    runData: RunData[],
    groupByKey: RunDataKey
): GroupedRunDataCounter {
    const timePlotData: GroupedRunDataCounter = {}

    runData
        .filter((row) => !isNaN(Date.parse(row?.[RunDataKey.ReleaseDate])) && row?.[groupByKey])
        .forEach((row) => {
            const formattedReleaseDate = new Date(row?.[RunDataKey.ReleaseDate])
                .toISOString()
                .slice(0, 7)
            if (timePlotData[formattedReleaseDate] === undefined) {
                timePlotData[formattedReleaseDate] = {
                    total: 0,
                }
            }
            if (timePlotData[formattedReleaseDate][row?.[groupByKey]] === undefined) {
                timePlotData[formattedReleaseDate][row?.[groupByKey]] = 0
            }
            timePlotData[formattedReleaseDate].total += 1
            timePlotData[formattedReleaseDate][row?.[groupByKey]] += 1
        })
    return timePlotData
}

export function transformToTimePlotData(
    dateCounter: GroupedRunDataCounter,
    selectedSpecies: string[]
): Partial<Plotly.PlotData>[] {
    if (selectedSpecies.length === 0) {
        return [
            {
                x: Object.keys(dateCounter),
                y: Object.values(dateCounter).map((counter) => counter.total),
                type: 'bar',
                marker: { color: DEFAULT_MARKER_COLOR },
            },
        ]
    }
    return selectedSpecies.map((speciesName) => {
        const color = getColorFromSelectedIndex(speciesName, selectedSpecies)
        const xValues = []
        const yValues = []
        for (const [date, counter] of Object.entries(dateCounter)) {
            if (counter[speciesName]) {
                xValues.push(date)
                yValues.push(counter[speciesName])
            }
        }
        return {
            x: xValues,
            y: yValues,
            type: 'bar',
            marker: { color: color },
            showlegend: false,
            name: speciesName,
            hovertemplate:
                `<b>Scientific Name</b>: ${speciesName}<br>` +
                '<b>Month</b>: %{x}<br>' +
                '<b>Count Per Month: </b>%{y}' +
                `<extra></extra>`,
        }
    })
}
