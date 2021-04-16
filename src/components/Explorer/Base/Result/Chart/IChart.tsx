import React from 'react'
import * as d3 from 'd3'
import { rowHeight, tableShiftY, drawLegend, addHeaders, addColumns } from './ChartHelpers'
import { IChartConfig } from './types'
import { Match } from '../types'

export class IChart {
    config: IChartConfig
    viewBoxHeight: number
    viewBoxWidth: number
    component: React.ReactElement
    rootSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
    matchesSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
    componentLoaded: boolean

    constructor(config: IChartConfig, viewBoxHeight: number) {
        this.config = config
        this.viewBoxHeight = viewBoxHeight

        this.component = <div id={this.config.chartId} />
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
                .select(`#${this.config.chartId}`)
                .append('svg')
                .attr('viewBox', `0 0 ${this.viewBoxWidth} ${this.viewBoxHeight}`)
            this.componentLoaded = true
        }
        this.clear()
        this.matchesSvg = this.rootSvg.append('svg').attr('y', tableShiftY)

        drawLegend(this.matchesSvg, this.config.d3InterpolateFunction)

        const columnHeadersG = this.rootSvg
            .append('g')
            .attr('transform', `translate(0, ${tableShiftY - rowHeight})`)
        addHeaders(columnHeadersG)

        // stats headers, tooltip
        this.rootSvg.append('text').attr('id', 'tooltip')
        addColumns(columnHeadersG, this.config.colMap)

        this.addMatchRows(matches)
    }

    addMatchRows(_matches: Match[]) {
        if (!this.componentLoaded) throw new Error()
    }
}
