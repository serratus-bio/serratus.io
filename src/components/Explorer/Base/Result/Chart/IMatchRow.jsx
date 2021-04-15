import * as d3 from 'd3'
import {
    cvgCartoonMap,
    genomeBins,
    colorMap,
    sectionMargin,
    sectionWidth as rowWidth,
    rowHeight as rowHeight,
    barWidth,
    barHeight,
    barBorder as rowBorder,
    addColumns,
    getCoverageData,
} from './ChartHelpers'

const coverageKey = 'coverage_bins'

export class IMatchRow {
    constructor(
        searchLevel,
        valueKey,
        linkValueKey,
        displayValueKey,
        rootSvg,
        data,
        rowIndex,
        colMap,
        d3InterpolateFunction
    ) {
        this.data = data
        this.rowIndex = rowIndex
        this.colMap = colMap
        this.d3InterpolateFunction = d3InterpolateFunction

        this.searchLevel = searchLevel
        this.value = this.data[valueKey]
        this.linkValue = this.data[linkValueKey]
        this.fullName = this.data[displayValueKey]
        this.matchG = rootSvg.append('g').attr('class', this.searchLevel).attr('row-id', this.value)
        this.setDisplayName()
    }

    setDisplayName() {
        this.displayName = this.fullName
        const maxLength = 18
        if (this.displayName.length > maxLength) {
            this.displayName = this.displayName.slice(0, maxLength) + '...'
        }
    }

    addLinkAndHeatmap() {
        const coverageData = getCoverageData(this.data, coverageKey)

        this.mainSvg = this.matchG
            .append('svg')
            .attr('y', this.rowIndex * rowHeight)
            .attr('width', rowWidth)
            .attr('height', rowHeight)
            .attr('border', rowBorder.size)
            .style('display', 'block')

        const mainG = this.mainSvg
            .append('g')
            .attr('transform', `translate(${sectionMargin.left}, ${sectionMargin.top})`)

        const x = d3.scaleBand().range([0, barWidth]).domain(genomeBins).padding(0.01)
        const y = d3.scaleBand().range([0, barHeight]).domain([this.displayName]).padding(0.01)
        const yAxis = mainG.append('g').call(d3.axisLeft(y))
        yAxis.select('path').remove()
        yAxis.select('line').remove()
        yAxis
            .selectAll('text')
            .style('font-size', 12)
            .style('fill', 'blue')
            .style('cursor', 'pointer')
            .on('click', () => {
                const link = `${window.location.pathname}?${this.searchLevel}=${this.linkValue}`
                window.location = link
            })
            .append('svg:title')
            .text(this.fullName)

        const heatmapG = mainG.append('g').attr('class', 'heatmap')

        // heatmap squares
        heatmapG
            .selectAll()
            .data(coverageData)
            .enter()
            .append('rect')
            .attr('x', (d) => x(d.bin))
            .attr('width', x.bandwidth())
            .attr('height', y.bandwidth())
            .style('fill', (d) =>
                colorMap(cvgCartoonMap[d.cartoonChar], this.d3InterpolateFunction)
            )

        mainG
            .append('rect')
            .attr('class', 'heatmap-border')
            .attr('width', barWidth)
            .attr('height', barHeight)
            .style('fill', 'none')
            .style('stroke', rowBorder.color)
            .style('stroke-width', rowBorder.size)

        if (this.drilldownCallback) {
            mainG
                .append('rect')
                .attr('class', 'heatmap-click')
                .attr('visibility', 'visible')
                .attr('width', barWidth)
                .attr('height', barHeight)
                .style('opacity', 0)
                .style('cursor', 'pointer')
                .on('click', () => this.drilldownCallback(this.value))
        }
    }

    addStats() {
        addColumns(this.mainSvg, this.colMap, this.data)
    }

    addJBrowseIcon() {
        const image = '/atcg.png'
        const link = `jbrowse?bam=${this.data.run_id}&loc=${this.value}`
        const iconWidth = 15
        const iconHeight = 15
        const xShift = 725 // TODO: compute from colMap
        const yShift = (rowHeight - iconHeight) / 2
        this.mainSvg
            .append('image')
            .attr('href', image)
            .attr('width', iconWidth)
            .attr('height', iconHeight)
            .attr('transform', `translate(${xShift}, ${yShift})`)
            .style('fill', 'blue')
            .style('cursor', 'pointer')
        this.mainSvg
            .append('a')
            .attr('href', link)
            .attr('target', '_blank')
            .append('rect')
            .attr('width', iconWidth)
            .attr('height', iconHeight)
            .attr('transform', `translate(${xShift}, ${yShift})`)
            .style('opacity', 0)
    }
}
