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
    updateYLims
} from '../components/ExploreChart';

import allFamilyData from '../data/SerratusIO_scoreID.json';
const selectOptions = Object.keys(allFamilyData).map((family) => { return { label: family, value: family } });

export default () => {
    const [family, setFamily] = React.useState("Coronaviridae");
    const [selectValues, setSelectValues] = React.useState([]);
    const [sliderIdentityLims, setSliderIdentityLims] = React.useState([75 ,100]);
    const [sliderCoverageLims, setSliderCoverageLims] = React.useState([25 ,100]);

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
                                    sliderLims={sliderIdentityLims}
                                    setSliderLims={setSliderIdentityLims}
                                    instantUpdate={true}
                                    onTouchEnd={() => updateYLims()} />
                            </div>
                            <div className="mx-2">
                                <div className="pt-6 text-center">Score (pangenome coverage)</div>
                                <FilterSlider id="sliderCoverage"
                                    sliderLims={sliderCoverageLims}
                                    setSliderLims={setSliderCoverageLims}
                                    colorGradientLims={["#3d5088", "#fce540"]}
                                    instantUpdate={true} />
                            </div>
                            <div className="h-10" />
                            <button onClick={() => console.log(family, sliderIdentityLims, sliderCoverageLims)} className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4" type="submit">Go to Query</button>
                                (not implemented)
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
                    sliderIdentityLims={sliderIdentityLims}
                    sliderCoverageLims={sliderCoverageLims} />
                <div className={`${switchSize}:hidden`}>
                    <DataReference />
                </div>
            </div>
        </div>
    )
}
