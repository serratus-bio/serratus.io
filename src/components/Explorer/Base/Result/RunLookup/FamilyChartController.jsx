import React from 'react'
import { ExternalLink } from 'common'
import Chart, { renderChart as renderRunChart } from './FamilyChartD3'
import { BaseContext } from 'components/Explorer/Base/BaseContext'

const ChartController = ({ dataPromise, drilldownCallback }) => {
    const context = React.useContext(BaseContext)
    const [hasResults, setHasResults] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        if (!dataPromise) return
        setIsLoading(true)

        dataPromise
            .then((data) => {
                setIsLoading(false)
                setHasResults(data && data.length !== 0)
                const resultItemsKey = 'result'
                renderRunChart(
                    data[resultItemsKey],
                    context.result.colMap,
                    context.result.theme.d3InterpolateFunction,
                    drilldownCallback
                )
            })
            .catch((_err) => {
                // TODO: handle error
                setIsLoading(false)
            })
    }, [dataPromise, context.result, drilldownCallback])

    let loading = <div className='text-center'>Loading... (this might take a while)</div>

    let noResultsRun = (
        <div className='text-center'>
            <span>This accession has not been processed... yet.</span>
            <br />
            <span>To request this sample be processed, please </span>
            <ExternalLink
                href='https://github.com/ababaian/serratus/issues/new'
                className='text-blue-600'>
                submit an issue
            </ExternalLink>
            <span> on the Serratus project GitHub.</span>
        </div>
    )

    if (isLoading) {
        return loading
    }
    if (!hasResults) {
        return noResultsRun
    }
    return <Chart />
}

export default ChartController
