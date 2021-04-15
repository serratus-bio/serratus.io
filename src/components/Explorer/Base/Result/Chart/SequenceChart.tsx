import { Match } from '../types'
import { IChart } from './IChart'
import { SequenceMatchRow } from './SequenceMatchRow'
import { D3InterpolateFunction, ColMap } from './types'

export class SequenceChart extends IChart {
    addJbrowseLinks: boolean

    constructor(
        chartId: string,
        colMap: ColMap,
        d3InterpolateFunction: D3InterpolateFunction,
        addJbrowseLinks: boolean
    ) {
        const viewBoxHeight = 400
        super(chartId, colMap, viewBoxHeight, d3InterpolateFunction)
        this.addJbrowseLinks = addJbrowseLinks
    }

    addMatchRows(matches: Match[]) {
        const matchesSvg = this.matchesSvg
        if (!matchesSvg) throw new Error()
        matches.forEach((match, i) => {
            const matchRow = new SequenceMatchRow(
                matchesSvg,
                match,
                i,
                this.colMap,
                this.d3InterpolateFunction
            )
            matchRow.addLinkAndHeatmap()
            matchRow.addStats()
            if (this.addJbrowseLinks) {
                matchRow.addJBrowseIcon()
            }
        })
    }
}
