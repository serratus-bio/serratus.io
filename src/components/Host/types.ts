import Plotly from 'plotly.js'

export type RunData = Plotly.Datum & {
    [key: string]: string

    run_id: string
    biosample_id: string
    release_date: string
    tax_id: string
    scientific_name: string
    coordinate_x: string
    coordinate_y: string
    from_text: string
}

export type PlotlyData = Plotly.Data &
    Partial<{
        selected: Partial<{
            marker: Partial<Plotly.PlotMarker>
            textfont: Partial<Plotly.Font>
        }>
    }>

/* eslint-disable no-unused-vars */
export enum RunDataKey {
    RunId = 'run_id',
    TaxId = 'tax_id',
    ScientificName = 'scientific_name',
    ReleaseDate = 'release_date',
    BiosampleId = 'biosample_id',
    CoordinateX = 'coordinate_x',
    CoordinateY = 'coordinate_y',
    FromText = 'from_text',
}
/* eslint-disable no-unused-vars */

export interface SpeciesOption {
    readonly value: string
    readonly label: string
    readonly color?: string
}

export type GroupedRunData = {
    [groupByKey: string]: RunData[]
}

export type GroupedRunDataCounter = {
    [dateKey: string]: {
        [groupByKey: string]: number
    }
}
