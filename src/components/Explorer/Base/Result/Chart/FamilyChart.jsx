import { IChart } from './IChart'
import { FamilyMatch } from './FamilyMatch'

export class FamilyChart extends IChart {
    constructor(chartId, colMap, d3InterpolateFunction, drilldownCallback) {
        const viewBoxHeight = 250
        super(chartId, colMap, viewBoxHeight, d3InterpolateFunction)
        this.drilldownCallback = drilldownCallback
    }

    addRows(matchObjects) {
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
