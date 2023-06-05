import React, { LegacyRef } from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import { RunData } from './types'
// import { helpIcon } from 'common'
import { fetchPagedHostMatches } from 'components/Explorer/Base/Result/SerratusApiCalls'
import { LoadIcon } from 'common/LoadIcon'
import { HostTaxIdResult } from './HostTaxIdResult'
import { COLOR_SCALE, HostTaxPlot } from './HostTaxPlot'

type Props = {
    runIds?: string[]
    isEmbedded?: boolean
}

export const Host = ({ runIds, isEmbedded = false }: Props) => {
    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [runData, setRunData] = React.useState<RunData[]>([])
    const [taxPlotRunData, setTaxPlotRunData] = React.useState([])
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

            setTaxPlotRunData(data)

            // X vvvv
            if (hostBarPlotLegendRef.current)
                ReactDOM.render(
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {orderList.map((v: any, i: number) => {
                            return (
                                <div key={i} style={{ whiteSpace: 'nowrap' }}>
                                    <span
                                        style={{
                                            backgroundColor: COLOR_SCALE[i % COLOR_SCALE.length],
                                            display: 'inline-block',
                                            height: '16px',
                                            verticalAlign: 'top',
                                            width: '8px',
                                        }}></span>
                                    <span
                                        style={{
                                            bottom: '4px',
                                            margin: '0 0 0 4px',
                                            position: 'relative',
                                            verticalAlign: 'top',
                                        }}>
                                        {v}
                                    </span>
                                </div>
                            )
                        })}
                    </div>,
                    hostBarPlotLegendRef.current
                )
        }
    }, [runData])

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
                        {/* <div className='w-full text-center' id='hostBarPlot'></div> */}
                        <div className='w-full text-center'>
                            <HostTaxPlot taxPlotRunData={taxPlotRunData} />
                        </div>
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
