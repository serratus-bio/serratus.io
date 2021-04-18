export type D3InterpolateFunction = (_t: number) => string

export type DrillDownCallback = (_otherId: string) => void

export type ColMap = {
    [_: string]: ColInfo

    score: ColInfo
    percent_identity: ColInfo
    n_reads: ColInfo
}

type ColInfo = {
    name: string
    desc: string
    valueSuffix: string
    size: number
    domain: [number, number]
    fill: string
}

export type MatchCoverageCell = {
    bin: number
    cartoonChar: string
}

export type IChartConfig = {
    chartId: string
    linkSearchLevel: string
    valueKey: string
    linkValueKey: string
    displayValueKey: string
    colMap: ColMap
    d3InterpolateFunction: D3InterpolateFunction
}

export type SequenceChartConfig = IChartConfig & {
    addJbrowseLinks: boolean
}

export type FamilyChartConfig = IChartConfig & {
    drillDownCallback: DrillDownCallback
}
