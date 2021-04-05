/* eslint-disable no-unused-vars */
import * as d3 from 'd3'

export const cvgCartoonMap = {
    _: 0,
    '.': 1,
    ':': 2,
    u: 4,
    w: 8,
    a: 16,
    o: 32,
    m: 64,
    U: 128,
    W: 256,
    A: 512,
    O: 1024,
    M: 2048,
    '^': 4096,
}

const cvgLims = [0, 4096]

const cvgLength = 25
export const genomeBins = [...Array(cvgLength).keys()]
export function colorMap(value, d3InterpolateFunction) {
    if (value === 0) return 'rgb(255, 255, 255)'
    const defaultColorMap = d3.scaleSequentialSymlog(d3InterpolateFunction).domain(cvgLims)
    return defaultColorMap(value)
}

export const sectionMargin = { top: 2, right: 230, bottom: 2, left: 200 }
export const sectionWidth = 750
export const rowHeight = 20
const headerTextHeight = 25
const tooltipY = 15
export const tableShiftY = headerTextHeight + tooltipY
export const barWidth = sectionWidth - sectionMargin.left - sectionMargin.right
export const barHeight = rowHeight - sectionMargin.top - sectionMargin.bottom

export const barBorder = { size: 1, color: '#999' }
export const caretWidth = 25

function linspace(start, end, n) {
    const out = []
    const delta = (end - start) / (n - 1)
    let i = 0
    while (i < n - 1) {
        out.push(start + i * delta)
        i++
    }
    out.push(end)
    return out
}

// adapted from https://bl.ocks.org/starcalibre/6cccfa843ed254aa0a0d
export function drawLegend(svgElement, d3InterpolateFunction) {
    const legendWidth = 80,
        legendHeight = 200,
        margin = { top: 10, right: 60, bottom: 10, left: 2 }

    const legendSvg = svgElement
        .append('svg')
        .attr('width', legendWidth)
        .attr('height', legendHeight)

    const gradient = legendSvg
        .append('defs')
        .append('linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%') // bottom
        .attr('y1', '100%')
        .attr('x2', '0%') // to top
        .attr('y2', '0%')
        .attr('spreadMethod', 'pad')

    const colorScale = Object.values(cvgCartoonMap).map((value) =>
        colorMap(value, d3InterpolateFunction)
    )

    const pct = linspace(0, 100, colorScale.length).map(function (d) {
        return Math.round(d) + '%'
    })

    const colourPct = d3.zip(pct, colorScale)
    colourPct.forEach(function (d) {
        gradient
            .append('stop')
            .attr('offset', d[0])
            .attr('stop-color', d[1])
            .attr('stop-opacity', 1)
    })

    legendSvg
        .append('rect')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('width', legendWidth - margin.left - margin.right)
        .attr('height', legendHeight - margin.top - margin.bottom)
        .style('fill', 'url(#gradient)')
        .attr('transform', `translate(1, ${margin.top})`)
        .style('stroke', 'black')
        .style('stroke-width', 1)

    // create a scale and axis for the legend
    const legendScale = d3
        .scaleLinear()
        .domain(cvgLims)
        .range([legendHeight - margin.top - margin.bottom, 0])
    const legendAxis = legendSvg
        .append('g')
        .attr(
            'transform',
            `translate(${legendWidth - margin.left - margin.right}, ${margin.top - 0.5})`
        )
        .call(d3.axisRight(legendScale))
}

// TODO: combine with addColumns
export function addHeaders(gElement) {
    const yShift = 15

    let colText = 'Count'
    let xShift = 45
    const textG = gElement.append('g')
    let text = textG
        .append('text')
        .text(colText)
        .style('text-anchor', 'end')
        .attr('transform', `translate(${xShift}, ${yShift})`)

    colText = 'Match'
    xShift = sectionMargin.left - caretWidth
    text = textG
        .append('text')
        .text(colText)
        .style('text-anchor', 'end')
        .attr('transform', `translate(${xShift}, ${yShift})`)

    colText = 'Coverage Heatmap'
    xShift = sectionMargin.left + barWidth / 2
    text = textG
        .append('text')
        .text(colText)
        .style('text-anchor', 'middle')
        .attr('transform', `translate(${xShift}, ${yShift})`)
}

export function addColumns(gElement, colMap, summaryEntry = null) {
    const yShift = 15
    const colHeight = rowHeight
    const textG = gElement
        .append('g')
        .attr('transform', `translate(${sectionMargin.left + barWidth + 10}, ${yShift})`)
    let prevWidth = 0
    Object.keys(colMap).forEach((column) => {
        const colAttrs = colMap[column]
        const colWidth = colAttrs['size']
        const colText = summaryEntry ? summaryEntry[column] : colAttrs['name']
        const cellG = textG.append('g')
        const text = textG
            .append('text')
            .text(colText)
            .style('text-anchor', 'middle')
            .attr('x', prevWidth + colWidth / 2)
        if (summaryEntry) {
            text.text(colText + colAttrs.valueSuffix)
                .style('opacity', 0)
                .attr('column', column)
                .style('font-size', 12)
            const diff = parseInt(colText) - colAttrs['domain'][0]
            const diffCapped = Math.min(diff, colAttrs['domain'][1])
            const range = colAttrs['domain'][1] - colAttrs['domain'][0]
            const colorBarWidth = Math.max(0, (colWidth * diffCapped) / range)
            const colorBar = cellG
                .append('rect')
                .attr('fill', colAttrs['fill'])
                .attr('width', colorBarWidth)
                .attr('height', colHeight)
                .attr('x', prevWidth)
                .attr('y', -yShift)
            const border = cellG
                .append('rect')
                .attr('fill', 'none')
                .style('stroke', 'black')
                .style('stroke-width', 1)
                .attr('width', colWidth)
                .attr('height', colHeight)
                .attr('x', prevWidth)
                .attr('y', -yShift)
        }
        const tooltipFontSize = 10
        const tooltipX = sectionMargin.left + barWidth + prevWidth + colWidth / 2
        const hoverForColumnText = textG
            .append('rect')
            .attr('width', colWidth)
            .attr('height', colHeight)
            .attr('x', prevWidth)
            .attr('y', -yShift)
            .style('opacity', 0)
            .on('mouseover', () => {
                d3.selectAll(`[column="${column}"]`).style('opacity', 1)
                d3.select('#tooltip')
                    .text(colAttrs['desc'])
                    .attr('font-size', tooltipFontSize)
                    .attr('x', tooltipX)
                    .attr('y', tooltipY)
                    .style('text-anchor', 'middle')
                    .style('opacity', 1)
            })
            .on('mouseout', () => {
                d3.selectAll(`[column="${column}"]`).style('opacity', 0)
                d3.select('#tooltip').style('opacity', 0)
            })

        prevWidth += colWidth
    })
}

export function getCoverageData(match, cvgKey = 'coverage_bins') {
    const matchCoverageData = []
    ;[...match[cvgKey]].forEach(function (bit, i) {
        matchCoverageData.push({
            bin: i,
            cartoonChar: bit,
        })
    })
    return matchCoverageData
}
