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
    familyId: string
}

export const SequenceMatchesPager = ({ runId, filters, familyId: propFamilyId }: Props) => {
    const context = React.useContext(BaseContext)
    const perPage = 20
    const [familyId, setFamilyId] = React.useState(propFamilyId)
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
        setFamilyId(propFamilyId)
        setPageNumber(1)
    }, [propFamilyId])

    React.useEffect(() => {
        setDataPromise(
            fetchPagedRunMatches(context.searchType, runId, pageNumber, perPage, filters, familyId)
        )
    }, [context, runId, pageNumber, familyId])

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
