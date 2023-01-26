import chroma from 'chroma-js'
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

export interface SpeciesOption {
    readonly value: string
    readonly label: string
    readonly color: string
    readonly isFixed?: boolean
    readonly isDisabled?: boolean
}

// export const colourOptions: readonly ColourOption[] = [
//     { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
//     { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
//     { value: 'purple', label: 'Purple', color: '#5243AA' },
//     { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
//     { value: 'orange', label: 'Orange', color: '#FF8B00' },
//     { value: 'yellow', label: 'Yellow', color: '#FFC400' },
//     { value: 'green', label: 'Green', color: '#36B37E' },
//     { value: 'forest', label: 'Forest', color: '#00875A' },
//     { value: 'slate', label: 'Slate', color: '#253858' },
//     { value: 'silver', label: 'Silver', color: '#666666' },
// ]
