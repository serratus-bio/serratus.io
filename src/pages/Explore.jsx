import React from 'react';
import { Helmet } from 'react-helmet';
import { Select } from "react-dropdown-select";
import {
    switchSize,
    classesBoxBorder
} from '../helpers/common';
import DataReference from '../components/DataReference';
import FilterSlider from '../components/FilterSlider';
import {
    ExploreChart,
    updateChart,
    updateXLims,
    updateYLims,
    updateZLims
} from '../components/ExploreChart';
import { constructRangeStr } from "../helpers/QueryPageHelpers";

import allFamilyData from '../data/SerratusIO_scoreID.json';
const selectOptions = Object.keys(allFamilyData).map((family) => { return { label: family, value: family } });

const identityDomain = [75, 100];
const coverageDomain = [0, 100];

export default () => {
    const [family, setFamily] = React.useState("Coronaviridae");
    const [selectValues, setSelectValues] = React.useState([]);
    const sliderIdentityLimsRef = React.useRef(identityDomain);
    const sliderCoverageLimsRef = React.useRef([25, 100]);

    var data = allFamilyData[family];

    React.useEffect(() => {
        if (family === "") {
            return;
        }
        data = allFamilyData[family];
        updateChart();
        updateYLims();
        // setSliderIdentityLims([75, 100]);
    }, [family]);

    var selectOnChange = (values) => {
        setSelectValues(values);
        if (values.length !== 0) {
            setFamily(values[0].value);
        }
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

    const logInfo = () => {
        console.log(sliderIdentityLimsRef.current);
        updateChart();
        updateXLims(...sliderIdentityLimsRef.current);
        updateZLims(...sliderCoverageLimsRef.current);
        updateYLims(500);
    }

    console.log("reloading Explore")

    return (
        <div className={`flex flex-col ${switchSize}:flex-row p-4 min-h-screen sm:bg-gray-200`}>
            <Helmet>
                <title>Serratus | Explore</title>
            </Helmet>
            <div className={`flex flex-col p-4 w-full ${switchSize}:w-1/3 ${classesBoxBorder}`}>
                <div className="flex-grow">
                    <div className="pb-2 text-center">
                        Select a viral family to view the distribution of Serratus analysis results.
                    </div>
                    <Select options={selectOptions}
                        values={selectValues}
                        onChange={selectOnChange}
                        onDropdownOpen={() => setSelectValues([])}
                        placeholder="Search for family" />
                    {family ?
                        <div>
                            <div className="mx-2">
                                <div className="pt-6 text-center">Average alignment identity (%)</div>
                                <FilterSlider id="sliderIdentity"
                                    sliderDomain={identityDomain}
                                    sliderLimsRef={sliderIdentityLimsRef} />
                            </div>
                            <div className="mx-2">
                                <div className="pt-6 text-center">Score (pangenome coverage)</div>
                                <FilterSlider id="sliderCoverage"
                                    sliderDomain={coverageDomain}
                                    sliderLimsRef={sliderCoverageLimsRef}
                                    colorGradientLims={["#3d5088", "#fce540"]} />
                            </div>
                            <div className="h-10" />
                            <button onClick={goToQuery} className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4" type="submit">Go to Query</button>
                            <button onClick={logInfo} className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4" type="submit">log info</button>
                            </div> : null}
                </div>
                <div className={`hidden ${switchSize}:block mb-auto`}>
                    <DataReference />
                </div>
            </div>
            <div className={`h-0 sm:h-3 ${switchSize}:w-3`}></div>
            <hr className="sm:hidden" />
            <div className={`p-4 w-full ${switchSize}:w-2/3 ${classesBoxBorder}`}>
                <h1 className="text-center text-2xl">{family}</h1>
                <ExploreChart
                    data={data}
                    sliderIdentityLimsRef={sliderIdentityLimsRef}
                    sliderCoverageLimsRef={sliderCoverageLimsRef} />
                <div className={`${switchSize}:hidden`}>
                    <DataReference />
                </div>
            </div>
        </div>
    )
}
