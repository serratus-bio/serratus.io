import React from 'react'
import { Data, Layout } from 'plotly.js'
import Plot from 'react-plotly.js'

type Props = {
    plotData: Data[]
}

export const TimePlot = ({ plotData }: Props) => {
    const layoutConfig: Partial<Layout> = {
        xaxis: { title: 'Release Date', tickformat: '%b %Y' },
        yaxis: { title: 'Quantity' },
        barmode: 'stack',
    }
    return (
        <Plot
            useResizeHandler
            style={{ width: '100%', height: '100%', minHeight: '500px' }}
            data={plotData}
            layout={layoutConfig}
        />
    )
}
