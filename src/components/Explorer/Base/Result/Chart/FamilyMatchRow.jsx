import { IMatchRow } from './IMatchRow'

export class FamilyMatchRow extends IMatchRow {
    constructor(rootSvg, data, rowIndex, colMap, d3InterpolateFunction, drilldownCallback) {
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
