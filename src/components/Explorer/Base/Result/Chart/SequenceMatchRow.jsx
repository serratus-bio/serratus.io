import { IMatchRow } from './IMatchRow'

export class SequenceMatchRow extends IMatchRow {
    constructor(rootSvg, data, rowIndex, colMap, d3InterpolateFunction) {
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
