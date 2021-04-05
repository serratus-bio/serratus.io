import { IMatch } from './IMatch'

export class FamilyMatch extends IMatch {
    constructor(rootSvg, data, rowIndex, colMap, d3InterpolateFunction, drilldownCallback) {
        const searchLevel = 'family'
        const valueKey = 'family_id'
        const displayValueKey = 'family_id'
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
        this.drilldownCallback = drilldownCallback
    }
}
