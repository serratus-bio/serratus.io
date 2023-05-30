import React, { LegacyRef } from 'react'
import { Helmet } from 'react-helmet'
import { RunData } from './types'
// import { helpIcon } from 'common'
import { fetchPagedHostMatches } from 'components/Explorer/Base/Result/SerratusApiCalls'
import { LoadIcon } from 'common/LoadIcon'
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from 'd3'
import { HostTaxIdResult } from './HostTaxIdResult'

type Props = {
    runIds?: string[]
    isEmbedded?: boolean
}

// Tableau10 @ https://github.com/d3/d3-scale-chromatic
const COLOR_SCALE = [
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

export const Host = ({ runIds, isEmbedded = false }: Props) => {
    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [runData, setRunData] = React.useState<RunData[]>([])
    const hostBarPlotLegendRef = React.useRef()

    React.useEffect(() => {
        setIsFetching(true)
        ;(async () => {
            const perPage = 20000
            const page = 1
            const searchType = 'rdrp'

            const { result } = await fetchPagedHostMatches(searchType, page, perPage, runIds)

            setRunData(result as RunData[])

            setIsFetching(false)
        })()
    }, [runIds])

    const runDataGroup = runData.reduce((a: any, b) => {
        if (!a[b['srarun.tax_id']])
            a[b['srarun.tax_id']] = {
                'srarun.run': [],
                'srarun.scientific_name': b['srarun.scientific_name']
                    .split(/\s+/)
                    .map((v) => v[0].toUpperCase() + v.substring(1).toLowerCase())
                    .join(' '),
                'tax_lineage.tax_phylum': b['tax_lineage.tax_phylum'],
                'tax_lineage.tax_order': b['tax_lineage.tax_order'],
            }

        a[b['srarun.tax_id']]['srarun.run'].push(b['srarun.run'])

        return a
    }, {})

    const runDataGroupEntries: any = Object.entries(runDataGroup).sort((a: any, b: any) =>
        a[1]['srarun.run'].length != b[1]['srarun.run'].length
            ? b[1]['srarun.run'].length - a[1]['srarun.run'].length
            : a[1]['srarun.tax_id'] - b[1]['srarun.tax_id']
    )

    React.useEffect(() => {
        document.querySelectorAll('#hostBarPlot > svg').forEach((svg) => svg.remove())

        if (runDataGroupEntries.length) {
            const orderList = Array.from(
                new Set(
                    runDataGroupEntries
                        .slice(0, 32)
                        .map((v: any) => v[1]['tax_lineage.tax_order'])
                        .filter((v: any) => !!v)
                )
            )

            const data = runDataGroupEntries.slice(0, 32).map((v: any) => {
                if (/metagenome/i.test(v[1]['srarun.scientific_name'])) v[1].color = COLOR_SCALE[8]
                else if (orderList.indexOf(v[1]['tax_lineage.tax_order']) !== -1)
                    v[1].color =
                        COLOR_SCALE[
                            orderList.indexOf(v[1]['tax_lineage.tax_order']) % COLOR_SCALE.length
                        ]
                else v[1].color = "url('#bar-pattern')"

                return v
            })

            const margin = { top: 32, right: 8, bottom: 64, left: 256 }
            const width = 800 - margin.left - margin.right
            const height = 600 - margin.top - margin.bottom

            const svg = select('#hostBarPlot')
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

            const x = scaleLinear().domain([0, data[0][1]['srarun.run'].length]).range([0, width])

            svg.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(axisBottom(x))
                .selectAll('text')
                .style('font-size', '14px')
                .style('text-anchor', 'middle')

            const y = scaleBand()
                .range([0, height])
                .domain(data.map((v: any) => v[1]['srarun.scientific_name']))
                .padding(0.1)

            svg.append('g').call(axisLeft(y)).style('font-size', '14px')

            svg.selectAll()
                .data(data)
                .join('rect')
                .attr('x', x(0))
                .attr('y', (d: any) => (y as any)(d[1]['srarun.scientific_name']))
                .attr('width', (d: any) => (x as any)(d[1]['srarun.run'].length))
                .attr('height', y.bandwidth())
                .attr('fill', (d: any) => d[1].color)

            if (hostBarPlotLegendRef.current) {
                while ((hostBarPlotLegendRef.current as any).childNodes.length)
                    (hostBarPlotLegendRef.current as any).childNodes[0].remove()

                // THIS SHOULD BE JSX ...
                const legend = (hostBarPlotLegendRef.current as any).appendChild(
                    document.createElement('div')
                )
                legend.style.display = 'flex'
                legend.style.flexWrap = 'wrap'
                legend.style.gap = '16px'

                orderList.forEach((v, i) => {
                    const legendItem = legend.appendChild(document.createElement('div'))
                    legendItem.style.whiteSpace = 'nowrap'

                    const legendItemBullet = legendItem.appendChild(document.createElement('span'))
                    legendItemBullet.style.backgroundColor = COLOR_SCALE[i % COLOR_SCALE.length]
                    legendItemBullet.style.display = 'inline-block'
                    legendItemBullet.style.height = '16px'
                    legendItemBullet.style.verticalAlign = 'top'
                    legendItemBullet.style.width = '8px'

                    const legendItemText = legendItem.appendChild(document.createElement('span'))
                    legendItemText.innerHTML = v
                    legendItemText.style.bottom = '4px'
                    legendItemText.style.margin = '0 0 0 4px'
                    legendItemText.style.position = 'relative'
                    legendItemText.style.verticalAlign = 'top'
                })
            }
        }
    }, [runDataGroupEntries])

    return (
        <div className='mx-14 my-2'>
            {isEmbedded ? null : (
                <>
                    <Helmet>
                        <title>Serratus | RNA Virome Targets</title>
                    </Helmet>
                    <div className='text-center text-xl my-4'>RNA Virome Targets</div>
                </>
            )}
            {!runData.length || isFetching ? (
                <LoadIcon />
            ) : (
                <>
                    <div className='my-4'>
                        <div className='w-full text-center'>
                            <div className='text-xl font-bold'>RNA Virome Targets</div>
                        </div>
                    </div>
                    <div className='my-4'>
                        <div className='w-full text-center' id='hostBarPlot'></div>
                        <div
                            className='w-full text-center'
                            ref={hostBarPlotLegendRef as LegacyRef<any>}></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {runDataGroupEntries.map((entry: any, entry_i: any) => {
                            return (
                                <div key={entry_i}>
                                    <HostTaxIdResult entry={entry} />
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}
