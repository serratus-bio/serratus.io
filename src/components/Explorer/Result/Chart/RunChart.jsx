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

export default () => {
    return <div id={chartId} />
}

var maxAccessions = 10;

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

    var accessionsByFamily = d3.nest()
        .key(d => d.fam)
        .entries(summary["accessionSections"])
        .reduce(function (obj, x) {
            obj[x["key"]] = x["values"]
            return obj;
        }, {});
    var maxAccessions = 10;
    summary["familySections"].forEach((family, i) => {
        var familyCoverageData = getCoverageData(family);
        var familyG = familiesSvg.append("g")
            .attr("class", "family")
            .attr("rowid", `${family.family}`);
        var familySubGroup = drawExpandableRow(familyG, family.family, "family", familyCoverageData, i);
        addColumns(familyG.select("svg"), columns, colMap, family);
        addFamilyText(familySubGroup, family);

        var familyAccessionsG = familySubGroup.append("g")
            .attr("class", "family-accessions")
            .attr("transform", `translate(0, ${familyTextHeight})`)

        var accessions = accessionsByFamily[family.family]
            .sort((a, b) => parseFloat(a.cvgpct) < parseFloat(b.cvgpct));
        if (accessions.length > maxAccessions) {
            accessions = accessions.slice(0, maxAccessions);
        }
        accessions.forEach((accession, i) => {
            var accessionCoverageData = getCoverageData(accession);
            var accessionG = familyAccessionsG.append("g")
                .attr("class", "accession")
                .attr("rowid", `${accession.acc}`)
                .attr("family", `${family.family}`);
            var accessionSubGroup = drawExpandableRow(
                accessionG, accession.acc, "accession",
                accessionCoverageData, i);
            addColumns(accessionG.select("svg"), columns, colMap, accession);
            addAccessionText(accessionSubGroup, accession);
        });
    });
}

function drawExpandableRow(gElement, name, dataBin, heatSquareData, rowIndex) {
    var rowType = dataBin;

    var y = rowIndex * sectionHeight;
    var entrySvg = gElement.append("svg")
        .attr("y", y)
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

    y = d3.scaleBand()
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
            var link;
            if (rowType === "family") {
                link = `/explorer?family=${name}`;
            }
            else {
                link = `/explorer?genbank=${name}`
            }
            var textWidth = 100;
            var textHeight = 14;
            var linkA = d3.select(this.parentNode)
                .append("a")
                .attr("xlink:href", link)
            linkA.append("rect")
                .attr("x", caretWidth - textWidth)
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
        .data(heatSquareData)
        .enter()
        .append("rect")
        .attr("x", d => x(d.bin))
        .attr("y", d => y(d[dataBin]))
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
                toggleAccessionRow(familyName, name);
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
    var waitForAccession = false;
    currentRow.selectAll(".accession").each(function (d, i) {
        var accessionName = d3.select(this).attr("rowid");
        var isExpanded = !d3.select(this).select(`.subsection[visibility="visible"]`).empty();
        if (isExpanded) {
            toggleAccessionRow(familyName, accessionName);
            waitForAccession = true;
        }
    });
    var timeout = waitForAccession ? 500 : 0;  // hacky fix for family+acc collapse
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

function toggleAccessionRow(familyName, accessionName) {
    var allRows = d3.selectAll(".accession");
    var currentRow = d3.select(`.accession[rowid="${accessionName}"]`);
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

    var accessionsHeaderY = 40;
    var textEntry = textGroup.append("text")
        .attr("transform",
            `translate(0, ${accessionsHeaderY})`)
        .text(`Top ${maxAccessions} accessions by coverage:`);
}

function addAccessionText(gElement, accession) {
    // GenBank title
    var textGroup = gElement.append("g")
        .attr("transform",
            `translate(${sectionMargin.left}, ${sectionMargin.top + 14})`);
    var genbankTitle = textGroup.append("text")
        .text("Name: " + accession.name)
        .style("font-size", 10);

    // JBrowse link
    var jBrowseG = textGroup.append("g")
        .attr("transform",
            `translate(0, 20)`);
    var jBrowseLink = `/jbrowse?bam=${accession.sra}&loc=${accession.acc}`
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
