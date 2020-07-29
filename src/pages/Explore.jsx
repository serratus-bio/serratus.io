import React from 'react';
import { Helmet } from 'react-helmet';
import * as d3 from 'd3';
import { createD3RangeSlider } from '../SDK/d3RangeSlider.js';

import allFamilyData from '../data/SerratusIO_scoreID.json';

var chart;
var xLims = [0, 100];
var yLims = [0, 6000];
var zLims = [25, 100];
var zDomain;
var xColumn = "pctid";
var yColumn = "n";
var zColumn = "score";
var data;
var dataByZStack;
var dataByZStackFiltered;
var areaGen;

export default (props) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const [family, setFamily] = React.useState("Coronaviridae");
    const placeholderText = "family";

    function searchOnKeyUp(e) {
        if (e.keyCode === 13) {
            setFamily(e.target.value);
        }
        else {
            setSearchValue(e.target.value);
        }
    }

    const id = "test"
    const selector = `#${id}`
    React.useEffect(() => {
        data = allFamilyData[family];
        if (!isLoaded) {
            drawExploreFamilyChart(selector, data);
            setIsLoaded(true);
        }
        updateChart();
        updateYLims();
    }, [family]);

    const headTags = (
        <Helmet>
            <title>Serratus | Explore</title>
            <script src="https://cdn.rawgit.com/RasmusFonseca/d3RangeSlider/master/d3RangeSlider.js"></script>
            <link href="https://cdn.rawgit.com/RasmusFonseca/d3RangeSlider/master/d3RangeSlider.css" rel="stylesheet"></link>
        </Helmet>
    )

    return (
        <div className="flex flex-row">
            {headTags}
            <div className="overflow-y-scroll">
                <input className="rounded border-2 border-gray-300 px-2 m-1 sm:w-64 focus:border-blue-300 focus:outline-none" type="text" placeholder={placeholderText} onKeyUp={searchOnKeyUp} />
                <ul>
                    {Object.keys(allFamilyData).map((family, i) => {
                        return (<li key={family}>{family}</li>)
                    })}
                </ul>
            </div>
            <div className="w-full p-6">
                <h1 className="text-center">{family}</h1>
                <div id={id} />
            </div>
        </div>
    )
}

var updateYLims;

const drawExploreFamilyChart = (selector, data) => {

    var chartWidth = 200;
    var chartHeight = 100;
    var margin = { top: 10, right: 0, bottom: 10, left: 60 };
    var legendHeight = 50;

    var zColorLims = ["#3d5088", "#fce540"];
    var xScale = d3.scaleLinear()
        .range([0, chartWidth]);
    var yScale = d3.scaleLinear()
        .range([chartHeight, 0]);
    var zScale = d3.scaleLinear()
        .range([legendHeight, 0]);
    var colorScale = d3.scaleLinear()
        .range(zColorLims);

    var mainDiv = d3.select(selector);

    var sliderXDiv = mainDiv
        .append("div")
        .attr("id", "sliderX")
        .attr("height", 30)
        .attr("style", "position: relative;height:30px;background-color: #eeeef5;");

    var sliderXLabel = mainDiv
        .append("div")
        .attr("id", "sliderX-label")
        .attr("style", "text-align: center");

    var sliderZDiv = mainDiv
        .append("div")
        .attr("id", "sliderZ")
        .attr("height", 30)
        .attr("style", "position: relative;height:30px;background-color: #eeeef5;");

    var sliderZLabel = mainDiv
        .append("div")
        .attr("id", "sliderZ-label")
        .attr("style", "text-align: center");

    var chartSvg = mainDiv
        .append("svg")
        .attr("viewBox", `0 0 300 500`);
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

    var sliderX = createD3RangeSlider(d3, xLims[0], xLims[1], sliderXDiv);
    sliderX.onChange((range) => updateXLims(range.begin, range.end));

    var zGradient = `background-image: linear-gradient(to right, ${zColorLims[0]} , ${zColorLims[1]});`
    var newZSliderDivStyle = sliderZDiv.attr("style") + zGradient;
    var sliderZ = createD3RangeSlider(d3, zLims[0], zLims[1], sliderZDiv);
    sliderZ.onChange((range) => updateZLims(range.begin, range.end));
    sliderZDiv.attr("style", newZSliderDivStyle)
    sliderZDiv.select(".slider-container")
        .attr("style", zGradient)
    sliderZDiv.select(".slider")
        .attr("style", "opacity: 0.5")

    function updateXLims(begin, end) {
        sliderXLabel.text("Score: " + begin + " - " + end);
        xLims = [begin, end];
        xScale.domain(xLims);
        xAxis.call(d3.axisBottom(xScale).ticks(10));
        updateChart();
    }

    function updateZLims(begin, end) {
        sliderZLabel.text("% Identity: " + begin + " - " + end);
        zLims = [begin, end];
        updateChart();
    }

    updateYLims = () => {
        var maxDataY = 1.2 * d3.max(dataByZStackFiltered.map(function (d) {
            return d3.max(d, function (innerD) {
                return innerD[1];
            });
        }));
        console.log(maxDataY);
        yLims = [0, maxDataY];
        yScale.domain(yLims).nice();
        yAxis.call(d3.axisLeft(yScale).ticks(5));
    }

    zDomain = Array(zLims[1] - zLims[0] + 1).fill(zLims[0]).map((x, y) => x + y);
    xScale.domain(xLims);
    yScale.domain(yLims).nice();
    // zScale.domain(zLims);
    colorScale.domain(zLims);
    xAxis.call(d3.axisBottom(xScale).ticks(10));
    yAxis.call(d3.axisLeft(yScale).ticks(5));

    dataByZStackFiltered = getDataByZStack(data);
    updateYLims();

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
    dataByX.map((d) => {
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

function updateChart() {
    var dataFiltered = data.filter((d) => {
        return (
            (d[xColumn] >= xLims[0]) &&
            (d[xColumn] <= xLims[1]) &&
            (d[zColumn] >= zLims[0]) &&
            (d[zColumn] <= zLims[1])
        );
    });

    dataByZStackFiltered = getDataByZStack(dataFiltered);

    chart.data(dataByZStackFiltered)
        .attr("d", areaGen);
}
