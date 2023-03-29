import React from 'react'
import Plotly from 'plotly.js'
import Plot, { PlotParams } from 'react-plotly.js'
import { RunData } from './types'

type Props = {
    setSelectedPoints: React.Dispatch<React.SetStateAction<RunData[]>>
    plotData: Partial<Plotly.PlotData>[] | [] | any
}

export const MapPlot = ({ setSelectedPoints, plotData }: Props) => {
    const layoutConfig: Partial<Plotly.Layout> = {
        mapbox: { style: 'open-street-map', zoom: 1, pitch: 0 },
        margin: { t: 0, b: 0, l: 0, r: 0 },
        autosize: true,
        clickmode: 'event+select',
    }
    const [config, setConfig] = React.useState<PlotParams>({
        data: plotData,
        layout: layoutConfig,
        frames: [],
        config: {},
    })

    React.useEffect(() => {
        setConfig((prevConfig) => ({ ...prevConfig, data: plotData }))
    }, [plotData])

    function onSelected(selectedData: Readonly<Plotly.PlotSelectionEvent>) {
        const points = selectedData.points.map((point) => point.customdata) as RunData[]
        setSelectedPoints(points)
    }

    return (
        <Plot
            data={config.data}
            layout={config.layout}
            frames={config.frames}
            config={config.config}
            onInitialized={(figure) =>
                setConfig({
                    ...figure,
                    data: plotData,
                } as PlotParams)
            }
            onUpdate={(figure) => setConfig(figure as PlotParams)}
            useResizeHandler
            style={{ width: '100%', height: '100%', minHeight: '500px' }}
            onSelected={onSelected}
            onDeselect={() => setSelectedPoints([])}
            onDoubleClick={() => setSelectedPoints([])}
        />
    )
}
