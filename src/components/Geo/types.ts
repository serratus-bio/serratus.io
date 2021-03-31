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
