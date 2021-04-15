import React from 'react'
import { Paginator } from '../Paginator'
import { ChartController } from './ChartController'
import { FamilyChart } from '../Chart/FamilyChart'
import { BaseContext } from 'components/Explorer/Base/BaseContext'
import { fetchPagedRunMatches } from './SerratusApiCalls'
import { ResultPagination } from '../types'
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
    const [chart] = React.useState(
        () =>
            new FamilyChart(
                'family-matches',
                context.result.colMap,
                context.result.theme.d3InterpolateFunction,
                drilldownCallback
            )
    )

    React.useEffect(() => {
        if (!runId) return
        setDataPromise(
            fetchPagedRunMatches(context.searchType, runId, pageNumber, perPage, filters)
        )
    }, [context.searchType, runId, pageNumber])

    return (
        <>
            <Paginator
                pageNumber={pageNumber}
                perPage={perPage}
                setPageNumber={setPageNumber}
                dataPromise={dataPromise}
            />
            <ChartController dataPromise={dataPromise} chart={chart} />
        </>
    )
}
