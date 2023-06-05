import React, { LegacyRef } from 'react'
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from 'd3'

// TODO, SEND TO ITS OWN MODULE
// Tableau10 @ https://github.com/d3/d3-scale-chromatic
export const COLOR_SCALE = [
    '#4e79a7',
    '#f28e2c',
    '#e15759',
    '#76b7b2',
    '#59a14f',
    '#edc949',
    '#af7aa1',
    '#ff9da7',
    '#9c755f',
    '#bab0ab',
]

export const HostTaxPlot = ({ taxPlotRunData }: { taxPlotRunData:any }) => {
    const margin = { top: 32, right: 8, bottom: 64, left: 256 }
    const width = 800 - margin.left - margin.right
    const height = 600 - margin.top - margin.bottom

    const divRef = React.useRef();

    React.useEffect(() => {
        if(divRef.current) {
            const svg = select(divRef.current)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

            svg.append('defs')
                .append('pattern')
                .attr('id', `bar-pattern`)
                .attr('height', 4)
                .attr('width', 4)
                .attr('patternUnits', 'userSpaceOnUse')
                .append('rect')
                .attr('height', 2)
                .attr('width', 2)
                .attr('fill', COLOR_SCALE[9])

            const x = scaleLinear().domain([0, taxPlotRunData[0][1]['srarun.run'].length]).range([0, width])

            svg.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(axisBottom(x))
                .selectAll('text')
                .style('font-size', '14px')
                .style('text-anchor', 'middle')

            const y = scaleBand()
                .range([0, height])
                .domain(taxPlotRunData.map((v: any) => v[1]['srarun.scientific_name']))
                .padding(0.1)

            svg.append('g').call(axisLeft(y)).style('font-size', '14px')

            svg.selectAll()
                .data(taxPlotRunData)
                .join('rect')
                .attr('x', x(0))
                .attr('y', (d: any) => (y as any)(d[1]['srarun.scientific_name']))
                .attr('width', (d: any) => (x as any)(d[1]['srarun.run'].length))
                .attr('height', y.bandwidth())
                .attr('fill', (d: any) => d[1].color)
        }
    }, [taxPlotRunData]);

    return <div ref={divRef as LegacyRef<any>}></div>
}
