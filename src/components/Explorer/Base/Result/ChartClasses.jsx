import * as d3 from 'd3';
import {
    cvgCartoonMap,
    genomeBins,
    colorMap,
    sectionMargin,
    sectionWidth as rowWidth,
    sectionHeight as rowHeight,
    barWidth,
    barHeight,
    barBorder as rowBorder,
    addColumns,
    getCoverageData,
} from './ChartHelpers';

const sequenceIdKey = "sequence_accession"
const sequenceNameKey = "virus_name"
const coverageKey = "coverage_bins"

export class SequenceMatch {
    constructor(rootSvg, sequenceData, rowIndex, colMap, d3InterpolateFunction) {
        this.data = sequenceData;
        this.rowIndex = rowIndex;
        this.colMap = colMap;
        this.d3InterpolateFunction = d3InterpolateFunction;

        this.searchLevel = "sequence";
        this.searchLevelValue = this.data[sequenceIdKey];
        this.sequenceG = rootSvg.append("g")
            .attr("class", "sequence")
            .attr("rowid", `${this.data[sequenceIdKey]}`);
        this.setDisplayName();
    }

    setDisplayName() {
        this.fullName = this.data[sequenceNameKey];
        this.displayName = this.fullName;
        const maxLength = 18;
        if (this.displayName.length > maxLength) {
            this.displayName = this.displayName.slice(0, maxLength) + '...';
        }
    }

    addLinkAndHeatmap() {
        const coverageData = getCoverageData(this.data, coverageKey);

        const mainSvg = this.sequenceG.append("svg")
            .attr("y", this.rowIndex * rowHeight)
            .attr("width", rowWidth)
            .attr("height", rowHeight)
            .attr("border", rowBorder.size)
            .style("display", "block")

        const mainG = mainSvg.append("g")
            .attr("transform",
                `translate(${sectionMargin.left}, ${sectionMargin.top})`);

        const x = d3.scaleBand()
            .range([0, barWidth])
            .domain(genomeBins)
            .padding(0.01);
        const y = d3.scaleBand()
            .range([0, barHeight])
            .domain([this.displayName])
            .padding(0.01);
        const yAxis = mainG.append("g")
            .call(d3.axisLeft(y));
        yAxis.select("path").remove();
        yAxis.select("line").remove();
        yAxis.selectAll("text")
            .style("font-size", 12)
            .style("fill", "blue")
            .style('cursor', 'pointer')
            .on("click", () => {
                const link = `${window.location.pathname}?${this.searchLevel}=${this.searchLevelValue}`;
                window.location = link;
            })
            .append("svg:title")
            .text(() => this.fullName);

        const heatmapG = mainG.append("g")
            .attr("class", "heatmap");

        // heatmap squares
        heatmapG.selectAll()
            .data(coverageData)
            .enter()
            .append("rect")
            .attr("x", d => x(d.bin))
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", d => colorMap(cvgCartoonMap[d.cartoonChar], this.d3InterpolateFunction))

        mainG.append("rect")
            .attr("class", "heatmap-border")
            .attr("width", barWidth)
            .attr("height", barHeight)
            .style("fill", "none")
            .style("stroke", rowBorder.color)
            .style("stroke-width", rowBorder.size);
    }

    addStats() {
        addColumns(this.sequenceG.select("svg"), this.colMap, this.data);
    }
}
