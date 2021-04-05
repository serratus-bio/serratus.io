import { IChart } from './IChart'
import { SequenceMatch } from './SequenceMatch'

export class SequenceChart extends IChart {
    constructor(chartId, colMap, d3InterpolateFunction, addJbrowseLinks) {
        const viewBoxHeight = 400
        super(chartId, colMap, viewBoxHeight, d3InterpolateFunction)
        this.addJbrowseLinks = addJbrowseLinks
    }

    addRows(matchObjects) {
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
