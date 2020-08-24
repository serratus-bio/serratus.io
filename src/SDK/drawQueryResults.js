/* eslint-disable */
export function drawQueryResults(d3, selector, results, columns) {
    var cvgCartoonMap = {
        '_': 0,
        '.': 0.25,
        'o': 0.5,
        'O': 1
    }

    var colMap = {
        "score": {
            "name": "Score",
            "desc": "Sequence coverage (bins with at least 1 read)",
            "valueSuffix": "%",
            "size": 50,
            "domain": [0, 100],
            "fill": "#67c286"
        },
        "cvgPct": {
            "name": "Coverage",
            "desc": "Sequence coverage (bins with at least 1 read)",
            "valueSuffix": "%",
            "size": 70,
            "domain": [0, 100],
            "fill": "#67c286"
        },
        "pctId": {
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

    function getCoverageData(match) {
        var matchCoverageData = [];
        [...match.cvg].forEach(function(bit, i) {
            matchCoverageData.push({
                sra: match.sra,
                bin: i,
                cartoonChar: bit
            })
        });
        return matchCoverageData;
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
        var textG = gElement.append("g")
            .attr("transform",
                  `translate(${sectionMargin.left + barWidth + 10}, ${yShift})`);
        var prevWidth = 0;
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
                    var colorBarWidth = Math.max(0, colWidth * diffCapped / range);
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

    function drawExpandableRow(gElement, name, dataBin, heatSquareData, rowIndex) {
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
            .style("font-size", 12)
            .style("fill", "blue")
            .style('cursor', 'pointer')
            .each( function(d, i){
                var link = `/query?run=${name}`;
                var offsetX = 0
                var textWidth = 80;
                var textHeight = 14;
                d3.select(this.parentNode)
                    .append("a")
                    .attr("xlink:href", link)
                .append("rect")
                    .attr("x", offsetX - textWidth)
                    .attr("y", -8)
                    .attr("width", textWidth)
                    .attr("height", textHeight)
                    .attr("fill", "black")
                    .style("opacity", 0)
            });;

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
    }

    var sectionMargin = {top: 2, right: 230, bottom: 2, left: 200};
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

    var cvgLength = results[0]["cvg"].length;
    var genomeBins = [...Array(cvgLength).keys()];

    var chartSvg = d3.select(selector)
        .append("svg")
        .attr("viewBox", `0 0 750 500`);
    var matchSvg = chartSvg.append("svg")
        .attr("y", tableShiftY);

    drawLegend(matchSvg);

    var columnTooltipSvgText = chartSvg.append("text").attr("id", "tooltip");
    var columnHeadersG = chartSvg.append("g")
        .attr("transform", `translate(0, ${tableShiftY - sectionHeight})`);
    addHeaders(columnHeadersG);
    addColumns(columnHeadersG);

    results.forEach((match, i) => {
        var coverageData = getCoverageData(match);
        var matchG = matchSvg.append("g")
            .attr("class", "sra")
            .attr("rowid", `${match.sra}`);
        var matchSubGroup = drawExpandableRow(matchG, match.sra, "match", coverageData, i);
        addColumns(matchG.select("svg"), match);
    });
}
