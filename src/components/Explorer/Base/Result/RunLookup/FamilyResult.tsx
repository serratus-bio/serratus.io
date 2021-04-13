import React from 'react'
import { Paginator } from '../Paginator'
import { ChartController } from './ChartController'
import { FamilyChart } from '../Chart/FamilyChart'
import { getRunTitle } from '../ResultHelpers'
import { BaseContext } from 'components/Explorer/Base/BaseContext'
import { fetchPagedRunMatches } from './SerratusApiCalls'
import { ResultPagination } from './types'
import { Filters } from 'components/Explorer/types'

type Props = {
    runId: string
    filters: Filters
    drilldownCallback: (_familyId: string) => void
}

export const FamilyResult = ({ runId, filters, drilldownCallback }: Props) => {
    const context = React.useContext(BaseContext)
    const perPage = 10
    const [pageNumber, setPageNumber] = React.useState(1)
    const [dataPromise, setDataPromise] = React.useState<Promise<ResultPagination>>()
    const [pageTitle, setPageTitle] = React.useState()
    const [chart] = React.useState(
        () =>
            new FamilyChart(
                'run-family-lookup-chart',
                context.result.colMap,
                context.result.theme.d3InterpolateFunction,
                drilldownCallback
            )
    )
    const LinkButtons = context.result.LinkButtons

    React.useEffect(() => {
        if (!runId) return
        getRunTitle(runId).then(setPageTitle)
    }, [runId])

    React.useEffect(() => {
        if (!runId) return
        setDataPromise(
            fetchPagedRunMatches(context.searchType, runId, pageNumber, perPage, filters)
        )
    }, [context.searchType, runId, pageNumber])

    return (
        <div className='max-w-4xl m-auto'>
            <div>
                <div className='w-full text-center'>
                    <div>
                        <div className='text-xl font-bold'>{runId}</div>
                        {pageTitle && <div className='text-lg italic'>{pageTitle}</div>}
                    </div>
                </div>
                <div className='flex justify-center items-center my-2'>
                    <LinkButtons searchLevel='run' searchLevelValue={runId} />
                </div>
            </div>
            <div className='p-6'>
                <Paginator
                    pageNumber={pageNumber}
                    perPage={perPage}
                    setPageNumber={setPageNumber}
                    dataPromise={dataPromise}
                />
                <ChartController dataPromise={dataPromise} chart={chart} />
            </div>
        </div>
    )
}
