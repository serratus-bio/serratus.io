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

        this.mainSvg = this.sequenceG.append("svg")
            .attr("y", this.rowIndex * rowHeight)
            .attr("width", rowWidth)
            .attr("height", rowHeight)
            .attr("border", rowBorder.size)
            .style("display", "block")

        const mainG = this.mainSvg.append("g")
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
        addColumns(this.mainSvg, this.colMap, this.data);
    }

    addJBrowseIcon() {
        const image = '/atcg.png'
        const link = `jbrowse?bam=${this.data.run_id}&loc=${this.searchLevelValue}`;
        const iconWidth = 15;
        const iconHeight = 15;
        const xShift = 725;  // TODO: compute from colMap
        const yShift = (rowHeight - iconHeight) / 2;
        this.mainSvg.append("image")
            .attr('xlink:href', image)
            .attr('width', iconWidth)
            .attr('height', iconHeight)
            .attr("transform",
                `translate(${xShift}, ${yShift})`)
            .style("fill", "blue")
            .style('cursor', 'pointer');
        this.mainSvg.append("a")
            .attr("xlink:href", link)
            .append("rect")
            .attr('width', iconWidth)
            .attr('height', iconHeight)
            .attr("transform",
                `translate(${xShift}, ${yShift})`)
            .style("opacity", 0);
    }
}
