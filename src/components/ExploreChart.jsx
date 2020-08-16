import React from "react";
import * as d3 from 'd3';

export const ExploreChart = (props) => {
    const [chartLoaded, setChartLoaded] = React.useState(false);

    data = props.data;
    sliderIdentityLims = props.sliderIdentityLims;
    sliderCoverageLims = props.sliderCoverageLims;

    React.useEffect(() => {
        if (!chartLoaded) {
            drawExploreFamilyChart(props.data);
            updateYLims();
            setChartLoaded(true);
        }
    }, [chartLoaded, props.data]);

    React.useEffect(() => {
        updateXLims(...props.sliderIdentityLims);
    }, [props.sliderIdentityLims]);

    React.useEffect(() => {
        updateZLims(...props.sliderCoverageLims);
    }, [props.sliderCoverageLims]);

    updateChart = (transitionDuration = 0) => {
        console.log("updateChart()");
        var dataFiltered = data.filter((d) => {
            return (
                (d[xColumn] >= sliderIdentityLims[0]) &&
                (d[xColumn] <= sliderIdentityLims[1]) &&
                (d[zColumn] >= sliderCoverageLims[0]) &&
                (d[zColumn] <= sliderCoverageLims[1])
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

    return (
        <div id="chart" className="py-2" />
    )
}

var chart;
var yLims = [0, 0]; // computed after family data loaded
var zDomain;
var xColumn = "pctid";
var yColumn = "n";
var zColumn = "score";
var dataByZStackFiltered;
var areaGen;

var data;
var sliderIdentityLims;
var sliderCoverageLims;

var updateXLims;
var updateZLims;
export var updateYLims;
export var updateChart;

export const drawExploreFamilyChart = (data) => {
    console.log("drawExploreFamilyChart()");

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

    var mainDiv = d3.select("#chart");

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

    updateXLims = (begin, end) => {
        console.log("updateXLims()");
        sliderIdentityLims = [begin, end];
        var rangeLen = end - begin;
        var nTicks = (rangeLen < 10) ? rangeLen : 10;
        xScale.domain(sliderIdentityLims);
        xAxis.call(d3.axisBottom(xScale).ticks(nTicks));
        updateChart();
    }

    updateZLims = (begin, end) => {
        sliderCoverageLims = [begin, end];
        updateChart();
    }

    updateYLims = () => {
        console.log("updateYLims()");
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

    zDomain = Array(sliderCoverageLims[1] - sliderCoverageLims[0] + 1).fill(sliderCoverageLims[0]).map((x, y) => x + y);
    xScale.domain(sliderIdentityLims);
    yScale.domain(yLims).nice();
    colorScale.domain(sliderCoverageLims);
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
}

function getDataByZStack(dataFiltered) {
    console.log("getDataByZStack()");
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
