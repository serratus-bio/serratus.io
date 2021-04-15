export type ResultPagination = {
    result: Match[]
    total: bigint
}

export type Match = {
    [_: string]: any
    // TODO: specify key names
}
