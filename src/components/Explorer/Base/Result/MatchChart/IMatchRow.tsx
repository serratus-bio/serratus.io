import * as d3 from 'd3'
import { Match } from '../types'
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
} from './_helpers'
import {
    ColMap,
    D3InterpolateFunction,
    DrillDownCallback,
    IMatchChartConfig,
    MatchCoverageCell,
} from './types'

const coverageKey = 'coverage_bins'

export class IMatchRow {
    data: Match
    colMap: ColMap
    linkSearchLevel: string
    value: string
    linkValue: string
    fullName: string
    displayName: string
    matchG: d3.Selection<SVGGElement, unknown, HTMLElement, any>
    mainSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
    d3InterpolateFunction: D3InterpolateFunction
    drillDownCallback?: DrillDownCallback

    constructor(
        chartConfig: IMatchChartConfig,
        rootSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
        data: Match,
        rowIndex: number
    ) {
        this.data = data
        this.colMap = chartConfig.colMap
        this.d3InterpolateFunction = chartConfig.d3InterpolateFunction

        this.linkSearchLevel = chartConfig.linkSearchLevel
        this.value = this.data[chartConfig.valueKey]
        this.linkValue = this.data[chartConfig.linkValueKey]
        this.fullName = this.data[chartConfig.displayValueKey]
        this.displayName = this.fullName
        this.setDisplayName()
        this.matchG = rootSvg
            .append('g')
            .attr('class', this.linkSearchLevel)
            .attr('row-id', this.value)
        this.mainSvg = this.matchG
            .append('svg')
            .attr('y', rowIndex * rowHeight)
            .attr('width', rowWidth)
            .attr('height', rowHeight)
            .attr('border', rowBorder.size)
            .style('display', 'block')
    }

    setDisplayName() {
        const maxLength = 18
        if (this.displayName.length > maxLength) {
            this.displayName = this.displayName.slice(0, maxLength) + '...'
        }
    }

    addLinkAndHeatmap() {
        const coverageData = getCoverageData(this.data, coverageKey)

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
                const link = `${window.location.pathname}?${this.linkSearchLevel}=${this.linkValue}`
                window.location.href = link
            })
            .append('svg:title')
            .text(this.fullName)

        const heatmapG = mainG.append('g').attr('class', 'heatmap')

        // heatmap cells
        heatmapG
            .selectAll()
            .data(coverageData)
            .enter()
            .append('rect')
            .attr('x', (d: MatchCoverageCell) => x(d.bin.toString()) as number)
            .attr('width', x.bandwidth())
            .attr('height', y.bandwidth())
            .style('fill', (d: MatchCoverageCell) =>
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

        const callback = this.drillDownCallback
        if (callback) {
            mainG
                .append('rect')
                .attr('class', 'heatmap-click')
                .attr('visibility', 'visible')
                .attr('width', barWidth)
                .attr('height', barHeight)
                .style('opacity', 0)
                .style('cursor', 'pointer')
                .on('click', () => callback(this.value))
        }
    }

    addStats() {
        const statsG = this.mainSvg.append('g')
        addColumns(statsG, this.colMap, this.data)
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
