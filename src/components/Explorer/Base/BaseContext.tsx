import React from 'react'
import { RangeFilter } from '../types'
import { ColMap, D3InterpolateFunction } from './Result/MatchChart/types'

export const BaseContext: React.Context<BaseContextType> = React.createContext(
    {} as BaseContextType
)

export type BaseContextType = {
    searchType: string
    defaultSearchLevelValues: {
        [key: string]: string
    }
    theme: {
        gradientString: string
        d3InterpolateFunction: D3InterpolateFunction
    }
    intro: () => React.ReactElement
    domain: {
        identity: RangeFilter
        score: RangeFilter
    }
    defaultFilterRanges: {
        identity: RangeFilter
        score: RangeFilter
    }
    result: {
        addJbrowseLinks: boolean
        colMap: ColMap
        LinkButtons: (_: any) => React.ReactElement
        theme: {
            d3InterpolateFunction: D3InterpolateFunction
        }
    }
}
