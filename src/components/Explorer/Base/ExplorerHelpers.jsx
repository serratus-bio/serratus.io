// definitions
export const resultSectionId = "result";

// color palettes
export const viridisCssGradient = "linear-gradient(90deg, #440154, #482475, #414487, #355f8d, #2a788e, #21908d, #22a884, #42be71, #7ad151, #bddf26, #fce640)" // slight modification of https://bennettfeely.com/cssscales/#viridis

// filtering

export const parseRange = (rangeStr, bounds) => {
    // parse
    var [low, high] = rangeStr.split("-").map((s) => {
        var intVal = +s;
        if (isNaN(intVal)) {
            throw new Error("Invalid search filter parameter value");
        }
        return intVal;
    });

    // constrict
    var [min, max] = bounds;
    if (low < min) low = min;
    if (high > max) high = max;
    if (low > max) low = max;
    if (high < min) high = min;

    return [low, high];
}

export const constructRangeStr = (begin, end) => {
    return `${begin}-${end}`;
}
