import React from 'react'
import {
    axisBottom,
    axisLeft,
    max,
    scaleBand,
    scaleLinear,
    scaleSequential,
    select,
    stack,
    stackOrderReverse,
} from 'd3'

const chartId = 'chart'

let _onFilterAndSetStackData = undefined

export const CountChart = ({ onFilterAndSetStackData }) => {
    if (onFilterAndSetStackData) _onFilterAndSetStackData = onFilterAndSetStackData

    return <div id={chartId} />
}

// D3 CODE BELOW

// data-specific
const xColumn = 'percent_identity'
const yColumn = 'count'
const zColumn = 'score'
const xLabel = '% Identity'
const yLabel = 'Matches'

// initial value determined by renderChart, then updated by functions
let xLims
let zLims
let familyData

// auto-computed
let yLims = [0, 0] // computed after family data loaded
let xLimValues // all x values
let zDomainValues // all possible z values

// D3 objects
let xScale
let yScale
let xAxis
let yAxis
let dataByZStackFiltered
let chartZRects

export const renderChart = (data, xDomain, zDomain, d3InterpolateFunction) => {
    setXLims(xDomain)
    zLims = zDomain
    zDomainValues = getAllValues(...zDomain)

    const chartWidth = 300
    const chartHeight = 150
    const margin = { top: 10, right: 10, bottom: 33, left: 60 }
    const svgWidth = chartWidth + margin.left + margin.right
    const svgHeight = chartHeight + margin.top + margin.bottom

    const mainDiv = select(`#${chartId}`)
    const mainSvg = mainDiv.append('svg').attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
    const chartG = mainSvg
        .append('g')
        .attr('width', chartWidth)
        .attr('height', chartHeight)
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    xScale = scaleBand().range([0, chartWidth])
    xScale.domain(xLimValues)
    yScale = scaleLinear().range([chartHeight, 0])
    yScale.domain(yLims).nice()
    const colorScale = scaleSequential(d3InterpolateFunction)
    colorScale.domain(zDomain)

    xAxis = chartG
        .append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .attr('class', 'x-axis')
    xAxis.call(axisBottom(xScale).tickValues(getXTicks()))
    yAxis = chartG.append('g').attr('class', 'y-axis')

    chartG
        .append('text')
        .attr('y', chartHeight + margin.bottom - 3)
        .attr('x', chartWidth / 2)
        .attr('font-size', '12px')
        .attr('fill', 'currentColor')
        .style('text-anchor', 'middle')
        .attr('opacity', 1)
        .text(xLabel)
    chartG
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -(margin.left - 15))
        .attr('x', -chartHeight / 2)
        .attr('font-size', '12px')
        .attr('fill', 'currentColor')
        .style('text-anchor', 'middle')
        .attr('opacity', 1)
        .text(yLabel)

    updateData(data)

    const rectsG = chartG.append('g').attr('label', 'stack-rects')

    chartZRects = rectsG
        .selectAll('g')
        .data(dataByZStackFiltered)
        .enter()
        .append('g')
        .attr('label', (d) => `z-${d.key}`)
        .attr('fill', (d) => colorScale(d.key))
        .attr('stroke', (d) => colorScale(d.key))
        .attr('stroke-width', '0.1')

    chartZRects
        .selectAll('rect')
        .data((d) => d)
        .join('rect')
        .attr('label', (d) => `x-${d.data.key}`)
        .attr('x', (d) => xScale(d.data.key))
        .attr('y', (d) => yScale(d[1]))
        .attr('height', (d) => yScale(d[0]) - yScale(d[1]))
        .attr('width', xScale.bandwidth())
}

export const updateData = (data) => {
    familyData = data
    filterAndSetStackData()
}

export const updateXLims = (begin, end) => {
    if (xLims[0] === begin && xLims[1] === end) {
        return
    }
    setXLims([begin, end])
    xScale.domain(xLimValues)
    xAxis.call(axisBottom(xScale).tickValues(getXTicks()))
    updateStacks()
}

export const updateZLims = (begin, end) => {
    if (zLims[0] === begin && zLims[1] === end) {
        return
    }
    zLims = [begin, end]
    updateStacks()
}

export const updateYLims = (transitionDuration = 0) => {
    let maxDataY =
        1.2 *
        max(
            dataByZStackFiltered.map((d) => {
                return max(d, (innerD) => {
                    return innerD[1]
                })
            })
        )
    if (isNaN(maxDataY) || maxDataY < 10) maxDataY = 10 // set min upper limit of 10
    yLims = [0, maxDataY]
    yScale.domain(yLims).nice()
    yAxis.transition().duration(transitionDuration).call(axisLeft(yScale).ticks(5))
    updateStacks(transitionDuration)
}

const updateStacks = (transitionDuration = 0) => {
    filterAndSetStackData()
    chartZRects.data(dataByZStackFiltered)
    chartZRects
        .selectAll('rect')
        .data((d) => d)
        .transition()
        .duration(transitionDuration)
        .attr('x', (d) => xScale(d.data.key))
        .attr('y', (d) => yScale(d[1]))
        .attr('height', (d) => yScale(d[0]) - yScale(d[1]))
        .attr('width', xScale.bandwidth())
}

const filterAndSetStackData = () => {
    const dataFiltered = familyData.filter((d) => {
        return (
            d[xColumn] >= xLims[0] &&
            d[xColumn] <= xLims[1] &&
            d[zColumn] >= zLims[0] &&
            d[zColumn] <= zLims[1]
        )
    })
    const dataByX = Object.entries(
        dataFiltered.reduce((a, b) => {
            if (!a[b[xColumn]]) a[b[xColumn]] = { key: xColumn, values: [] }
            a[b[xColumn]].values.push(b)

            return a
        }, {})
    ).map((v) => ({ key: v[0], values: v[1].values }))
    // make entry for each x
    const xKeys = dataByX.reduce((set, d) => {
        set.add(d.key)
        return set
    }, new Set())
    xLimValues.forEach((xVal) => {
        const xValString = xVal.toString()
        if (!xKeys.has(xValString)) {
            dataByX.push({ key: xValString, values: [] })
        }
    })
    // make entry for each z
    dataByX.forEach((d) => {
        d.values = d.values.reduce((collection, d) => {
            collection[d[zColumn]] = d[yColumn]
            return collection
        }, {})
        d.ZtoY = {}
        zDomainValues.forEach((z) => {
            d.ZtoY[z] = d.values[z] ? d.values[z] : 0
        })
    })
    dataByZStackFiltered = stack()
        .keys(zDomainValues)
        .order(stackOrderReverse)
        .value((d, key) => d.ZtoY[key])(dataByX)

    _onFilterAndSetStackData &&
        _onFilterAndSetStackData({ matchN: dataFiltered.reduce((a, b) => a + b.count, 0) })
}

const getAllValues = (begin, end) => {
    return Array(end - begin + 1)
        .fill(begin)
        .map((x, y) => x + y)
}

const setXLims = (newXLims) => {
    xLims = newXLims
    xLimValues = getAllValues(...newXLims)
}

const getXTicks = () => {
    if (xLimValues.length < 10) {
        return xLimValues
    }
    return xLimValues.filter((d, i) => {
        if ((xLimValues[0] + i) % 5 === 0) {
            return true
        }
        return false
    })
}
