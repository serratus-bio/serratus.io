import React from 'react';
import { Helmet } from 'react-helmet';
import { Select } from "react-dropdown-select";
import * as d3 from 'd3';
import {
    switchSize,
    classesBoxBorder
} from '../helpers/common';
import References from '../components/References';
import { createD3RangeSlider } from '../SDK/d3RangeSlider.js';

import allFamilyData from '../data/SerratusIO_scoreID.json';

var chart;
var xLims = [75, 100];
var yLims = [0, 0]; // computed after family data loaded
var zLims = [25, 100];
var zDomain;
var xColumn = "pctid";
var yColumn = "n";
var zColumn = "score";
var data;
var dataByZStackFiltered;
var areaGen;

var sliderX;
var sliderZ;

const selectOptions = Object.keys(allFamilyData).map((family) => { return { label: family, value: family } });

export default () => {
    const [chartLoaded, setChartLoaded] = React.useState(false);
    const [family, setFamily] = React.useState("Coronaviridae");
    const [selectValues, setSelectValues] = React.useState([]);

    React.useEffect(() => {
        if (family === "") {
            return;
        }
        data = allFamilyData[family];
        if (!chartLoaded) {
            drawExploreFamilyChart("#chart", data);
            setChartLoaded(true);
        }
        updateChart();
        sliderX.range(75, 100);
        sliderZ.range(25, 100);
        updateYLims();
    }, [family, chartLoaded]);

    const headTags = (
        <Helmet>
            <title>Serratus | Explore</title>
            <script src="https://cdn.rawgit.com/RasmusFonseca/d3RangeSlider/master/d3RangeSlider.js"></script>
            <link href="https://cdn.rawgit.com/RasmusFonseca/d3RangeSlider/master/d3RangeSlider.css" rel="stylesheet"></link>
        </Helmet>
    )

    var selectOnChange = (values) => {
        setSelectValues(values);
        if (values.length !== 0) {
            setFamily(values[0].value);
        }
    }

    return (
        <div className={`flex flex-col ${switchSize}:flex-row p-4 min-h-screen sm:bg-gray-200`}>
            {headTags}
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
                                <div id="sliderX" className="relative" style={{ height: 30 }}></div>
                            </div>
                            <div className="mx-2">
                                <div className="pt-6 text-center">Score (pangenome coverage)</div>
                                <div id="sliderZ" className="relative" style={{ height: 30 }}></div>
                            </div>
                            <div className="h-10" />
                            <button onClick={() => console.log(family, xLims, zLims)} className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4" type="submit">Go to Query</button>
                                (not implemented)
                            </div> : null}
                </div>
                <div className={`hidden ${switchSize}:block mb-auto`}>
                    <References />
                </div>
            </div>
            <div className={`h-0 sm:h-3 ${switchSize}:w-3`}></div>
            <hr className="sm:hidden" />
            <div className={`p-4 w-full ${switchSize}:w-2/3 ${classesBoxBorder}`}>
                <h1 className="text-center text-2xl">{family}</h1>
                <div id="chart" className="py-2" />
                <div className={`${switchSize}:hidden`}>
                    <References />
                </div>
            </div>
        </div>
    )
}

var updateYLims;

