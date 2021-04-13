export type Filters = {
    identityLims: RangeFilter
    scoreLims: RangeFilter
}

export type RangeFilter = [number, number]
