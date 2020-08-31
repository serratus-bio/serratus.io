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
import { constructRangeStr } from "../../helpers/QueryPageHelpers";
import allFamilyData from '../../data/SerratusIO_scoreID.json';

const identityDomain = [75, 100];
const coverageDomain = [0, 100];

const queryTypes = ["family", "genbank", "run"];

export default () => {
    const [searchType, setSearchType] = React.useState(queryTypes[0]);

    // family is assumed to always have a valid value due to dropdown select
    const [family, setFamily] = React.useState("Coronaviridae");
    const [genbank, setGenbank] = React.useState();
    const [run, setRun] = React.useState();

    const sliderIdentityLimsRef = React.useRef(identityDomain);
    const sliderCoverageLimsRef = React.useRef([25, 100]);
    const chartRendered = React.useRef(false);

    React.useEffect(() => {
        if (!family) {
            return;
        }
        var data = allFamilyData[family];
        if (!chartRendered.current) {
            renderChart(data, identityDomain, coverageDomain);
            updateZ();
            chartRendered.current = true;
        }
        else {
            updateData(data);
        }
        updateYLims();
    }, [family]);

    // functions to update chart with slider changes
    const updateX = () => { updateXLims(...sliderIdentityLimsRef.current) }
    const updateZ = () => { updateZLims(...sliderCoverageLimsRef.current) }
    const updateY = () => { updateYLims(500) }

    const queryTypeChange = (e) => {
        setSearchType(e.target.value);
    }

    const goToQuery = () => {
        let params = new URLSearchParams();
        params.set('family', family);
        var identity = constructRangeStr(...sliderIdentityLimsRef.current);
        params.set('identity', identity);
        var coverage = constructRangeStr(...sliderCoverageLimsRef.current);
        params.set('coverage', coverage);
        var queryUrl = 'query?' + params.toString();
        window.location.href = queryUrl;
    }

    return (
        <div className="flex-grow">
            <div>
                <InputOption className="inline mx-2" value="family" displayText="Family" checked={searchType === "family"} onChange={queryTypeChange} />
                <InputOption className="inline mx-2" value="genbank" displayText="GenBank" checked={searchType === "genbank"} onChange={queryTypeChange} />
                <InputOption className="inline mx-2" value="run" displayText="SRA Run" checked={searchType === "run"} onChange={queryTypeChange} />
            </div>
            <div label="inputs">
                <div>
                    Family
                <SelectFamily
                        family={family}
                        setFamily={setFamily} />
                </div>
                <div className="my-4">
                    GenBank Accession
                <SelectGenbank
                        genbank={genbank}
                        setGenbank={setGenbank} />
                </div>
                <div>
                    SRA Run Accession
                <SearchRun
                        run={run}
                        setRun={setRun}
                        onEnter={(run) => console.log(run)} />
                </div>
            </div>
            <div className="mx-2">
                <div className="pt-6 text-center">Average alignment identity (%)</div>
                <FilterSlider id="sliderIdentity"
                    sliderDomain={identityDomain}
                    sliderLimsRef={sliderIdentityLimsRef}
                    onChange={updateX}
                    onTouchEnd={updateY} />
            </div>
            <div className="mx-2">
                <div className="pt-6 text-center">Score (pangenome coverage)</div>
                <FilterSlider id="sliderCoverage"
                    sliderDomain={coverageDomain}
                    sliderLimsRef={sliderCoverageLimsRef}
                    linearGradientString={viridisCssGradient}
                    onChange={updateZ}
                    onTouchEnd={updateY} />
            </div>
            <div className="h-10" />
            <ExploreChart />
            <button onClick={goToQuery} className="w-full rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 mt-4" type="submit">View Matches</button>
        </div>
    )
}
