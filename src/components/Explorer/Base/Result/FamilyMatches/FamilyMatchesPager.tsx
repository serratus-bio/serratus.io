import React from 'react'
import { Paginator } from '../Paginator'
import { MatchChartController } from '../MatchChart/MatchChartController'
import { FamilyMatchChart } from '../MatchChart/FamilyMatchChart'
import { DrillDownCallback } from '../MatchChart/types'
import { BaseContext } from 'components/Explorer/Base/BaseContext'
import { fetchPagedMatches } from '../SerratusApiCalls'
import { ResultPagination } from '../types'
import { Filters } from 'components/Explorer/types'

type Props = {
    familyId: string
    filters: Filters
    drillDownCallback: DrillDownCallback
}

export const FamilyMatchesPager = ({ familyId, filters, drillDownCallback }: Props) => {
    const context = React.useContext(BaseContext)
    const perPage = 10
    const [page, setPage] = React.useState(1)
    const [dataPromise, setDataPromise] = React.useState<Promise<ResultPagination>>()
    const [chart] = React.useState(
        () =>
            new FamilyMatchChart({
                chartId: 'family-matches',
                linkSearchLevel: 'run',
                valueKey: 'run_id',
                linkValueKey: 'run_id',
                displayValueKey: 'run_id',
                colMap: context.result.colMap,
                d3InterpolateFunction: context.result.theme.d3InterpolateFunction,
                drillDownCallback: drillDownCallback,
            })
    )

    React.useEffect(() => {
        if (!familyId) return
        setDataPromise(
            fetchPagedMatches(
                context.searchType,
                'family',
                familyId,
                page,
                perPage,
                filters.identityLims,
                filters.scoreLims
            )
        )
    }, [context.searchType, familyId, page])

    return (
        <>
            <Paginator page={page} setPage={setPage} perPage={perPage} dataPromise={dataPromise} />
            <MatchChartController dataPromise={dataPromise} chart={chart} />
        </>
    )
}
