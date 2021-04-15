import * as d3 from 'd3'
import { Match } from '../types'
import { IMatchRow } from './IMatchRow'
import { ColMap, D3InterpolateFunction } from './types'

export class SequenceMatchRow extends IMatchRow {
    constructor(
        rootSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
        data: Match,
        rowIndex: number,
        colMap: ColMap,
        d3InterpolateFunction: D3InterpolateFunction
    ) {
        const searchLevel = 'sequence'
        const valueKey = 'sequence_accession'
        const linkValueKey = 'sequence_accession'
        const displayValueKey = 'virus_name'
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
    }
}
