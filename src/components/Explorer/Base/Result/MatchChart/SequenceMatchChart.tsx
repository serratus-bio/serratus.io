import { Match } from '../types'
import { IMatchChart } from './IMatchChart'
import { SequenceMatchRow } from './SequenceMatchRow'
import { SequenceMatchChartConfig } from './types'

export class SequenceMatchChart extends IMatchChart {
    config: SequenceMatchChartConfig

    constructor(config: SequenceMatchChartConfig) {
        const viewBoxHeight = 400
        super(config, viewBoxHeight)
        this.config = config
    }

    addMatchRows(matches: Match[]) {
        super.addMatchRows(matches)
        matches.forEach((match, i) => {
            const matchRow = new SequenceMatchRow(this.config, this.matchesSvg, match, i)
            matchRow.addLinkAndHeatmap()
            matchRow.addStats()
            if (this.config.addJbrowseLinks) {
                matchRow.addJBrowseIcon()
            }
        })
    }
}
