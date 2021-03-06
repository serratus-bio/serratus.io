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
} from '../../../CommonHelpers';
import QueryTypeSelector from './QueryTypeSelector';
import {
    fetchMatchCounts,
} from './SerratusApiCalls';

const QueryBuilder = ({identityLimsRef, coverageLimsRef, queryType, setQueryType, queryValue, setQueryValue}) => {
    const [errorMessage, setErrorMessage] = React.useState("");

    // initial chart render
    const chartRendered = React.useRef(false);
    if (!chartRendered.current && queryType !== 'run') {
        fetchMatchCounts(queryType, queryValue).then((data) => {
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
        if (!queryValue || queryType === 'run')
            return;
        fetchMatchCounts(queryType, queryValue).then((data) => {
            if (!chartRendered.current || !data)
                return;
            updateData(data);
            updateYLims();
        });
    }, [queryType, queryValue]);

    // functions to update chart with slider changes
    const updateX = () => { updateXLims(...identityLimsRef.current) }
    const updateZ = () => { updateZLims(...coverageLimsRef.current) }
    const updateY = () => { updateYLims(500) }

    // reset error message
    React.useEffect(() => {
        setErrorMessage("");
    }, [queryType]);

    const goToQuery = () => {
        if (!queryValue) {
            setErrorMessage("Enter a query value.");
            return;
        }
        let params = new URLSearchParams();
        params.set(queryType, queryValue);
        if (queryType !== 'run') {
            var identity = constructRangeStr(...identityLimsRef.current);
            params.set('identity', identity);
            var coverage = constructRangeStr(...coverageLimsRef.current);
            params.set('coverage', coverage);
        }
        var queryUrl = `explorer?${params.toString()}#${resultSectionId}`;
        window.location.href = queryUrl;
    }

    const chartVisibility = (queryType !== "run" ? "visible" : "hidden");
    const slidersVisibility = (queryType !== "run" ? "visible" : "hidden");

    return (
        <div className="flex-grow">
            <QueryTypeSelector
                queryType={queryType}
                setQueryType={setQueryType}
                queryValue={queryValue}
                setQueryValue={setQueryValue}
                goToQuery={goToQuery}
                />
            <div className="max-w-xl m-auto">
                <div className={`${slidersVisibility} mb-10`}>
                    <div className="mx-2">
                        <div className="pt-6 text-center">{getIdentitySliderLabel(queryType)}</div>
                        <FilterSlider id="sliderIdentity"
                            sliderDomain={identityDomain}
                            sliderLimsRef={identityLimsRef}
                            onChange={updateX}
                            onTouchEnd={updateY} />
                    </div>
                    <div className="mx-2">
                        <div className="pt-6 text-center">{getCoverageSliderLabel(queryType)}</div>
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
                        onClick={goToQuery}>
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
