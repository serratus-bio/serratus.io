import React from 'react'
import { Paginator } from '../Paginator'
import { ChartController } from './ChartController'
import { SequenceChart } from '../Chart/SequenceChart'
import { BaseContext } from 'components/Explorer/Base/BaseContext'
import { fetchPagedRunMatches } from './SerratusApiCalls'
import { ResultPagination } from './types'
import { Filters } from 'components/Explorer/types'

type Props = {
    runId: string
    filters: Filters
    propFamilyId: string
}

export const SequenceResult = ({ runId, filters, propFamilyId }: Props) => {
    const context = React.useContext(BaseContext)
    const perPage = 20
    const [familyId, setFamilyId] = React.useState(propFamilyId)
    const [pageNumber, setPageNumber] = React.useState(1)
    const [dataPromise, setDataPromise] = React.useState<Promise<ResultPagination>>()
    const [chart] = React.useState(
        () =>
            new SequenceChart(
                'run-sequence-lookup-chart',
                context.result.colMap,
                context.result.theme.d3InterpolateFunction,
                context.result.addJbrowseLinks
            )
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
        <div className='max-w-4xl m-auto'>
            <div className='w-full text-center'>
                <div className='text-xl font-bold'>{familyId}</div>
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
