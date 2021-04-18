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
    familyId?: string
    familyName?: string
}

export const FamilySequenceMatchesPager = ({
    runId: propRunId,
    familyId: propFamilyId,
    familyName: propFamilyName,
    filters,
}: Props) => {
    if (propFamilyId && propFamilyName)
        throw new Error('only one of familyId/familyName should be set')

    const context = React.useContext(BaseContext)
    const perPage = 20
    const [runId, setRunId] = React.useState(propRunId)
    const [familyId, setFamilyId] = React.useState(propFamilyId)
    const familyName = propFamilyName
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
        setRunId(propRunId)
        setPageNumber(1)
    }, [propRunId])

    React.useEffect(() => {
        setDataPromise(
            fetchPagedRunMatches(
                context.searchType,
                runId,
                pageNumber,
                perPage,
                filters,
                familyId,
                familyName
            )
        )
    }, [context, runId, pageNumber, familyId, familyName])

    return (
        <>
            <Paginator
                page={pageNumber}
                perPage={perPage}
                setPage={setPageNumber}
                dataPromise={dataPromise}
            />
            <ChartController dataPromise={dataPromise} chart={chart} />
        </>
    )
}