const drawExploreFamilyChart = (selector, data) => {

    var chartWidth = 300;
    var chartHeight = 150;
    var margin = { top: 10, right: 10, bottom: 33, left: 60 };

    var zColorLims = ["#3d5088", "#fce540"];
    var xScale = d3.scaleLinear()
        .range([0, chartWidth]);
    var yScale = d3.scaleLinear()
        .range([chartHeight, 0]);
    var colorScale = d3.scaleLinear()
        .range(zColorLims);

    var mainDiv = d3.select(selector);

    var sliderXDiv = d3.select("#sliderX");
    var sliderZDiv = d3.select("#sliderZ");

    var svgWidth = chartWidth + margin.left + margin.right;
    var svgHeight = chartHeight + margin.top + margin.bottom;
    var chartSvg = mainDiv
        .append("svg")
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
    var entryG = chartSvg.append("g")
        .attr("width", chartWidth)
        .attr("height", chartHeight)
        .attr("transform",
            `translate(${margin.left}, ${margin.top})`);

    var xAxis = entryG.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .attr("class", "x-axis");
    var yAxis = entryG.append("g")
        .attr("class", "y-axis");

    sliderX = createD3RangeSlider(d3, xLims[0], xLims[1], sliderXDiv);
    sliderX.onChange((range) => updateXLims(range.begin, range.end));
    sliderX.onTouchEnd(() => updateYLims());

    var zGradient = `background-image: linear-gradient(to right, ${zColorLims[0]} , ${zColorLims[1]});`
    var newZSliderDivStyle = sliderZDiv.attr("style") + zGradient;
    sliderZ = createD3RangeSlider(d3, zLims[0], zLims[1], sliderZDiv);
    sliderZ.onChange((range) => updateZLims(range.begin, range.end));
    sliderZ.onTouchEnd(() => updateYLims());
    sliderZDiv.attr("style", newZSliderDivStyle)
    sliderZDiv.select(".slider-container")
        .attr("style", zGradient)
    sliderZDiv.select(".slider")
        .attr("style", "background: rgba(0,0,0, 0.2)")

    var sliderXLabelL = sliderXDiv.select(".WW").append("span")
        .attr("style", "float: left; transform: translate(0px,20px)");
    var sliderXLabelR = sliderXDiv.select(".EE").append("text")
        .attr("style", "float: left; transform: translate(-5px,20px)");
    var sliderZLabelL = sliderZDiv.select(".WW").append("span")
        .attr("style", "float: left; transform: translate(0px,20px)");
    var sliderZLabelR = sliderZDiv.select(".EE").append("text")
        .attr("style", "float: left; transform: translate(-5px,20px)");

    function updateXLims(begin, end) {
        sliderXLabelL.text(begin);
        sliderXLabelR.text(end);
        xLims = [begin, end];
        var rangeLen = end - begin;
        var nTicks = (rangeLen < 10) ? rangeLen : 10;
        xScale.domain(xLims);
        xAxis.call(d3.axisBottom(xScale).ticks(nTicks));
        updateChart();
    }

    function updateZLims(begin, end) {
        sliderZLabelL.text(begin);
        sliderZLabelR.text(end);
        zLims = [begin, end];
        updateChart();
    }

    updateYLims = () => {
        var transitionDuration = 500;
        var maxDataY = 1.2 * d3.max(dataByZStackFiltered.map(function (d) {
            return d3.max(d, function (innerD) {
                return innerD[1];
            });
        }));
        yLims = [0, maxDataY];
        yScale.domain(yLims).nice();
        yAxis.transition().duration(transitionDuration).call(d3.axisLeft(yScale).ticks(5));
        updateChart(transitionDuration);
    }

    zDomain = Array(zLims[1] - zLims[0] + 1).fill(zLims[0]).map((x, y) => x + y);
    xScale.domain(xLims);
    yScale.domain(yLims).nice();
    colorScale.domain(zLims);
    xAxis.call(d3.axisBottom(xScale).ticks(10));
    yAxis.call(d3.axisLeft(yScale).ticks(5));
    entryG.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -(margin.left - 15))
        .attr("x", - chartHeight / 2)
        .attr("font-size", "12px")
        .attr("fill", "currentColor")
        .style("text-anchor", "middle")
        .attr("opacity", 1)
        .text("Count");
    entryG.append("text")
        .attr("y", chartHeight + margin.bottom - 3)
        .attr("x", chartWidth / 2)
        .attr("font-size", "12px")
        .attr("fill", "currentColor")
        .style("text-anchor", "middle")
        .attr("opacity", 1)
        .text("% Identity");

    dataByZStackFiltered = getDataByZStack(data);

    areaGen = d3.area()
        .x((d) => xScale(d.data.key))
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]));

    chart = entryG.selectAll(".areas")
        .data(dataByZStackFiltered)
        .join("path")
        .attr("d", areaGen)
        .attr("fill", (d) => colorScale(d.key));

    sliderX.range(...xLims);
    sliderZ.range(...zLims);
}

function getDataByZStack(dataFiltered) {
    var dataByX = d3.nest()
        .key(function (d) { return d[xColumn]; })
        .entries(dataFiltered);
    dataByX.forEach((d) => {
        d.values = d.values.reduce((collection, d) => {
            collection[d[zColumn]] = d[yColumn];
            return collection;
        }, {});
        d.ZtoY = {}
        zDomain.forEach(z => {
            d.ZtoY[z] = d.values[z] ? d.values[z] : 0;
        })
    });

    return d3.stack()
        .keys(zDomain)
        .order(d3.stackOrderReverse)
        .value((d, key) => d.ZtoY[key])(dataByX);
}

function updateChart(transitionDuration=0) {
    var dataFiltered = data.filter((d) => {
        return (
            (d[xColumn] >= xLims[0]) &&
            (d[xColumn] <= xLims[1]) &&
            (d[zColumn] >= zLims[0]) &&
            (d[zColumn] <= zLims[1])
        );
    });

    dataByZStackFiltered = getDataByZStack(dataFiltered);

    if (transitionDuration === 0) {
        chart.data(dataByZStackFiltered)
            .attr("d", areaGen);
    }
    else {
        chart.data(dataByZStackFiltered).transition().duration(transitionDuration)
            .attr("d", areaGen);
    }
}
