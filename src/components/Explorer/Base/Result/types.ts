export type ResultPagination = {
    result: Match[]
    total: number
}

export type Match = {
    [_: string]: any
    // TODO: specify key names
}
