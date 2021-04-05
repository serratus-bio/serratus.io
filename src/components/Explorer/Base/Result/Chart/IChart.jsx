import React from 'react'
import * as d3 from 'd3'
import { rowHeight, tableShiftY, drawLegend, addHeaders, addColumns } from './ChartHelpers'

export class IChart {
    constructor(chartId, colMap, viewBoxHeight, d3InterpolateFunction) {
        this.chartId = chartId
        this.colMap = colMap
        this.viewBoxHeight = viewBoxHeight
        this.d3InterpolateFunction = d3InterpolateFunction

        this.component = <div id={this.chartId} />
        this.rootSvg = null
        this.viewBoxWidth = 750
    }

    componentLoaded() {
        return Boolean(this.rootSvg)
    }

    lazyInit() {
        if (this.rootSvg) return
        this.rootSvg = d3
            .select(`#${this.chartId}`)
            .append('svg')
            .attr('viewBox', `0 0 ${this.viewBoxWidth} ${this.viewBoxHeight}`)
    }

    clearIfInit() {
        if (!this.rootSvg) return
        this.rootSvg.selectAll('*').remove()
    }

    setLoading() {
        this.clearIfInit()
        this.rootSvg
            .append('text')
            .attr('transform', `translate(${this.viewBoxWidth / 2}, ${tableShiftY})`)
            .text('Loading...')
    }

    render(results) {
        this.lazyInit()
        this.clearIfInit()
        this.matchesSvg = this.rootSvg.append('svg').attr('y', tableShiftY)

        drawLegend(this.matchesSvg, this.d3InterpolateFunction)

        const columnHeadersG = this.rootSvg
            .append('g')
            .attr('transform', `translate(0, ${tableShiftY - rowHeight})`)
        addHeaders(columnHeadersG)

        // stats headers, tooltip
        this.rootSvg.append('text').attr('id', 'tooltip')
        addColumns(columnHeadersG, this.colMap)

        this.addRows(results)
    }
}
