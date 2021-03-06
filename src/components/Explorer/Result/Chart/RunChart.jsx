/* eslint-disable no-unused-vars */
import React from "react";
import * as d3 from 'd3';

import {
    cvgCartoonMap,
    genomeBins,
    colorMap,
    colMap,
    sectionMargin,
    sectionWidth,
    sectionHeight,
    tableShiftY,
    barWidth,
    barHeight,
    barBorder,
    caretWidth,
    drawLegend,
    addHeaders,
    addColumns,
    getCoverageData,
} from './ChartHelpers';

const chartId = "runChart"

const RunChart = () => {
    return <div id={chartId} />
}

export default RunChart;

const familySectionKey = "families"
const genbankSectionKey = "sequences"

const sraIdKey = "sra_id"
const familyNameKey = "family_name"
const maxGenbanks = 10;
const genbankSortKey = "n_reads"
const genbankNameKey = "genbank_id"
const genbankFamilyNameKey = "family_name"
const genbankTitleKey = "genbank_name"
const genbankCoverageKey = "coverage_bins"
const familyCoverageKey = "coverage_bins"

export const renderChart = (summary, columns) => {
    var chartSvg = d3.select(`#${chartId}`)
        .append("svg")
        .attr("viewBox", `0 0 750 700`);
    var familiesSvg = chartSvg.append("svg")
        .attr("y", tableShiftY);

    drawLegend(familiesSvg);

    var columnTooltipSvgText = chartSvg.append("text").attr("id", "tooltip");
    var columnHeadersG = chartSvg.append("g")
        .attr("transform", `translate(0, ${tableShiftY - sectionHeight})`);
    addHeaders(columnHeadersG);
    addColumns(columnHeadersG, columns, colMap);

    var familyTextHeight = 50;

    var genbanksByFamily = d3.nest()
        .key(d => d[genbankFamilyNameKey])
        .entries(summary[genbankSectionKey])
        .reduce(function (obj, x) {
            obj[x["key"]] = x["values"]
            return obj;
        }, {});
    summary[familySectionKey].forEach((family, i) => {
        var familyCoverageData = getCoverageData(family, familyCoverageKey);
        var familyG = familiesSvg.append("g")
            .attr("class", "family")
            .attr("rowid", `${family[familyNameKey]}`);
        var familySubGroup = drawExpandableRow(familyG, family[familyNameKey], "family", familyCoverageData, i);
        addColumns(familyG.select("svg"), columns, colMap, family);
        addFamilyText(familySubGroup);

        var familyGenbanksG = familySubGroup.append("g")
            .attr("class", "family-genbanks")
            .attr("transform", `translate(0, ${familyTextHeight})`)

        var genbanks = genbanksByFamily[family[familyNameKey]]
            .sort((a, b) => parseFloat(a[genbankSortKey]) < parseFloat(b[genbankSortKey]));
        if (genbanks.length > maxGenbanks) {
            genbanks = genbanks.slice(0, maxGenbanks);
        }
        genbanks.forEach((genbank, i) => {
            var genbankCoverageData = getCoverageData(genbank, genbankCoverageKey);
            var genbankG = familyGenbanksG.append("g")
                .attr("class", "genbank")
                .attr("rowid", `${genbank[genbankNameKey]}`)
                .attr("family", `${family[familyNameKey]}`);
            var genbankSubGroup = drawExpandableRow(
                genbankG, genbank[genbankNameKey], "genbank",
                genbankCoverageData, i);
            addColumns(genbankG.select("svg"), columns, colMap, genbank);
            addGenbankText(genbankSubGroup, genbank);
        });
    });
}

