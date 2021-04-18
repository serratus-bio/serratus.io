import * as d3 from 'd3'
import { Match } from '../types'
import { IMatchRow } from './IMatchRow'
import { FamilyMatchChartConfig } from './types'

export class FamilyMatchRow extends IMatchRow {
    constructor(
        chartConfig: FamilyMatchChartConfig,
        rootSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
        data: Match,
        rowIndex: number
    ) {
        super(chartConfig, rootSvg, data, rowIndex)
        this.drillDownCallback = chartConfig.drillDownCallback
    }
}
