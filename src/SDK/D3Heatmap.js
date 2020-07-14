export function drawHeatmap(d3, selector, summary) {
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
    function drawLegend() {
        var legendWidth = 80,
            legendHeight = 200,
            margin = {top: 10, right: 60, bottom: 10, left: 2};

        var legendSvg = chartSvg.append("svg")
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

    function addColumns(gElement, summaryEntry=null) {
        var colWidth = 45;
        var columns = ["score", "pctid", "aln", "glb", "cvgpct"];
        if (summaryEntry) {
            columns = columns.map((col) => summaryEntry[col]);
        }
        var textG = gElement.append("g")
            .attr("transform",
                  `translate(${sectionMargin.left + barWidth + 10}, 15)`);
        columns.forEach((column, i) => {
            textG.append("text")
                .text(column)
                .attr("x", colWidth * i);
        });
    }

    function addFamilyText(gElement, family) {
        var textGroup = gElement.append("g")
            .attr("transform",
                  `translate(${sectionMargin.left}, ${sectionMargin.top})`);

        var link, linkText, linkWidth;
        if (family.family == "AMR") {
            link = "https://card.mcmaster.ca/";
            linkText = "CARD";
            linkWidth = 45;
        }
        else {
            link = `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=${family.family}`;
            linkText = "NCBI Taxonomy Browser";
            linkWidth = 170;
        }
        var linkHeight = 20;
        var linkSvg = textGroup.append("svg")
            .attr("width", linkWidth)
            .attr("height", linkHeight)
            .attr("x", 20);
        var linkRectA = linkSvg
            .append("a")
            .attr("xlink:href", link)
            .attr("target", "_blank")
            .append("rect")
            .attr("opacity", 0)
            .attr("width", linkWidth)
            .attr("height", linkHeight);
        var linkTextA = linkSvg.append("text")
            .style("fill", "blue")
            .style("pointer-events", "none")
            .text(linkText)
            .attr("transform",
                  `translate(0, ${sectionMargin.top + 14})`);

        var accessionsHeaderY = 40;
        var textEntry = textGroup.append("text")
            .attr("transform",
                  `translate(0, ${accessionsHeaderY})`)
            .text(`Top ${maxAccessions} accessions by cvgpct:`);
    }

    function addAccessionText(gElement, family, accession) {
        var link;
        if (family.family == "AMR") {
            var genbank_acc = accession.acc.slice(0, accession.acc.lastIndexOf("_"))
            link = `https://www.ncbi.nlm.nih.gov/nuccore/${genbank_acc}`;
        }
        else {
            link = `https://www.ncbi.nlm.nih.gov/nuccore/${accession.acc}`;
        }

        var linkText = "GenBank";
        var linkWidth = 200;
        var linkHeight = 20;
        var textGroup = gElement.append("g")
            .attr("transform",
                  `translate(${sectionMargin.left}, ${sectionMargin.top})`);
        var linkSvg = textGroup.append("svg")
            .attr("width", linkWidth)
            .attr("height", linkHeight)
            .attr("x", 20);
        var linkRectA = linkSvg
            .append("a")
            .attr("xlink:href", link)
            .attr("target", "_blank")
            .append("rect")
            .attr("opacity", 0)
            .attr("width", linkWidth)
            .attr("height", linkHeight);
        var linkTextA = linkSvg.append("text")
            .style("fill", "blue")
            .style("pointer-events", "none")
            .text(linkText)
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
        toggleIRow(allRows, currentRow, subsectionHeight);
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
            .attr("x", -25)
            .style("font-size", 12);
        
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

        var clickExpandRect = entrySvg.append("rect")
            .attr("class", "click-expand")
            .attr("visibility", "visible")
            .attr("width", sectionWidth)
            .attr("height", sectionHeight)
            .style("stroke", barBorder.color)
            .style("opacity", 0)
            .style("stroke-width", barBorder.size)
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
    var sectionWidth = 800;
    var sectionHeight = 20;
    var barWidth = sectionWidth - sectionMargin.left - sectionMargin.right;
    var barHeight = sectionHeight - sectionMargin.top - sectionMargin.bottom;
    var barBorder = {size: 1, color: '#999'};

    var colorMap = d3.scaleSequential(d3.interpolateYlOrRd)
        .domain([0, 1]);
    var colorScale = Object.values(cvgCartoonMap).map((value) => colorMap(value));

    var cvgLength = summary["families"][0]["cvg"].length;
    var genomeBins = [...Array(cvgLength).keys()];

    var chartSvg = d3.select(selector)
        .append("svg")
        .attr("width", 800)
        .attr("height", 660);
    var familiesSvg = chartSvg.append("svg")
        .attr("y", 20);

    drawLegend();
    addColumns(chartSvg);

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
