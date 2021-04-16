import React from 'react'
import { Paginator } from '../Paginator'
import { ChartController } from '../Chart/ChartController'
import { FamilyChart } from '../Chart/FamilyChart'
import { DrilldownCallback } from '../Chart/types'
import { BaseContext } from 'components/Explorer/Base/BaseContext'
import { fetchPagedRunMatches } from '../SerratusApiCalls'
import { ResultPagination } from '../types'
import { Filters } from 'components/Explorer/types'

type Props = {
    runId: string
    filters: Filters
    drilldownCallback: DrilldownCallback
}

export const FamilyMatchesPager = ({ runId, filters, drilldownCallback }: Props) => {
    const context = React.useContext(BaseContext)
    const perPage = 10
    const [pageNumber, setPageNumber] = React.useState(1)
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
                drilldownCallback: drilldownCallback,
            })
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
