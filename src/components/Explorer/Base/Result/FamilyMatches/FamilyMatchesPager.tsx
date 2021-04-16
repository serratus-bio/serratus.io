import React from 'react'
import { Paginator } from '../Paginator'
import { ChartController } from '../Chart/ChartController'
import { FamilyChart } from '../Chart/FamilyChart'
import { DrilldownCallback } from '../Chart/types'
import { BaseContext } from 'components/Explorer/Base/BaseContext'
import { fetchPagedMatches } from '../SerratusApiCalls'
import { ResultPagination } from '../types'
import { Filters } from 'components/Explorer/types'

type Props = {
    familyId: string
    filters: Filters
    drilldownCallback: DrilldownCallback
}

export const FamilyMatchesPager = ({ familyId, filters, drilldownCallback }: Props) => {
    const context = React.useContext(BaseContext)
    const perPage = 10
    const [pageNumber, setPageNumber] = React.useState(1)
    const [dataPromise, setDataPromise] = React.useState<Promise<ResultPagination>>()
    const [chart] = React.useState(
        () =>
            new FamilyChart({
                chartId: 'family-matches',
                linkSearchLevel: 'run',
                valueKey: 'run_id',
                linkValueKey: 'run_id',
                displayValueKey: 'run_id',
                colMap: context.result.colMap,
                d3InterpolateFunction: context.result.theme.d3InterpolateFunction,
                drilldownCallback: drilldownCallback,
            })
    )

    React.useEffect(() => {
        if (!familyId) return
        setDataPromise(
            fetchPagedMatches(
                context.searchType,
                'family',
                familyId,
                pageNumber,
                perPage,
                filters.identityLims,
                filters.scoreLims
            )
        )
    }, [context.searchType, familyId, pageNumber])

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
