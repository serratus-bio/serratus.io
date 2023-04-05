import React from 'react'
import { Helmet } from 'react-helmet'
import { MapPlot } from './MapPlot'
import { ResultsTable } from './ResultsTable'
import { RunData, RunDataKey } from './types'
import { helpIcon } from 'common'
import { fetchPagedGeoMatches } from 'components/Explorer/Base/Result/SerratusApiCalls'
import {
    countRunDataByDateAndKey,
    filterRunDataByGroup,
    getBioIdsFromRunData,
    getRunDataFromPaginatedData,
    groupRunDataByKey,
    transformToMapPlotData,
    transformToTimePlotData,
} from './GeoHelpers'
import { SpeciesSelect } from './SpeciesSelect'
import { TimePlot } from './TimePlot'
import { LoadIcon } from 'common/LoadIcon'

type Props = {
    runIds?: string[]
    isEmbedded?: boolean
}

export const Geo = ({ runIds, isEmbedded = false }: Props) => {
    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false)
    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [paginatedRunData, setPaginatedRunData] = React.useState<{
        [page: string]: RunData[]
    }>({})
    const [selectedPoints, setSelectedPoints] = React.useState<RunData[]>([])
    const [selectedSpecies, setSelectedSpecies] = React.useState<string[]>([])

    const shouldFetchAll = () => !runIds || runIds?.length === 0 || runIds?.length > 100

    React.useEffect(() => {
        async function onMount() {
            fetchRunData()
        }
        onMount()
    }, [])

    React.useEffect(() => {
        async function onMount() {
            fetchRunData()
        }
        onMount()
    }, [])

    function storePaginatedRunData(rows: RunData[], page: number) {
        if (!rows.length) {
            return
        }
        setPaginatedRunData((prevState) => ({
            ...prevState,
            [page]: rows,
        }))
    }

    async function fetchRunData() {
        setIsFetching(true)

        // Fetch first page and get total rows
        let page = 1
        const perPage = 20000
        const searchType = 'rdrp'
        const queryRunIds = shouldFetchAll() ? [] : runIds
        const { result, total } = await fetchPagedGeoMatches(searchType, page, perPage, queryRunIds)
        storePaginatedRunData(result as RunData[], page)

        // Batch requests for remaining pages
        const totalPages = Math.ceil(total / perPage)
        const iterPages = []
        for (page = page + 1; page <= totalPages; page++) {
            if (!(page in paginatedRunData)) {
                iterPages.push(page)
            }
        }
        await Promise.allSettled(
            iterPages.map(async (page) => {
                const { result } = await fetchPagedGeoMatches(
                    searchType,
                    page as number,
                    perPage,
                    queryRunIds
                )
                storePaginatedRunData(result as RunData[], page as number)
            })
        )
        setIsFetching(false)
    }

    const runData = React.useMemo(() => {
        return getRunDataFromPaginatedData(paginatedRunData, shouldFetchAll() ? runIds : [])
    }, [isFetching])

    const speciesOptions = React.useMemo(() => {
        const filteredBySelectedPoints = filterRunDataByGroup(
            runData,
            getBioIdsFromRunData(selectedPoints),
            RunDataKey.BiosampleId
        )
        const speciesSet = new Set(
            filteredBySelectedPoints.map((d) => d?.[RunDataKey.ScientificName])
        )
        return Array.from(speciesSet).sort()
    }, [runData, selectedPoints, selectedSpecies])

    const filteredAndSelectedRows = React.useMemo(() => {
        if (runData.length === 0) {
            return []
        }
        const filteredBySpecies = filterRunDataByGroup(
            runData,
            selectedSpecies,
            RunDataKey.ScientificName
        )
        return filterRunDataByGroup(
            filteredBySpecies,
            getBioIdsFromRunData(selectedPoints),
            RunDataKey.BiosampleId
        )
    }, [runData, selectedSpecies, selectedPoints])

    const mapData = React.useMemo(() => {
        const filteredBySpecies = filterRunDataByGroup(
            runData,
            selectedSpecies,
            RunDataKey.ScientificName
        )
        const groupedRunData =
            selectedSpecies.length > 0
                ? groupRunDataByKey(filteredBySpecies, RunDataKey.ScientificName)
                : {
                      all: filteredBySpecies,
                  }
        return transformToMapPlotData(
            groupedRunData,
            selectedSpecies,
            getBioIdsFromRunData(selectedPoints)
        )
    }, [runData, selectedSpecies, selectedPoints])

    const timePlotData = React.useMemo(() => {
        const groupedCounter = countRunDataByDateAndKey(
            filteredAndSelectedRows,
            RunDataKey.ScientificName
        )
        return transformToTimePlotData(groupedCounter, selectedSpecies)
    }, [filteredAndSelectedRows])

    return (
        <div className='mx-14 my-2'>
            {isEmbedded ? null : (
                <>
                    <Helmet>
                        <title>Serratus | Planetary RNA Virome</title>
                    </Helmet>
                    <div className='text-center text-xl my-4'>The Planetary RNA Virome</div>
                </>
            )}
            {!runData.length || isFetching ? (
                <LoadIcon />
            ) : (
                <>
                    <div className='flex my-4'>
                        <button
                            className='collapse-button'
                            style={{ color: 'blue' }}
                            onClick={() => setIsCollapsed(!isCollapsed)}>
                            <p className='text-left'>{helpIcon} Info</p>
                        </button>
                        <p className='text-right w-full'>
                            {runData.length
                                ? `Geo data available for ${runData.length}/${
                                      !runIds || runIds?.length === 0
                                          ? runData.length
                                          : runIds?.length
                                  } runs`
                                : null}
                        </p>
                    </div>
                    <div
                        className={`collapse-content ${!isCollapsed ? 'collapsed' : 'expanded'}`}
                        aria-expanded={isCollapsed}>
                        <p>
                            We searched 5.7 million public sequencing libraries for the RNA virus
                            hallmark gene, RNA-dependent RNA Polymerase (RdRP).
                        </p>

                        <p>
                            This map shows the location of BioSamples from which an intact RdRP
                            sequence could be recovered and geographical meta-data was present.
                        </p>

                        <p>
                            A 100-meter randomization is applied to all points to prevent
                            overplotting.
                        </p>
                    </div>

                    <div className='my-4'>
                        <SpeciesSelect
                            speciesOptions={speciesOptions}
                            selectedSpecies={selectedSpecies}
                            setSelectedSpecies={setSelectedSpecies}
                        />
                    </div>
                    <div className='my-4'>
                        <MapPlot plotData={mapData} setSelectedPoints={setSelectedPoints} />
                    </div>
                    <div className='text-left text-gray-600'>
                        <b>`Shift`-click</b> to select multiple points or use the{' '}
                        <b>`Box Select`</b> or <b>`Lasso Select`</b> icons in the top-right.{' '}
                        <b>Double-click</b> to deselect points.
                    </div>
                    <TimePlot plotData={timePlotData} />
                    <ResultsTable rowsToDisplay={filteredAndSelectedRows} />
                </>
            )}
        </div>
    )
}
