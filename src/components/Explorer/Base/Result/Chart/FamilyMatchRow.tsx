import * as d3 from 'd3'
import { Match } from '../types'
import { IMatchRow } from './IMatchRow'
import { FamilyChartConfig } from './types'

export class FamilyMatchRow extends IMatchRow {
    constructor(
        chartConfig: FamilyChartConfig,
        rootSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
        data: Match,
        rowIndex: number
    ) {
        super(chartConfig, rootSvg, data, rowIndex)
        this.drilldownCallback = chartConfig.drilldownCallback
    }
}
