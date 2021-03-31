// definitions
export const resultSectionId = 'result'

// color palettes, derived from https://bennettfeely.com/scales
export const viridisCssGradient =
    'linear-gradient(90deg, #440154, #482475, #414487, #355f8d, #2a788e, #21908d, #22a884, #42be71, #7ad151, #bddf26, #fce640)'
export const infernoCssGradient =
    'linear-gradient(90deg, #000004, #140B35, #3A0963, #60136E, #85216B, #A92E5E, #CB4149, #E65D2F, #F78311, #FCAD12, #F5DB4B)'

// filtering

export const parseRange = (rangeStr, bounds) => {
    // parse
    let [low, high] = rangeStr.split('-').map((s) => {
        const intVal = +s
        if (isNaN(intVal)) {
            throw new Error('Invalid search filter parameter value')
        }
        return intVal
    })

    // constrict
    const [min, max] = bounds
    if (low < min) low = min
    if (high > max) high = max
    if (low > max) low = max
    if (high < min) high = min

    return [low, high]
}

export const constructRangeStr = (begin, end) => {
    return `${begin}-${end}`
}
