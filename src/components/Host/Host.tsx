import React, { LegacyRef } from 'react'
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
    const [taxPlotData, setTaxPlotData] = React.useState({})
    const [taxPlotWidthHeight, setTaxPlotWidthHeight] = React.useState([800, 600])
    const hostBarPlotLegendRef = React.useRef()
    const taxPlotContainerRef = React.useRef()
    const taxPlotContainerRefCallback = React.useCallback((node: any) => {
        const onWindowResize = () => {
            if (taxPlotContainerRef.current)
                setTaxPlotWidthHeight([(taxPlotContainerRef.current as any).offsetWidth, 600])
        }

        if (taxPlotContainerRef.current) window.removeEventListener('resize', onWindowResize)

        taxPlotContainerRef.current = node
        if (taxPlotContainerRef.current) {
            window.addEventListener('resize', onWindowResize)

            onWindowResize()
        }
    }, [])

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

            const runData = runDataGroupEntries.slice(0, 32).map((v: any) => {
                if (/metagenome/i.test(v[1]['srarun.scientific_name'])) v[1].color = COLOR_SCALE[8]
                else if (orderList.indexOf(v[1]['tax_lineage.tax_order']) !== -1)
                    v[1].color =
                        COLOR_SCALE[
                            orderList.indexOf(v[1]['tax_lineage.tax_order']) % COLOR_SCALE.length
                        ]
                else v[1].color = "url('#bar-pattern')"

                return v
            })

            setTaxPlotData({ orderList, runData })
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
                        <div className='w-full text-center' ref={taxPlotContainerRefCallback}>
                            <HostTaxPlot
                                taxPlotData={taxPlotData}
                                taxPlotWidthHeight={taxPlotWidthHeight}
                            />
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