function drawExpandableRow(gElement, name, rowType, coverageData, rowIndex) {
    var entrySvg = gElement.append("svg")
        .attr("y", rowIndex * sectionHeight)
        .attr("width", sectionWidth)
        .attr("height", sectionHeight)
        .attr("border", barBorder.size)
        .style("display", "block")

    var entryG = entrySvg.append("g")
        .attr("transform",
            `translate(${sectionMargin.left}, ${sectionMargin.top})`);

    var x = d3.scaleBand()
        .range([0, barWidth])
        .domain(genomeBins)
        .padding(0.01);

    var y = d3.scaleBand()
        .range([0, barHeight])
        .domain([name])
        .padding(0.01);
    var yAxis = entryG.append("g")
        .call(d3.axisLeft(y));
    yAxis.select("path").remove();
    yAxis.select("line").remove();
    yAxis.selectAll("text")
        .attr("x", -caretWidth)
        .style("font-size", 12)
        .style("fill", "blue")
        .style('cursor', 'pointer')
        .each(function (d, i) {
            var link = `/explorer?${rowType}=${name}`;
            var textWidth = 100;
            var textHeight = 14;
            var linkA = d3.select(this.parentNode)
                .append("a")
                .attr("xlink:href", link)
            linkA.append("rect")
                .attr("x", -(caretWidth + textWidth))
                .attr("y", -8)
                .attr("width", textWidth)
                .attr("height", textHeight)
                .attr("fill", "black")
                .style("opacity", 0)
        });

    var caret = yAxis.append("g")
        .attr("transform", `translate(-12, 9)`)
        .append("path")
        .attr("class", "expand-caret")
        .attr("d", d3.symbol().type(d3.symbolTriangle))
        .attr('fill', 'black')
        .attr("transform", "rotate(-30)");

    var heatBar = entryG.append("g")
        .attr("class", "heatbar");

    var heatSquares = heatBar.selectAll()
        .data(coverageData)
        .enter()
        .append("rect")
        .attr("x", d => x(d.bin))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", d => colorMap(cvgCartoonMap[d.cartoonChar]))

    var barBorderPath = entryG
        .append("rect")
        .attr("width", barWidth)
        .attr("height", barHeight)
        .style("fill", "none")
        .style("stroke", barBorder.color)
        .style("stroke-width", barBorder.size);

    var heatmapCover = entryG
        .append("rect")
        .attr("width", barWidth)
        .attr("height", barHeight)
        .attr("class", "heatmap-cover")
        .style("opacity", 0)
        .style("fill", "#000");

    var clickExpandShiftX = 20
    var clickExpandRect = entryG.append("rect")
        .attr("class", "click-expand")
        .attr("visibility", "visible")
        .attr("transform", `translate(${-clickExpandShiftX}, 0)`)
        .attr("width", barWidth + clickExpandShiftX)
        .attr("height", barHeight)
        .style("opacity", 0)
        .style('cursor', 'pointer').on("click", function () {
            if (rowType === "family") {
                toggleFamilyRow(name);
            }
            else {
                var familyName = gElement.attr("family");
                toggleGenbankRow(familyName, name);
            }
        });

    var subsection = entrySvg
        .append("g")
        .attr("class", "subsection")
        .attr("visibility", "hidden")
        .attr("transform",
            `translate(0, ${sectionMargin.top + barHeight})`);
    return subsection
}

function toggleVisibilityValue(currentValue) {
    return (currentValue === "visible" ? "hidden" : "visible");
}

function toggleIRow(allRows, currentRow, subsectionHeight) {
    var subsectionG = currentRow.select("g.subsection");
    var subsectionVisibility = subsectionG.attr("visibility");
    var subSectionVisible = subsectionVisibility === "visible";
    var shiftY = subSectionVisible ? -subsectionHeight : subsectionHeight;
    var caretRotate = subSectionVisible ? -30 : 60;
    var fadeTime = 500;
    var shift = false;
    allRows.each(function (d, i) {
        if (shift) {
            var currentY = parseInt(d3.select(this).select("svg").attr("y"));
            d3.select(this).select("svg").transition().duration(fadeTime).attr("y", currentY + shiftY);
        }
        if (d3.select(this).attr("rowid") === currentRow.attr("rowid")) {
            shift = true;
            subsectionG.attr("visibility", toggleVisibilityValue(subsectionVisibility));
            var currentHeight = parseInt(d3.select(this).select("svg").attr("height"));
            d3.select(this).select(".click-expand")
                .attr("visibility", "hidden");
            d3.select(this).select("svg")
                .transition().duration(fadeTime)
                .attr("height", currentHeight + shiftY);
            d3.select(this).select(".expand-caret")
                .transition().duration(fadeTime)
                .attr("transform", `rotate(${caretRotate})`)
                .on("end", () => {
                    d3.select(this).select(".click-expand")
                        .attr("visibility", "visible");
                });
        }
        else {
            d3.select(this).select(".heatmap-cover")
                .transition().duration(fadeTime)
                .style("opacity", subSectionVisible ? 0 : 0.4);
            var currentClickExpandVisibility = d3.select(this).select(".click-expand")
                .attr("visibility");
            d3.select(this).select(".click-expand")
                .attr("visibility", toggleVisibilityValue(currentClickExpandVisibility));
        }
    });
}

