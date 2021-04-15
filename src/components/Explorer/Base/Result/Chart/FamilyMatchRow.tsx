import * as d3 from 'd3'
import { Match } from '../types'
import { IMatchRow } from './IMatchRow'
import { ColMap, D3InterpolateFunction, DrilldownCallback } from './types'

export class FamilyMatchRow extends IMatchRow {
    constructor(
        rootSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
        data: Match,
        rowIndex: number,
        colMap: ColMap,
        d3InterpolateFunction: D3InterpolateFunction,
        drilldownCallback: DrilldownCallback
    ) {
        const searchLevel = 'family'
        const valueKey = 'family_id'
        const linkValueKey = 'family_name'
        const displayValueKey = 'family_id'
        super(
            searchLevel,
            valueKey,
            linkValueKey,
            displayValueKey,
            rootSvg,
            data,
            rowIndex,
            colMap,
            d3InterpolateFunction
        )
        this.drilldownCallback = drilldownCallback
    }
}
