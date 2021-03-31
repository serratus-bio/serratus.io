import React from 'react'
import { ExternalLink } from 'common'
import { SequenceChart } from '../Chart/SequenceChart'
import { BaseContext } from 'components/Explorer/Base/BaseContext'

const ChartController = ({ dataPromise }) => {
    const context = React.useContext(BaseContext)
    const [hasResults, setHasResults] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)
    const [chart] = React.useState(
        () =>
            new SequenceChart(
                'run-sequence-lookup-chart',
                context.result.colMap,
                context.result.theme.d3InterpolateFunction,
                context.result.addJbrowseLinks
            )
    )

    React.useEffect(() => {
        if (!dataPromise) return
        setIsLoading(true)

        dataPromise
            .then((data) => {
                setIsLoading(false)
                setHasResults(data && data.length !== 0)
                const resultItemsKey = 'result'
                chart.render(data[resultItemsKey])
            })
            .catch((err) => {
                // TODO: handle error
                setIsLoading(false)
            })
    }, [dataPromise, chart])

    let loading = (
        <div className="text-center">Loading... (this might take a while)</div>
    )

    let noResultsRun = (
        <div className="text-center">
            <span>This accession has not been processed... yet.</span>
            <br />
            <span>To request this sample be processed, please </span>
            <ExternalLink
                href="https://github.com/ababaian/serratus/issues/new"
                className="text-blue-600">
                submit an issue
            </ExternalLink>
            <span> on the Serratus project GitHub.</span>
        </div>
    )

    if (isLoading) {
        // use component from React before chart component has been returned
        if (!chart.componentLoaded()) return loading
        chart.setLoading()
    }
    if (!hasResults) {
        return noResultsRun
    }
    return chart.component
}

export default ChartController
