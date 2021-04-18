import * as d3 from 'd3'
import { Match } from '../types'
import { IMatchRow } from './IMatchRow'
import { SequenceMatchChartConfig } from './types'

export class SequenceMatchRow extends IMatchRow {
    constructor(
        chartConfig: SequenceMatchChartConfig,
        rootSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
        data: Match,
        rowIndex: number
    ) {
        super(chartConfig, rootSvg, data, rowIndex)
    }
}
