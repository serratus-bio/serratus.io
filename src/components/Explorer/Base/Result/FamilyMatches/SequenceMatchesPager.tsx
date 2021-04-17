import React from 'react'
import { Paginator } from '../Paginator'
import { ChartController } from '../Chart/ChartController'
import { SequenceChart } from '../Chart/SequenceChart'
import { BaseContext } from 'components/Explorer/Base/BaseContext'
import { fetchPagedRunMatches } from '../SerratusApiCalls'
import { ResultPagination } from '../types'
import { Filters } from 'components/Explorer/types'

type Props = {
    runId: string
    filters?: Filters
    familyName: string
}

export const SequenceMatchesPager = ({ runId: propOtherId, filters, familyName }: Props) => {
    const context = React.useContext(BaseContext)
    const perPage = 20
    const [otherId, setOtherId] = React.useState(propOtherId)
    const [pageNumber, setPageNumber] = React.useState(1)
    const [dataPromise, setDataPromise] = React.useState<Promise<ResultPagination>>()
    const [chart] = React.useState(
        () =>
            new SequenceChart({
                chartId: 'sequence-matches',
                linkSearchLevel: 'sequence',
                valueKey: 'sequence_accession',
                linkValueKey: 'sequence_accession',
                displayValueKey: 'virus_name',
                colMap: context.result.colMap,
                d3InterpolateFunction: context.result.theme.d3InterpolateFunction,
                addJbrowseLinks: context.result.addJbrowseLinks,
            })
    )

    React.useEffect(() => {
        setOtherId(propOtherId)
        setPageNumber(1)
    }, [propOtherId])

    React.useEffect(() => {
        setDataPromise(
            fetchPagedRunMatches(
                context.searchType,
                otherId,
                pageNumber,
                perPage,
                filters,
                undefined, // familyId
                familyName
            )
        )
    }, [context, otherId, pageNumber, familyName])

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
