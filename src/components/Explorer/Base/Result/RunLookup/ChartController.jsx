import React from 'react'
import { ExternalLink } from 'common'

const resultItemsKey = 'result'

export const ChartController = ({ dataPromise, chart }) => {
    const [hasResults, setHasResults] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        if (!dataPromise) return
        async function loadData() {
            const data = await dataPromise
            setHasResults(data && data[resultItemsKey].length !== 0)
            chart.render(data[resultItemsKey])
        }
        setIsLoading(true)
        loadData() // TODO: handle error
        setIsLoading(false)
    }, [dataPromise])

    const loading = <div className='text-center'>Loading... (this might take a while)</div>

    const noResultsRun = (
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
        // use component from React before chart component has been returned
        if (!chart.componentLoaded()) return loading
        chart.setLoading()
    }
    if (!hasResults) {
        return noResultsRun
    }
    return chart.component
}