function toggleFamilyRow(familyName) {
    var allRows = d3.selectAll(".family");
    var currentRow = d3.select(`.family[rowid="${familyName}"]`);
    var subsectionHeight = 300;
    var waitForGenbank = false;
    currentRow.selectAll(".genbank").each(function (d, i) {
        var genbankName = d3.select(this).attr("rowid");
        var isExpanded = !d3.select(this).select(`.subsection[visibility="visible"]`).empty();
        if (isExpanded) {
            toggleGenbankRow(familyName, genbankName);
            waitForGenbank = true;
        }
    });
    var timeout = waitForGenbank ? 500 : 0;  // hacky fix for family+acc collapse
    setTimeout(() => { toggleIRow(allRows, currentRow, subsectionHeight) }, timeout);
}

function shiftLowerFamilies(familyName, shiftY) {
    var fadeTime = 500;
    var shift = false;
    d3.selectAll(".family").each(function (d, i) {
        if (shift) {
            var currentY = parseInt(d3.select(this).select("svg").attr("y"));
            d3.select(this).select("svg").transition().duration(fadeTime).attr("y", currentY + shiftY);
        }
        if (d3.select(this).attr("rowid") === familyName) {
            shift = true;
            var currentHeight = parseInt(d3.select(this).select("svg").attr("height"));
            d3.select(this).select("svg").transition().duration(fadeTime).attr("height", currentHeight + shiftY);
        }
    });
}

function toggleGenbankRow(familyName, genbankName) {
    var allRows = d3.selectAll(".genbank");
    var currentRow = d3.select(`.genbank[rowid="${genbankName}"]`);
    var subsectionVisibility = currentRow.select("g.subsection").attr("visibility");
    var subSectionVisible = subsectionVisibility === "visible";
    var subsectionHeight = 100;
    var shiftY = subSectionVisible ? -subsectionHeight : subsectionHeight;
    toggleIRow(allRows, currentRow, subsectionHeight);
    shiftLowerFamilies(familyName, shiftY);
}

function addFamilyText(gElement) {
    var textGroup = gElement.append("g")
        .attr("transform",
            `translate(${sectionMargin.left}, ${sectionMargin.top})`);

    var genbankHeaderY = 40;
    var textEntry = textGroup.append("text")
        .attr("transform",
            `translate(0, ${genbankHeaderY})`)
        .text(`Top ${maxGenbanks} GenBank accessions by read count:`);
}

function addGenbankText(gElement, genbank) {
    // GenBank title
    var textGroup = gElement.append("g")
        .attr("transform",
            `translate(${sectionMargin.left}, ${sectionMargin.top + 14})`);
    var genbankTitle = textGroup.append("text")
        .text("Name: " + genbank[genbankTitleKey])
        .style("font-size", 10);

    // JBrowse link
    var jBrowseG = textGroup.append("g")
        .attr("transform",
            `translate(0, 20)`);
    var jBrowseLink = `/jbrowse?bam=${genbank[sraIdKey]}&loc=${genbank[genbankNameKey]}`
    var jBrowseTitle = jBrowseG.append("text")
        .text("View Alignment")
        .style("fill", "blue")
    var jBrowseA = jBrowseG.append("a")
        .attr("xlink:href", jBrowseLink)
    jBrowseA.append("rect")
        .attr("x", 0)
        .attr("y", -15)
        .attr("width", 120)
        .attr("height", 20)
        .attr("fill", "black")
        .style("opacity", 0)
}
