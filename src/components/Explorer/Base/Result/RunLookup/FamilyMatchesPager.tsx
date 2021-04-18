import React from 'react'
import { Paginator } from '../Paginator'
import { ChartController } from '../Chart/ChartController'
import { FamilyChart } from '../Chart/FamilyChart'
import { DrillDownCallback } from '../Chart/types'
import { BaseContext } from 'components/Explorer/Base/BaseContext'
import { fetchPagedRunMatches } from '../SerratusApiCalls'
import { ResultPagination } from '../types'
import { Filters } from 'components/Explorer/types'

type Props = {
    runId: string
    filters: Filters
    drillDownCallback: DrillDownCallback
}

export const FamilyMatchesPager = ({ runId, filters, drillDownCallback }: Props) => {
    const context = React.useContext(BaseContext)
    const perPage = 10
    const [page, setPage] = React.useState(1)
    const [dataPromise, setDataPromise] = React.useState<Promise<ResultPagination>>()
    const [chart] = React.useState(
        () =>
            new FamilyChart({
                chartId: 'family-matches',
                linkSearchLevel: 'family',
                valueKey: 'family_id',
                linkValueKey: 'family_name',
                displayValueKey: 'family_id',
                colMap: context.result.colMap,
                d3InterpolateFunction: context.result.theme.d3InterpolateFunction,
                drillDownCallback: drillDownCallback,
            })
    )

    React.useEffect(() => {
        if (!runId) return
        setDataPromise(fetchPagedRunMatches(context.searchType, runId, page, perPage, filters))
    }, [context.searchType, runId, page])

    return (
        <>
            <Paginator page={page} setPage={setPage} perPage={perPage} dataPromise={dataPromise} />
            <ChartController dataPromise={dataPromise} chart={chart} />
        </>
    )
}
