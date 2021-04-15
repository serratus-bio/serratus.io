import React from 'react'
import { ExternalLink } from 'common'
import { IChart } from '../Chart/IChart'
import { ResultPagination } from '../types'

type Props = {
    dataPromise: Promise<ResultPagination> | undefined
    chart: IChart
}

export const ChartController = ({ dataPromise, chart }: Props) => {
    const [hasResults, setHasResults] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        if (!dataPromise) return
        async function loadData() {
            const data = (await dataPromise) as ResultPagination
            setHasResults(data.result.length !== 0)
            chart.render(data.result)
        }
        setIsLoading(true)
        loadData() // TODO: handle error
        setIsLoading(false)
    }, [dataPromise])

    const loading = <div className='text-center'>Loading... (this might take a while)</div>

    const noResults = (
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
        // use component from React before chart component has been returned
        if (!chart.componentLoaded) return loading
        chart.setLoading()
        return chart.component
    }
    if (!hasResults) {
        return noResults
    }
    return chart.component
}
