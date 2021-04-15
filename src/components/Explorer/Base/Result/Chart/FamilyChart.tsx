import { MatchResult } from '../types'
import { IChart } from './IChart'
import { FamilyMatch } from './FamilyMatch'
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

    addRows(matchObjects: MatchResult[]) {
        matchObjects.forEach((matchObject, i) => {
            const match = new FamilyMatch(
                this.matchesSvg,
                matchObject,
                i,
                this.colMap,
                this.d3InterpolateFunction,
                this.drilldownCallback
            )
            match.addLinkAndHeatmap()
            match.addStats()
        })
    }
}
