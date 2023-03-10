import React from 'react'
import Plotly from 'plotly.js'
import Plot from 'react-plotly.js'
import { RunData } from './types'
import { fetchPagedGeoMatches } from 'components/Explorer/Base/Result/SerratusApiCalls'

type Props = {
    setSelectedPoints: React.Dispatch<React.SetStateAction<RunData[] | undefined>>
}

// temp fix pending https://github.com/DefinitelyTyped/DefinitelyTyped/pull/44030
type PlotlyData = Plotly.Data &
    Partial<{
        selected: Partial<{
            marker: Partial<Plotly.PlotMarker>
            textfont: Partial<Plotly.Font>
        }>
    }>

const MapPlot = ({ setSelectedPoints }: Props) => {
    const [geoPaginatedDated, setGeoPaginatedData] = React.useState<{
        [page: string]: Partial<Plotly.PlotData>
    }>({})

    const layoutConfig: Partial<Plotly.Layout> = {
        mapbox: { style: 'open-street-map', zoom: 1, pitch: 0 },
        margin: { t: 0, b: 0, l: 0, r: 0 },
        autosize: true,
        clickmode: 'event+select',
    }

    React.useEffect(() => {
        async function render() {
            fetchData()
        }
        render()
    }, [])

    function onSelected(selectedData: Readonly<Plotly.PlotSelectionEvent>) {
        // TODO: use type annotation
        const points = selectedData.points.map((point) => point.customdata) as RunData[]
        setSelectedPoints(points)
    }

    async function fetchData() {
        // Fetch first page to get total
        let page = 1
        const perPage = 20000
        const searchType = 'rdrp'
        const { result, total } = await fetchPagedGeoMatches(searchType, page, perPage)
        transformAndStoreGeoData(result as RunData[], page)

        // Batch requests for remaining pages
        const totalPages = Math.ceil(total / perPage)
        const iterPages = []
        for (page = page + 1; page <= totalPages; page++) {
            if (!(page in geoPaginatedDated)) {
                iterPages.push(page)
            }
        }
        await Promise.allSettled(
            iterPages.map(async (page) => {
                const { result } = await fetchPagedGeoMatches(searchType, page as number, perPage)
                transformAndStoreGeoData(result as RunData[], page as number)
            })
        )
    }

    function transformAndStoreGeoData(rows: RunData[], page: number) {
        if (!rows.length) {
            return
        }
        function transformCoordinates(rows: RunData[], key: string) {
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
        setGeoPaginatedData((prevState) => ({
            ...prevState,
            [page]: {
                lon: transformCoordinates(rows, 'coordinate_x'),
                lat: transformCoordinates(rows, 'coordinate_y'),
                customdata: rows,
                text: getHoverText(rows),
            },
        }))
    }

    function mergePaginatedGeoData(): Partial<Plotly.PlotData>[] {
        const mapConfig: PlotlyData = {
            type: 'scattermapbox',
            mode: 'markers',
            hoverinfo: 'text',
            marker: { color: 'Maroon', size: 5, opacity: 1 },
            selected: { marker: { color: 'Purple', size: 7, opacity: 1 } },
        }
        const geoData: Partial<Plotly.PlotData> = {
            lon: [],
            lat: [],
            customdata: [],
            text: [],
        }
        for (const [, row] of Object.entries(geoPaginatedDated)) {
            row?.lon && geoData?.lon?.push(...row.lon)
            row?.lat && geoData?.lat?.push(...row.lat)
            row?.customdata && geoData?.customdata?.push(...(row.customdata as any))
            row?.text &&
                typeof row?.text === 'object' &&
                typeof geoData?.text === 'object' &&
                geoData?.text?.push(...row.text)
        }
        return [
            {
                ...mapConfig,
                ...geoData,
            },
        ]
    }

    return (
        <Plot
            revision={1}
            data={mergePaginatedGeoData()}
            layout={layoutConfig}
            useResizeHandler
            style={{ width: '100%', height: '100%', minHeight: '500px' }}
            onSelected={onSelected}
        />
    )
}

export const MemoizedMapPlot = React.memo(MapPlot)
