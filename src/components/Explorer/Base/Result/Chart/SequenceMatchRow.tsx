import * as d3 from 'd3'
import { Match } from '../types'
import { IMatchRow } from './IMatchRow'
import { SequenceChartConfig } from './types'

export class SequenceMatchRow extends IMatchRow {
    constructor(
        chartConfig: SequenceChartConfig,
        rootSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
        data: Match,
        rowIndex: number
    ) {
        super(chartConfig, rootSvg, data, rowIndex)
    }
}
