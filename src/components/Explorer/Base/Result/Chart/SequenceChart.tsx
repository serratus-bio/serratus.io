import { Match } from '../types'
import { IChart } from './IChart'
import { SequenceMatchRow } from './SequenceMatchRow'
import { SequenceChartConfig } from './types'

export class SequenceChart extends IChart {
    config: SequenceChartConfig

    constructor(config: SequenceChartConfig) {
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
