import { Match } from '../types'
import { IChart } from './IChart'
import { FamilyMatchRow } from './FamilyMatchRow'
import { FamilyChartConfig } from './types'

export class FamilyChart extends IChart {
    config: FamilyChartConfig

    constructor(config: FamilyChartConfig) {
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
