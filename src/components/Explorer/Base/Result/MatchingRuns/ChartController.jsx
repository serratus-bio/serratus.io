import React from 'react'
import { ExternalLink } from 'common'
import { Chart, renderChart as renderGenericChart } from './ChartD3'
import { BaseContext } from 'components/Explorer/Base/BaseContext'

const resultItemsKey = 'result'

export const ChartController = ({ dataPromise }) => {
    const context = React.useContext(BaseContext)
    const [hasResults, setHasResults] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        if (!dataPromise) return
        setIsLoading(true)
        dataPromise
            .then((data) => {
                setIsLoading(false)
                setHasResults(data && data[resultItemsKey].length !== 0)
                renderGenericChart(
                    data[resultItemsKey],
                    context.result.colMap,
                    context.result.theme.d3InterpolateFunction
                )
            })
            .catch((_err) => {
                setHasError(true)
                setIsLoading(false)
            })
    }, [dataPromise, context.result])

    let loading = <div className='text-center'>Loading... (this might take a while)</div>

    let error = (
        <div className='text-center'>
            <span>This search did not return any results.</span>
            <br />
            <span>If this is unexpected, please </span>
            <ExternalLink
                href='https://github.com/serratus-bio/serratus.io/issues/new'
                className='text-blue-600'>
                submit an issue
            </ExternalLink>
            <span> on the the serratus.io GitHub.</span>
        </div>
    )

    if (isLoading) {
        return loading
    }
    if (hasError || !hasResults) {
        return error
    }
    return <Chart />
}
