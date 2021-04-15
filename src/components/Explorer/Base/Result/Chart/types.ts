export type D3InterpolateFunction = (_t: number) => string

export type DrilldownCallback = (_familyId: string) => void

export type ColMap = {
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
