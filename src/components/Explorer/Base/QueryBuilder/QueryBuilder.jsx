import React from 'react'
import { FilterSlider } from './FilterSlider'
import {
    CountChart,
    renderChart,
    updateData,
    updateXLims,
    updateYLims,
    updateZLims,
} from './CountChart'
import { constructRangeStr, resultSectionId } from '../ExplorerHelpers'
import { ExternalLink, helpIcon } from 'common'
import { SearchLevelSelector } from './SearchLevelSelector'
import { fetchMatchCounts } from './SerratusApiCalls'
import { BaseContext } from 'components/Explorer/Base/BaseContext'
import { debounce } from './debounce'

export const QueryBuilder = ({
    identityLimsRef,
    scoreLimsRef,
    searchLevel,
    setSearchLevel,
    searchLevelValue,
    setSearchLevelValue,
}) => {
    const context = React.useContext(BaseContext)
    const [errorMessage, setErrorMessage] = React.useState('')
    const debounceTime = 50
    const viewMatchesButtonRef = React.useRef()

    // initial chart render
    const chartRendered = React.useRef(false)
    if (!chartRendered.current && searchLevel !== 'run') {
        fetchMatchCounts(context.searchType, searchLevel, searchLevelValue).then((data) => {
            if (!data) return
            renderChart(
                data,
                context.domain.identity,
                context.domain.score,
                context.theme.d3InterpolateFunction
            )
            updateXLims(...identityLimsRef.current)
            updateZLims(...scoreLimsRef.current)
            updateYLims()
            chartRendered.current = true
        })
    }

    // update chart for subsequent family changes
    React.useEffect(() => {
        if (!searchLevelValue || searchLevel === 'run') return
        fetchMatchCounts(context.searchType, searchLevel, searchLevelValue).then((data) => {
            if (!chartRendered.current || !data) return
            updateData(data)
            updateYLims()
        })
    }, [context.searchType, searchLevel, searchLevelValue])

    // functions to update chart with slider changes
    const updateX = () => {
        chartRendered.current && updateXLims(...identityLimsRef.current)
    }
    const updateZ = () => {
        chartRendered.current && updateZLims(...scoreLimsRef.current)
    }
    const updateY = () => {
        chartRendered.current && updateYLims(500)
    }

    // reset error message
    React.useEffect(() => {
        setErrorMessage('')
    }, [searchLevel])

    const viewMatches = () => {
        if (!searchLevelValue) {
            setErrorMessage('Enter a search value.')
            return
        }
        const params = new URLSearchParams({
            [searchLevel]: searchLevelValue,
            identity: constructRangeStr(...identityLimsRef.current),
            score: constructRangeStr(...scoreLimsRef.current),
        })
        const base = window.location.pathname.split('/').pop()
        const searchUrl = `${base}?${params.toString()}#${resultSectionId}`
        window.location.href = searchUrl
    }

    const chartVisibility = searchLevel !== 'run' ? 'visible' : 'hidden'

    return (
        <div className='flex-grow'>
            <SearchLevelSelector
                searchLevel={searchLevel}
                setSearchLevel={setSearchLevel}
                searchLevelValue={searchLevelValue}
                setSearchLevelValue={setSearchLevelValue}
                viewMatches={viewMatches}
            />
            <div className='max-w-xl m-auto'>
                <div className='mb-10'>
                    <div className='mx-2'>
                        <div className='pt-6 text-center'>Alignment identity (%)</div>
                        <FilterSlider
                            id='sliderIdentity'
                            sliderDomain={context.domain.identity}
                            sliderLimsRef={identityLimsRef}
                            onChange={debounce(updateX, debounceTime)}
                            onTouchEnd={() => setTimeout(updateY, debounceTime)}
                        />
                    </div>
                    <div className='mx-2'>
                        <div className='pt-6 text-center'>Score</div>
                        <FilterSlider
                            id='sliderCoverage'
                            sliderDomain={context.domain.score}
                            sliderLimsRef={scoreLimsRef}
                            linearGradientString={context.theme.gradientString}
                            onChange={debounce(updateZ, debounceTime)}
                            onTouchEnd={() => setTimeout(updateY, debounceTime)}
                        />
                    </div>
                </div>
                <div className={chartVisibility}>
                    <CountChart
                        onFilterAndSetStackData={(data) => {
                            if (viewMatchesButtonRef.current)
                                viewMatchesButtonRef.current.innerHTML =
                                    'View ' +
                                    data.matchN.toLocaleString() +
                                    ' Match' +
                                    (data.matchN !== 1 ? 'es' : '')
                        }}
                    />
                </div>
                <div className='flex flex-row justify-center items-center mt-4'>
                    <button
                        className='w-full m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4'
                        onClick={viewMatches}
                        ref={viewMatchesButtonRef}>
                        View Matches
                    </button>
                    <ExternalLink
                        className='ml-2 mb-1'
                        title='Open tutorial on project wiki'
                        href='https://github.com/ababaian/serratus/wiki/Serratus-Explorer'>
                        {helpIcon}
                    </ExternalLink>
                </div>
            </div>
            <div className='mt-1 text-center text-red-700'>{errorMessage}</div>
        </div>
    )
}
