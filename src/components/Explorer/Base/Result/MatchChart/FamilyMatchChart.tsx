import { Match } from '../types'
import { IMatchChart } from './IMatchChart'
import { FamilyMatchRow } from './FamilyMatchRow'
import { FamilyMatchChartConfig } from './types'

export class FamilyMatchChart extends IMatchChart {
    config: FamilyMatchChartConfig

    constructor(config: FamilyMatchChartConfig) {
        const viewBoxHeight = 250
        super(config, viewBoxHeight)
        this.config = config
    }

    addMatchRows(matches: Match[]) {
        super.addMatchRows(matches)
        matches.forEach((match, i) => {
            const matchRow = new FamilyMatchRow(this.config, this.matchesSvg, match, i)
            matchRow.addLinkAndHeatmap()
            matchRow.addStats()
        })
    }
}
