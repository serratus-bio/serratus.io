import { IMatch } from './IMatch'

export class SequenceMatch extends IMatch {
    constructor(rootSvg, data, rowIndex, colMap, d3InterpolateFunction) {
        const searchLevel = 'sequence'
        const valueKey = 'sequence_accession'
        const displayValueKey = 'virus_name'
        super(
            searchLevel,
            valueKey,
            displayValueKey,
            rootSvg,
            data,
            rowIndex,
            colMap,
            d3InterpolateFunction
        )
    }
}
