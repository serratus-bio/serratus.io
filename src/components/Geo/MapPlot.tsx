import React from 'react'
import Plotly from 'plotly.js'
import Plot from 'react-plotly.js'
import { RunData } from './types'

type Props = {
    allPossibleRows: RunData[] | undefined
    selectedSpecies: String[] | undefined
    setSelectedPoints: React.Dispatch<React.SetStateAction<RunData[] | undefined>>
}

export const MapPlot = ({ allPossibleRows, selectedSpecies, setSelectedPoints }: Props) => {
    function onSelected(selectedData: Readonly<Plotly.PlotSelectionEvent>) {
        // TODO: use type annotation
        const points = selectedData.points.map((point) => point.customdata) as RunData[]
        setSelectedPoints(points)
    }

    if (allPossibleRows) {
        const [config, setConfig] = React.useState<{ data: PlotlyData[] }>({
            data: [],
        })

        React.useEffect(() => {
            async function render() {
                setConfig({ data: await getData(allPossibleRows, selectedSpecies) })
            }
            render()
        }, [selectedSpecies])

        if (!config.data || !config.data.length) return null

        return (
            <Plot
                data={config.data}
                layout={layout}
                useResizeHandler
                style={{ width: '100%', height: '100%', minHeight: '500px' }}
                onSelected={onSelected}
                onUpdate={(figure) => setConfig(figure)}
            />
        )
    } else return null
}

const layout: Partial<Plotly.Layout> = {
    mapbox: { style: 'open-street-map', zoom: 1, pitch: 15 },
    margin: { t: 0, b: 0, l: 0, r: 0 },
    autosize: true,
    clickmode: 'event+select',
}

async function getData(
    allPossibleRows: RunData[],
    selectedSpecies: String[] | undefined
): Promise<PlotlyData[]> {
    // TODO: use type annotation
    let rows = allPossibleRows
    if (rows && selectedSpecies && selectedSpecies.length > 0) {
        rows = rows.filter((row) => selectedSpecies.includes(row.scientific_name))
    }
    function unpack(rows: RunData[], key: string) {
        return rows.map((row) => {
            if (key === 'coordinate_x' || key === 'coordinate_y') {
                // +(0~111) meters per https://www.usna.edu/Users/oceano/pguth/md_help/html/approx_equivalents.htm
                return parseFloat(row[key]) + 0.001 * Math.random()
            }
            return row[key]
        })
    }

    function getHoverText(rows: RunData[]): string[] {
        return rows.map((row) => {
            let text = `${row.run_id}
                <br>Organism: ${row.scientific_name}`
            if (row.from_text) {
                text += `<br>Inferred location: "${row.from_text}"`
            }
            return text
        })
    }

    return [
        {
            type: 'scattermapbox',
            lon: unpack(rows, 'coordinate_x'),
            lat: unpack(rows, 'coordinate_y'),
            mode: 'markers',
            customdata: rows,
            text: getHoverText(rows),
            hoverinfo: 'text',
            marker: { color: 'Maroon', size: 5, opacity: 1 },
            selected: { marker: { color: 'Purple', size: 7, opacity: 1 } },
        },
    ]
}

// temp fix pending https://github.com/DefinitelyTyped/DefinitelyTyped/pull/44030
type PlotlyData = Plotly.Data &
    Partial<{
        selected: Partial<{
            marker: Partial<Plotly.PlotMarker>
            textfont: Partial<Plotly.Font>
        }>
    }>
