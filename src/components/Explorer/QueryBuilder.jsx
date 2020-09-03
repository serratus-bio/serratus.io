import React from 'react';
import SelectFamily from './SelectFamily';
import SelectGenbank from './SelectGenbank';
import SearchRun from './SearchRun';
import FilterSlider from './FilterSlider';
import InputOption from './InputOption';
import ExploreChart, {
    renderChart,
    updateData,
    updateXLims,
    updateYLims,
    updateZLims
} from './ExploreChart';
import {
    viridisCssGradient
} from '../../helpers/common';
import {
    constructRangeStr,
    getIdentitySliderLabel,
    getCoverageSliderLabel
} from "../../helpers/ExplorerHelpers";
import allFamilyData from '../../data/SerratusIO_scoreID.json';

const identityDomain = [75, 100];
const coverageDomain = [0, 100];

export default (props) => {
    const sliderIdentityLimsRef = props.identityLimsRef;
    const sliderCoverageLimsRef = props.coverageLimsRef;
    const queryType = props.queryType;
    const setQueryType = props.setQueryType;
    const queryValue = props.queryValue;
    const setQueryValue = props.setQueryValue;

    // set family to valid value for initial chart render
    const [initialFamily] = React.useState('Coronaviridae');
    const [initialCoverageLims] = React.useState(props.coverageLimsRef.current);
    const [initialQueryType] = React.useState(props.queryType);
    const [initialQueryValue] = React.useState(props.queryValue);

    const [family, setFamily] = React.useState(initialFamily);
    const [genbank, setGenbank] = React.useState();
    const [run, setRun] = React.useState();

    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        switch (initialQueryType) {
            case "family": setFamily(initialQueryValue); break;
            case "genbank": setGenbank(initialQueryValue); break;
            case "run": setRun(initialQueryValue); break;
            default:
        }
    }, [initialQueryType, initialQueryValue])

    // initial chart render
    React.useEffect(() => {
        var data = allFamilyData[initialFamily];
        renderChart(data, identityDomain, coverageDomain);
        updateZLims(...initialCoverageLims);
        updateYLims();
    }, [initialFamily, initialCoverageLims]);

    // update chart for subsequent family changes
    React.useEffect(() => {
        var data = allFamilyData[family];
        updateData(data);
        updateYLims();
    }, [family]);

    // functions to update chart with slider changes
    const updateX = () => { updateXLims(...sliderIdentityLimsRef.current) }
    const updateZ = () => { updateZLims(...sliderCoverageLimsRef.current) }
    const updateY = () => { updateYLims(500) }

    // update query value
    React.useEffect(() => {
        setErrorMessage("");
        switch (queryType) {
            case "family": setQueryValue(family); break;
            case "genbank": setQueryValue(genbank); break;
            case "run": setQueryValue(run); break;
            default:
        }
    }, [family, genbank, run, queryType, setQueryValue]);

    const queryTypeChange = (e) => {
        setQueryType(e.target.value);
    }

    const goToQuery = () => {
        if (!queryValue) {
            setErrorMessage("Enter a query value.");
            return;
        }
        let params = new URLSearchParams();
        params.set(queryType, queryValue);
        if (queryType !== 'run') {
            var identity = constructRangeStr(...sliderIdentityLimsRef.current);
            params.set('identity', identity);
            var coverage = constructRangeStr(...sliderCoverageLimsRef.current);
            params.set('coverage', coverage);
        }
        var queryUrl = 'explorer?' + params.toString();
        window.location.href = queryUrl;
    }

    const chartVisibility = (queryType === "family" ? "visible" : "hidden");
    const slidersVisibility = (queryType !== "run" ? "visible" : "hidden");

    return (
        <div className="flex-grow">
            <div className="flex flex-row justify-center">
                <InputOption className="mx-2" value="family" displayText="Family" checked={queryType === "family"} onChange={queryTypeChange} />
                <InputOption className="mx-2" value="genbank" displayText="GenBank" checked={queryType === "genbank"} onChange={queryTypeChange} />
                <InputOption className="mx-2" value="run" displayText="SRA Run" checked={queryType === "run"} onChange={queryTypeChange} />
            </div>
            <div label="inputs">
                <div className={queryType === "family" ? "visible" : "hidden"}>
                    <SelectFamily
                        family={family}
                        setFamily={setFamily} />
                </div>
                <div className={queryType === "genbank" ? "visible" : "hidden"}>
                    <SelectGenbank
                        genbank={genbank}
                        setGenbank={setGenbank} />
                </div>
                <div className={queryType === "run" ? "visible" : "hidden"}>
                    <SearchRun
                        run={run}
                        setRun={setRun}
                        onEnter={goToQuery} />
                </div>
            </div>
            <div className={slidersVisibility}>
                <div className="mx-2">
                    <div className="pt-6 text-center">{getIdentitySliderLabel(queryType)}</div>
                    <FilterSlider id="sliderIdentity"
                        sliderDomain={identityDomain}
                        sliderLimsRef={sliderIdentityLimsRef}
                        onChange={updateX}
                        onTouchEnd={updateY} />
                </div>
                <div className="mx-2">
                    <div className="pt-6 text-center">{getCoverageSliderLabel(queryType)}</div>
                    <FilterSlider id="sliderCoverage"
                        sliderDomain={coverageDomain}
                        sliderLimsRef={sliderCoverageLimsRef}
                        linearGradientString={viridisCssGradient}
                        onChange={updateZ}
                        onTouchEnd={updateY} />
                </div>
            </div>
            <div className="h-10" />
            <div className={chartVisibility}>
                <ExploreChart />
            </div>
            <button className="w-full rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 mt-4"
                onClick={goToQuery}>
                View Matches
            </button>
            <div className="mt-1 text-center text-red-700">{errorMessage}</div>
        </div>
    )
}
