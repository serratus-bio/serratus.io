import { MatchResult } from '../types'
import { IChart } from './IChart'
import { SequenceMatch } from './SequenceMatch'
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

    addRows(matchObjects: MatchResult[]) {
        matchObjects.forEach((matchObject, i) => {
            const match = new SequenceMatch(
                this.matchesSvg,
                matchObject,
                i,
                this.colMap,
                this.d3InterpolateFunction
            )
            match.addLinkAndHeatmap()
            match.addStats()
            if (this.addJbrowseLinks) {
                match.addJBrowseIcon()
            }
        })
    }
}
