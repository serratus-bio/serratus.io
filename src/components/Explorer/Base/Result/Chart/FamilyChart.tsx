import { Match } from '../types'
import { IChart } from './IChart'
import { FamilyMatchRow } from './FamilyMatchRow'
import { D3InterpolateFunction, DrilldownCallback, ColMap } from './types'

export class FamilyChart extends IChart {
    drilldownCallback: DrilldownCallback

    constructor(
        chartId: string,
        colMap: ColMap,
        d3InterpolateFunction: D3InterpolateFunction,
        drilldownCallback: DrilldownCallback
    ) {
        const viewBoxHeight = 250
        super(chartId, colMap, viewBoxHeight, d3InterpolateFunction)
        this.drilldownCallback = drilldownCallback
    }

    addMatchRows(matches: Match[]) {
        matches.forEach((match, i) => {
            const matchRow = new FamilyMatchRow(
                this.matchesSvg,
                match,
                i,
                this.colMap,
                this.d3InterpolateFunction,
                this.drilldownCallback
            )
            matchRow.addLinkAndHeatmap()
            matchRow.addStats()
        })
    }
}
