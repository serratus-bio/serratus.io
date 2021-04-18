import React from 'react'
import { Helmet } from 'react-helmet'
import { QueryBuilder } from './QueryBuilder'
import { Result } from './Result'
import { DataReference } from './DataReference'
import { classesBoxBorder } from 'common'
import { parseRange, resultSectionId } from './ExplorerHelpers'
import { BaseContext } from './BaseContext'

const switchSize = 'lg' // Tailwind prefix to switch between landscape/portrait mode

export const ExplorerBase = ({ location }) => {
    const context = React.useContext(BaseContext)

    const searchLevels = Object.keys(context.defaultSearchLevelValues)
    const urlParams = new URLSearchParams(location.search)
    const [inputSearchLevel, inputSearchLevelValue] = getInputSearchLevel(searchLevels, urlParams)
    const searchLevelProvided = Boolean(inputSearchLevel)

    // set filter ranges / defaults
    const inputIdentityLims =
        parseRange(urlParams.get('identity'), context.domain.identity) ||
        context.defaultFilterRanges.identity
    const inputScoreLims =
        parseRange(urlParams.get('score'), context.domain.score) ||
        context.defaultFilterRanges.score

    // values that change with user input (QueryBuilder)
    // family must be valid for initial chart render
    const [searchLevel, setSearchLevel] = React.useState(inputSearchLevel || 'family')
    const [searchLevelValue, setSearchLevelValue] = React.useState(
        inputSearchLevelValue || 'Coronaviridae'
    )
    const identityLimsRef = React.useRef(inputIdentityLims)
    const scoreLimsRef = React.useRef(inputScoreLims)

    return (
        <div className={`flex flex-col ${switchSize}:flex-row p-4 min-h-screen sm:bg-gray-200`}>
            <Helmet>
                <title>Serratus | {inputSearchLevelValue || 'Explorer'}</title>
            </Helmet>
            <div
                className={`flex flex-col px-4 py-2 w-full ${switchSize}:w-1/3 ${classesBoxBorder}`}>
                <QueryBuilder
                    identityLimsRef={identityLimsRef}
                    scoreLimsRef={scoreLimsRef}
                    searchLevel={searchLevel}
                    setSearchLevel={setSearchLevel}
                    searchLevelValue={searchLevelValue}
                    setSearchLevelValue={setSearchLevelValue}
                />
                <div className={`hidden ${switchSize}:block mb-auto text-center`}>
                    <DataReference />
                </div>
            </div>
            <div className={`h-0 sm:h-3 ${switchSize}:w-3`} />
            <hr className='sm:hidden' />
            <div
                id={resultSectionId}
                className={`p-4 w-full ${switchSize}:w-2/3 ${classesBoxBorder}`}>
                {!searchLevelProvided ? (
                    <context.intro />
                ) : (
                    <Result
                        searchLevel={inputSearchLevel}
                        searchLevelValue={inputSearchLevelValue}
                        identityLims={inputIdentityLims}
                        scoreLims={inputScoreLims}
                    />
                )}
                <div className={`${switchSize}:hidden`}>
                    <DataReference />
                </div>
            </div>
        </div>
    )
}

function getInputSearchLevel(searchLevels, urlParams) {
    const searchLevel = searchLevels.find((searchLevel) => urlParams.get(searchLevel))
    const searchLevelValue = urlParams.get(searchLevel)
    return [searchLevel, searchLevelValue]
}
