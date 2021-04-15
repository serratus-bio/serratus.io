import React from 'react'
import * as d3 from 'd3'
import { rowHeight, tableShiftY, drawLegend, addHeaders, addColumns } from './ChartHelpers'
import { D3InterpolateFunction, ColMap } from './types'
import { Match } from '../types'

export class IChart {
    chartId: string
    colMap: ColMap
    viewBoxHeight: number
    viewBoxWidth: number
    d3InterpolateFunction: D3InterpolateFunction
    component: React.ReactElement
    rootSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
    matchesSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
    componentLoaded: boolean

    constructor(
        chartId: string,
        colMap: ColMap,
        viewBoxHeight: number,
        d3InterpolateFunction: D3InterpolateFunction
    ) {
        this.chartId = chartId
        this.colMap = colMap
        this.viewBoxHeight = viewBoxHeight
        this.d3InterpolateFunction = d3InterpolateFunction

        this.component = <div id={this.chartId} />
        this.viewBoxWidth = 750
        this.rootSvg = d3.select('#empty')
        this.matchesSvg = d3.select('#empty')
        this.componentLoaded = false
    }

    clear() {
        this.rootSvg.selectAll('*').remove()
    }

    setLoading() {
        this.clear()
        this.rootSvg
            .append('text')
            .attr('transform', `translate(${this.viewBoxWidth / 2}, ${tableShiftY})`)
            .text('Loading...')
    }

    render(matches: Match[]) {
        if (!this.componentLoaded) {
            this.rootSvg = d3
                .select(`#${this.chartId}`)
                .append('svg')
                .attr('viewBox', `0 0 ${this.viewBoxWidth} ${this.viewBoxHeight}`)
            this.componentLoaded = true
        }
        this.clear()
        this.matchesSvg = this.rootSvg.append('svg').attr('y', tableShiftY)

        drawLegend(this.matchesSvg, this.d3InterpolateFunction)

        const columnHeadersG = this.rootSvg
            .append('g')
            .attr('transform', `translate(0, ${tableShiftY - rowHeight})`)
        addHeaders(columnHeadersG)

        // stats headers, tooltip
        this.rootSvg.append('text').attr('id', 'tooltip')
        addColumns(columnHeadersG, this.colMap)

        this.addMatchRows(matches)
    }

    addMatchRows(_matches: Match[]) {
        if (!this.componentLoaded) throw new Error()
    }
}
