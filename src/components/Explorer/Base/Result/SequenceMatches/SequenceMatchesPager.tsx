import React from 'react'
import { Paginator } from '../Paginator'
import { ChartController } from '../Chart/ChartController'
import { SequenceChart } from '../Chart/SequenceChart'
import { BaseContext } from 'components/Explorer/Base/BaseContext'
import { fetchPagedMatches } from '../SerratusApiCalls'
import { ResultPagination } from '../types'
import { Filters } from 'components/Explorer/types'

type Props = {
    sequenceId: string
    filters: Filters
}

export const SequenceMatchesPager = ({ sequenceId, filters }: Props) => {
    const context = React.useContext(BaseContext)
    const perPage = 20
    const [pageNumber, setPageNumber] = React.useState(1)
    const [dataPromise, setDataPromise] = React.useState<Promise<ResultPagination>>()
    const [chart] = React.useState(
        () =>
            new SequenceChart({
                chartId: 'sequence-matches',
                linkSearchLevel: 'run',
                valueKey: 'sequence_accession',
                linkValueKey: 'run_id',
                displayValueKey: 'run_id',
                colMap: context.result.colMap,
                d3InterpolateFunction: context.result.theme.d3InterpolateFunction,
                addJbrowseLinks: context.result.addJbrowseLinks,
            })
    )

    React.useEffect(() => {
        setDataPromise(
            fetchPagedMatches(
                context.searchType,
                'sequence',
                sequenceId,
                pageNumber,
                perPage,
                filters.identityLims,
                filters.scoreLims
            )
        )
    }, [context, sequenceId, pageNumber])

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
