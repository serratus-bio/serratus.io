/* eslint-disable no-unused-vars */
import React from 'react'
import * as d3 from 'd3'

import {
    cvgCartoonMap,
    genomeBins,
    colorMap,
    sectionMargin,
    sectionWidth,
    sectionHeight,
    tableShiftY,
    barWidth,
    barHeight,
    barBorder,
    drawLegend,
    addHeaders,
    addColumns,
    getCoverageData,
} from '../Chart/ChartHelpers'

const chartId = 'matching-runs-chart'

const sraKey = 'run_id'

const Chart = () => {
    return <div id={chartId} />
}

export default Chart

export const renderChart = (results, colMap, d3InterpolateFunction) => {
    var chartSvg = d3
        .select(`#${chartId}`)
        .append('svg')
        .attr('viewBox', `0 0 750 500`)
    var matchSvg = chartSvg.append('svg').attr('y', tableShiftY)

    drawLegend(matchSvg, d3InterpolateFunction)

    var columnTooltipSvgText = chartSvg.append('text').attr('id', 'tooltip')
    var columnHeadersG = chartSvg
        .append('g')
        .attr('transform', `translate(0, ${tableShiftY - sectionHeight})`)
    addHeaders(columnHeadersG)
    addColumns(columnHeadersG, colMap)

    results.forEach((match, i) => {
        var coverageData = getCoverageData(match)
        var matchG = matchSvg
            .append('g')
            .attr('class', 'sra')
            .attr('rowid', `${match[sraKey]}`)
        var matchSubGroup = drawExpandableRow(
            matchG,
            match[sraKey],
            coverageData,
            i,
            d3InterpolateFunction
        )
        addColumns(matchG.select('svg'), colMap, match)
    })
}

function drawExpandableRow(
    gElement,
    name,
    heatSquareData,
    rowIndex,
    d3InterpolateFunction
) {
    var entrySvg = gElement
        .append('svg')
        .attr('y', rowIndex * sectionHeight)
        .attr('width', sectionWidth)
        .attr('height', sectionHeight)
        .attr('border', barBorder.size)
        .style('display', 'block')

    var entryG = entrySvg
        .append('g')
        .attr(
            'transform',
            `translate(${sectionMargin.left}, ${sectionMargin.top})`
        )

    var x = d3.scaleBand().range([0, barWidth]).domain(genomeBins).padding(0.01)

    var y = d3.scaleBand().range([0, barHeight]).domain([name]).padding(0.01)
    var yAxis = entryG.append('g').call(d3.axisLeft(y))
    yAxis.select('path').remove()
    yAxis.select('line').remove()
    yAxis
        .selectAll('text')
        .style('font-size', 12)
        .style('fill', 'blue')
        .style('cursor', 'pointer')
        .each(function (d, i) {
            var link = `${window.location.pathname}?run=${name}`
            var offsetX = 0
            var textWidth = 80
            var textHeight = 14
            d3.select(this.parentNode)
                .append('a')
                .attr('href', link)
                .append('rect')
                .attr('x', offsetX - textWidth)
                .attr('y', -8)
                .attr('width', textWidth)
                .attr('height', textHeight)
                .attr('fill', 'black')
                .style('opacity', 0)
        })

    var heatBar = entryG.append('g').attr('class', 'heatbar')

    var heatSquares = heatBar
        .selectAll()
        .data(heatSquareData)
        .enter()
        .append('rect')
        .attr('x', (d) => x(d.bin))
        .attr('width', x.bandwidth())
        .attr('height', y.bandwidth())
        .style('fill', (d) =>
            colorMap(cvgCartoonMap[d.cartoonChar], d3InterpolateFunction)
        )

    var barBorderPath = entryG
        .append('rect')
        .attr('width', barWidth)
        .attr('height', barHeight)
        .style('fill', 'none')
        .style('stroke', barBorder.color)
        .style('stroke-width', barBorder.size)

    var heatmapCover = entryG
        .append('rect')
        .attr('width', barWidth)
        .attr('height', barHeight)
        .attr('class', 'heatmap-cover')
        .style('opacity', 0)
        .style('fill', '#000')
}
