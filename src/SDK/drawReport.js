/* eslint-disable */
export function drawReport(d3, selector, summary) {
    var cvgCartoonMap = {
        '_': 0,
        '.': 0.25,
        'o': 0.5,
        'O': 1
    }

    function linspace(start, end, n) {
        var out = [];
        var delta = (end - start) / (n - 1);
        var i = 0;
        while(i < (n - 1)) {
            out.push(start + (i * delta));
            i++;
        }
        out.push(end);
        return out;
    }

    function getFamilyCoverageData(family) {
        var familyCoverageData = [];
        [...family.cvg].forEach(function(bit, i) {
            familyCoverageData.push({
                family: family.family,
                bin: i,
                cartoonChar: bit
            })
        });
        return familyCoverageData;
    }

    function getAccessionCoverageData(accession) {
        var coverageData = [];
        [...accession.cvg].forEach(function(bit, i) {
            coverageData.push({
                accession: accession.acc,
                bin: i,
                cartoonChar: bit
            })
        });
        return coverageData;
    }

    // adapted from https://bl.ocks.org/starcalibre/6cccfa843ed254aa0a0d
    function drawLegend(svgElement) {
        var legendWidth = 80,
            legendHeight = 200,
            margin = {top: 10, right: 60, bottom: 10, left: 2};

        var legendSvg = svgElement.append("svg")
            .attr("width", legendWidth)
            .attr("height", legendHeight);

        var gradient = legendSvg.append('defs')
            .append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%') // bottom
            .attr('y1', '100%')
            .attr('x2', '0%') // to top
            .attr('y2', '0%')
            .attr('spreadMethod', 'pad');

        var pct = linspace(0, 100, colorScale.length).map(function(d) {
            return Math.round(d) + '%';
        });

        var colourPct = d3.zip(pct, colorScale);
        colourPct.forEach(function(d) {
            gradient.append('stop')
                .attr('offset', d[0])
                .attr('stop-color', d[1])
                .attr('stop-opacity', 1);
        });

        legendSvg.append('rect')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('width', legendWidth - margin.left - margin.right)
            .attr('height', legendHeight - margin.top - margin.bottom)
            .style('fill', 'url(#gradient)')
            .attr("transform", `translate(1, ${margin.top})`)
            .style("stroke", "black")
            .style("stroke-width", 1);

        // create a scale and axis for the legend
        var legendScale = d3.scaleLinear()
            .domain([0, 1])
            .range([legendHeight - margin.top - margin.bottom, 0]);
        var legendAxis = legendSvg.append("g")
            .attr("transform", `translate(${legendWidth - margin.left - margin.right}, ${margin.top - 0.5})`)
            .call(d3.axisRight(legendScale));
    };

    function addHeaders(gElement) {
        var yShift = 15;

        var colText = "Match";
        var xShift = sectionMargin.left + rowLabelShiftX;
        var textG = gElement.append("g")
        var text = textG.append("text")
            .text(colText)
            .style("text-anchor", "end")
            .attr("transform",
                  `translate(${xShift}, ${yShift})`);

        var colText = "Coverage Heatmap";
        var xShift = sectionMargin.left + (barWidth / 2);
        var text = textG.append("text")
            .text(colText)
            .style("text-anchor", "middle")
            .attr("transform",
                  `translate(${xShift}, ${yShift})`);
    }

    function addColumns(gElement, summaryEntry=null) {
        var yShift = 15;
        var colHeight = sectionHeight;
        var colMap = {
            "score": {
                "name": "Score",
                "desc": "Pan-genome coverage",
                "valueSuffix": "%",
                "size": 50,
                "domain": [0, 100],
                "fill": "#67c286"
            },
            "pctid": {
                "name": "Identity",
                "desc": "Average alignment identity",
                "size": 70,
                "valueSuffix": "%",
                "domain": [75, 100],
                "fill": "#fdb53c"
            },
            "aln": {
                "name": "Reads",
                "desc": "Number of alignments (bowtie2)",
                "size": 70,
                "valueSuffix": "",
                "domain": [0, 1000],
                "fill": "#658fc4"
            }
        }
        var textG = gElement.append("g")
            .attr("transform",
                  `translate(${sectionMargin.left + barWidth + 10}, ${yShift})`);
        var prevWidth = 0;
        var columns = ["score", "pctid", "aln"];
        columns.forEach((column) => {
            var colAttrs = colMap[column];
            var colWidth = colAttrs["size"];
            var colText = summaryEntry ? summaryEntry[column] : colAttrs["name"];
            var cellG = textG.append("g");
            var text = textG.append("text")
                .text(colText)
                .style("text-anchor", "middle")
                .attr("x", prevWidth + (colWidth / 2));
            if (summaryEntry) {
                if (colText != null) {
                    text.text(colText + colAttrs.valueSuffix)
                        .style("opacity", 0)
                        .attr("column", column)
                        .style("font-size", 12);
                    var diff = parseInt(colText) - colAttrs["domain"][0];
                    var diffCapped = Math.min(diff, colAttrs["domain"][1]);
                    var range = colAttrs["domain"][1] - colAttrs["domain"][0];
                    var colorBarWidth = colWidth * diffCapped / range;
                    var colorBar = cellG.append("rect")
                        .attr("fill", colAttrs["fill"])
                        .attr("width", colorBarWidth)
                        .attr("height", colHeight)
                        .attr("x", prevWidth)
                        .attr("y", -yShift);
                    var border = cellG.append("rect")
                        .attr("fill", "none")
                        .style("stroke", "black")
                        .style("stroke-width", 1)
                        .attr("width", colWidth)
                        .attr("height", colHeight)
                        .attr("x", prevWidth)
                        .attr("y", -yShift);
                }
            }
            var tooltipFontSize = 10;
            var tooltipX = sectionMargin.left + barWidth + prevWidth + (colWidth / 2);
            var tooltipY = 15;
            var hoverForColumnText = textG.append("rect")
                .attr("width", colWidth)
                .attr("height", colHeight)
                .attr("x", prevWidth)
                .attr("y", -yShift)
                .style("opacity", 0)
                .on("mouseover", () => {
                    d3.selectAll(`[column="${column}"]`).style("opacity", 1);
                    d3.select("#tooltip")
                        .text(colAttrs["desc"])
                        .attr("font-size", tooltipFontSize)
                        .attr("x", tooltipX)
                        .attr("y", tooltipY)
                        .style("text-anchor", "middle")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    d3.selectAll(`[column="${column}"]`).style("opacity", 0);
                    d3.select("#tooltip").style("opacity", 0);
                });

            prevWidth += colWidth;
        });
    }

    function getFamilyLink(familyName) {
        if (familyName == "AMR") {
            return "https://card.mcmaster.ca/";
        }
        else {
            return `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=${familyName}`;
        }
    }

    function getAccessionLink(familyName, accessionName) {
        if (familyName == "AMR") {
            var genbankAcc = accessionName.slice(0, accessionName.lastIndexOf("_"))
            return `https://www.ncbi.nlm.nih.gov/nuccore/${genbankAcc}`;
        }
        else {
            return `https://www.ncbi.nlm.nih.gov/nuccore/${accessionName}`;
        }
    }

    function addFamilyText(gElement, family) {
        var textGroup = gElement.append("g")
            .attr("transform",
                  `translate(${sectionMargin.left}, ${sectionMargin.top})`);

        var accessionsHeaderY = 40;
        var textEntry = textGroup.append("text")
            .attr("transform",
                  `translate(0, ${accessionsHeaderY})`)
            .text(`Top ${maxAccessions} accessions by coverage:`);
    }

    function addAccessionText(gElement, family, accession) {
        var linkText = "GenBank";
        var linkWidth = barWidth;
        var linkHeight = 20;
        var textGroup = gElement.append("g")
            .attr("transform",
                  `translate(${sectionMargin.left}, ${sectionMargin.top})`);
        var linkSvg = textGroup.append("svg")
            .attr("width", linkWidth)
            .attr("height", linkHeight)
            .attr("x", 10);
        var text = linkSvg.append("text")
            .text("Name: " + accession.name)
            .style("font-size", 10)
            .attr("transform",
                  `translate(0, ${sectionMargin.top + 14})`);
    }

    function toggleVisibilityValue(currentValue) {
        return (currentValue == "visible" ? "hidden" : "visible");
    }

    function toggleIRow(allRows, currentRow, subsectionHeight) {
        var subsectionG = currentRow.select("g.subsection");
        var subsectionVisibility = subsectionG.attr("visibility");
        var subSectionVisible = subsectionVisibility == "visible";
        var shiftY = subSectionVisible ? -subsectionHeight : subsectionHeight;
        var caretRotate = subSectionVisible ? -30 : 60;
        var fadeTime = 500;
        var shift = false;
        allRows.each(function(d, i) {
            if (shift) {
                var currentY = parseInt(d3.select(this).select("svg").attr("y"));
                d3.select(this).select("svg").transition().duration(fadeTime).attr("y", currentY + shiftY);
            }
            if (d3.select(this).attr("rowid") == currentRow.attr("rowid")) {
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
        currentRow.selectAll(".accession").each(function(d, i) {
            var accessionName = d3.select(this).attr("rowid");
            var isExpanded = !d3.select(this).select(`.subsection[visibility="visible"]`).empty();
            if (isExpanded) {
                toggleAccessionRow(familyName, accessionName);
                waitForAccession = true;
            }
        });
        var timeout = waitForAccession ? 500 : 0;  // hacky fix for family+acc collapse
        setTimeout(() => {toggleIRow(allRows, currentRow, subsectionHeight)}, timeout);
    }

    function shiftLowerFamilies(familyName, shiftY) {
        var fadeTime = 500;
        var shift = false;
        d3.selectAll(".family").each(function(d, i) {
            if (shift) {
                var currentY = parseInt(d3.select(this).select("svg").attr("y"));
                d3.select(this).select("svg").transition().duration(fadeTime).attr("y", currentY + shiftY);
            }
            if (d3.select(this).attr("rowid") == familyName) {
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
        var subSectionVisible = subsectionVisibility == "visible";
        var subsectionHeight = 100;
        var shiftY = subSectionVisible ? -subsectionHeight : subsectionHeight;
        toggleIRow(allRows, currentRow, subsectionHeight);
        shiftLowerFamilies(familyName, shiftY);
    }

    function drawExpandableRow(gElement, name, dataBin, heatSquareData, rowIndex) {
        var rowType = dataBin;

        y = rowIndex * sectionHeight;
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
            .range([ 0, barWidth ])
            .domain(genomeBins)
            .padding(0.01);

        var y = d3.scaleBand()
            .range([ 0, barHeight ])
            .domain([name])
            .padding(0.01);
        var yAxis = entryG.append("g")
            .call(d3.axisLeft(y));
        yAxis.select("path").remove();
        yAxis.select("line").remove();
        yAxis.selectAll("text")
            .attr("x", rowLabelShiftX)
            .style("font-size", 12)
            .style("fill", "blue")
            .style('cursor', 'pointer')
            .each( function(d, i){
                var link;
                if (rowType == "family") {
                    link = getFamilyLink(name);
                }
                else {
                    var familyName = gElement.attr("family");
                    link = getAccessionLink(familyName, name);
                }
                var textWidth = 100;
                var textHeight = 14;
                d3.select(this.parentNode)
                    .append("a")
                    .attr("xlink:href", link)
                    .attr("target", "_blank")
                .append("rect")
                    .attr("x", rowLabelShiftX - textWidth)
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
            .attr("x", d => x(d.bin) )
            .attr("y", d => y(d[dataBin]) )
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", d => colorMap(cvgCartoonMap[d.cartoonChar]) )

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
            .style('cursor', 'pointer').on("click", function() {
                if (rowType == "family") {
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

    var sectionMargin = {top: 2, right: 300, bottom: 2, left: 200};
    var sectionWidth = 750;
    var sectionHeight = 20;
    var tableShiftY = 40;
    var barWidth = sectionWidth - sectionMargin.left - sectionMargin.right;
    var barHeight = sectionHeight - sectionMargin.top - sectionMargin.bottom;
    var barBorder = {size: 1, color: '#999'};
    var rowLabelShiftX = -25;

    var colorMap = d3.scaleSequential(d3.interpolateYlOrRd)
        .domain([0, 1]);
    var colorScale = Object.values(cvgCartoonMap).map((value) => colorMap(value));

    var cvgLength = summary["families"][0]["cvg"].length;
    var genomeBins = [...Array(cvgLength).keys()];

    var chartSvg = d3.select(selector)
        .append("svg")
        .attr("viewBox", `0 0 750 700`);
    var familiesSvg = chartSvg.append("svg")
        .attr("y", tableShiftY);
    var columnTooltipSvgText = chartSvg.append("text").attr("id", "tooltip");

    drawLegend(familiesSvg);
    var columnHeadersG = chartSvg.append("g")
        .attr("transform", `translate(0, ${tableShiftY - sectionHeight})`);
    addHeaders(columnHeadersG);
    addColumns(columnHeadersG);

    var familyTextHeight = 50;

    var accessionsByFamily = d3.nest()
        .key(d => d.fam)
        .entries(summary["accessions"])
        .reduce(function(obj, x) {
            obj[x["key"]] = x["values"]
            return obj;
        }, {});
    var maxAccessions = 10;
    summary["families"].forEach((family, i) => {
        var familyCoverageData = getFamilyCoverageData(family);
        var familyG = familiesSvg.append("g")
            .attr("class", "family")
            .attr("rowid", `${family.family}`);
        var familySubGroup = drawExpandableRow(familyG, family.family, "family", familyCoverageData, i);
        addColumns(familyG.select("svg"), family);
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
            var accessionCoverageData = getAccessionCoverageData(accession);
            var accessionG = familyAccessionsG.append("g")
                .attr("class", "accession")
                .attr("rowid", `${accession.acc}`)
                .attr("family", `${family.family}`);
            var accessionSubGroup = drawExpandableRow(
                accessionG, accession.acc, "accession",
                accessionCoverageData, i);
            addColumns(accessionG.select("svg"), accession);
            addAccessionText(accessionSubGroup, family, accession);
        });
    });
}
