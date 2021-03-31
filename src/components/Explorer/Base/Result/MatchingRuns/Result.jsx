import React from 'react'
import Paginator from '../Paginator'
import ChartController from './ChartController'
import { getFamilyTitle, getSequenceName, getSequenceTitle, DownloadButton } from '../ResultHelpers'
import { BaseContext } from 'components/Explorer/Base/BaseContext'
import { fetchPagedMatches } from './SerratusApiCalls'

// for family/sequence -> run lookup
const MatchingRunsResult = ({ searchLevel, searchLevelValue, identityLims, scoreLims }) => {
    const context = React.useContext(BaseContext)
    const perPage = 20
    const [pageNumber, setPageNumber] = React.useState(1)
    const [dataPromise, setDataPromise] = React.useState()
    const [pageTitle, setPageTitle] = React.useState()
    const [searchLevelValueCorrected, setSearchLevelValueCorrected] = React.useState(
        searchLevelValue
    )
    const LinkButtons = context.result.LinkButtons

    React.useEffect(() => {
        if (!searchLevelValue) return
        console.log(`Loading search result page for ${searchLevel}=${searchLevelValue}.`)

        if (searchLevel === 'family') {
            getFamilyTitle(searchLevelValue).then(setPageTitle)
        } else {
            // sequence
            getSequenceTitle(searchLevelValue).then(setPageTitle)
            setSearchLevelValueCorrected(getSequenceName(searchLevelValue))
        }
    }, [searchLevel, searchLevelValue])

    React.useEffect(() => {
        if (!searchLevelValue) return
        setDataPromise(
            fetchPagedMatches(
                context.searchType,
                searchLevel,
                searchLevelValue,
                pageNumber,
                perPage,
                identityLims,
                scoreLims
            )
        )
    }, [context.searchType, searchLevel, searchLevelValue, pageNumber, identityLims, scoreLims])

    return (
        <div className="max-w-4xl m-auto">
            <div>
                <div className="w-full text-center">
                    <div>
                        <div className="text-xl font-bold">{searchLevelValue}</div>
                        {pageTitle && <div className="text-lg italic">{pageTitle}</div>}
                    </div>
                </div>
                <div className="flex justify-center items-center my-2">
                    <LinkButtons
                        searchLevel={searchLevel}
                        searchLevelValue={searchLevelValueCorrected}
                    />
                    <DownloadButton
                        searchLevel={searchLevel}
                        searchLevelValue={searchLevelValue}
                        identityLims={identityLims}
                        scoreLims={scoreLims}
                    />
                </div>
            </div>
            <div className="p-6">
                <Paginator
                    pageNumber={pageNumber}
                    perPage={perPage}
                    setPageNumber={setPageNumber}
                    dataPromise={dataPromise}
                />
                <ChartController dataPromise={dataPromise} />
            </div>
        </div>
    )
}

export default MatchingRunsResult
