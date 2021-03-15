import React from 'react';
import FilterSlider from './FilterSlider';
import ExploreChart, {
    renderChart,
    updateData,
    updateXLims,
    updateYLims,
    updateZLims
} from './ExploreChart';
import {
    identityDomain,
    coverageDomain,
    viridisCssGradient,
    constructRangeStr,
    getIdentitySliderLabel,
    getCoverageSliderLabel,
    resultSectionId
} from "../ExplorerHelpers";
import {
    ExternalLink,
    helpIcon
} from '../../../common/Helpers';
import SearchLevelSelector from './SearchLevelSelector';
import {
    fetchMatchCounts,
} from './SerratusApiCalls';


const QueryBuilder = ({
        searchType, defaultSearchLevelValues,
        identityLimsRef, coverageLimsRef,
        searchLevel, setSearchLevel,
        searchLevelValue, setSearchLevelValue}) => {
    const [errorMessage, setErrorMessage] = React.useState("");

    // initial chart render
    const chartRendered = React.useRef(false);
    if (!chartRendered.current && searchLevel !== 'run') {
        fetchMatchCounts(searchType, searchLevel, searchLevelValue).then((data) => {
            if (!data) return;
            renderChart(data, identityDomain, coverageDomain);
            updateXLims(...identityLimsRef.current);
            updateZLims(...coverageLimsRef.current);
            updateYLims();
            chartRendered.current = true;
        });
    }

    // update chart for subsequent family changes
    React.useEffect(() => {
        if (!searchLevelValue || searchLevel === 'run')
            return;
        fetchMatchCounts(searchType, searchLevel, searchLevelValue).then((data) => {
            if (!chartRendered.current || !data)
                return;
            updateData(data);
            updateYLims();
        });
    }, [searchType, searchLevel, searchLevelValue]);

    // functions to update chart with slider changes
    const updateX = () => { chartRendered.current && updateXLims(...identityLimsRef.current) }
    const updateZ = () => { chartRendered.current && updateZLims(...coverageLimsRef.current) }
    const updateY = () => { chartRendered.current && updateYLims(500) }

    // reset error message
    React.useEffect(() => {
        setErrorMessage("");
    }, [searchLevel]);

    const viewMatches = () => {
        if (!searchLevelValue) {
            setErrorMessage("Enter a search value.");
            return;
        }
        let params = new URLSearchParams();
        params.set(searchLevel, searchLevelValue);
        if (searchLevel !== 'run') {
            var identity = constructRangeStr(...identityLimsRef.current);
            params.set('identity', identity);
            var coverage = constructRangeStr(...coverageLimsRef.current);
            params.set('coverage', coverage);
        }
        var saerchUrl = `explorer?${params.toString()}#${resultSectionId}`;
        window.location.href = saerchUrl;
    }

    const chartVisibility = (searchLevel !== "run" ? "visible" : "hidden");
    const slidersVisibility = (searchLevel !== "run" ? "visible" : "hidden");

    return (
        <div className="flex-grow">
            <SearchLevelSelector
                defaultValues={defaultSearchLevelValues}
                searchLevel={searchLevel}
                setSearchLevel={setSearchLevel}
                searchLevelValue={searchLevelValue}
                setSearchLevelValue={setSearchLevelValue}
                viewMatches={viewMatches}
                />
            <div className="max-w-xl m-auto">
                <div className={`${slidersVisibility} mb-10`}>
                    <div className="mx-2">
                        <div className="pt-6 text-center">{getIdentitySliderLabel(searchLevel)}</div>
                        <FilterSlider id="sliderIdentity"
                            sliderDomain={identityDomain}
                            sliderLimsRef={identityLimsRef}
                            onChange={updateX}
                            onTouchEnd={updateY} />
                    </div>
                    <div className="mx-2">
                        <div className="pt-6 text-center">{getCoverageSliderLabel(searchLevel)}</div>
                        <FilterSlider id="sliderCoverage"
                            sliderDomain={coverageDomain}
                            sliderLimsRef={coverageLimsRef}
                            linearGradientString={viridisCssGradient}
                            onChange={updateZ}
                            onTouchEnd={updateY} />
                    </div>
                </div>
                <div className={chartVisibility}>
                    <ExploreChart />
                </div>
                <div className="flex flex-row justify-center items-center mt-4">
                    <button className="w-full m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4"
                        onClick={viewMatches}>
                        View Matches
                    </button>
                    <ExternalLink className='ml-2 mb-1' title='Open tutorial on project wiki' href='https://github.com/ababaian/serratus/wiki/Serratus-Explorer'>{helpIcon}</ExternalLink>
                </div>
            </div>
            <div className="mt-1 text-center text-red-700">{errorMessage}</div>
        </div>
    )
}

export default QueryBuilder;
