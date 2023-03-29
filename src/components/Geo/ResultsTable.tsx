import React from 'react'
import { LinkButton, ExternalLink, externalLinkIcon, downloadIcon } from 'common'
import { RunData, RunDataKey } from './types'
import { routes } from 'common/routes'

type Props = {
    rowsToDisplay: RunData[] | undefined
}

export const ResultsTable = ({ rowsToDisplay }: Props) => {
    if (rowsToDisplay === undefined) return null

    const maxRows = 50
    const displayPoints =
        rowsToDisplay.length > maxRows ? rowsToDisplay.slice(0, maxRows) : rowsToDisplay

    const tdClasses = 'border px-4 py-2'
    const resultsTable = (
        <div className='max-h-96 my-8  overflow-y-auto overflow-x-auto'>
            <table className='table-auto mx-4'>
                <tbody>
                    <tr>
                        <th>SRA Run</th>
                        <th>BioSample</th>
                        <th>Organism</th>
                        <th>Release Date</th>
                        <th>Lat, Lon</th>
                        <th>Inferred Location</th>
                    </tr>
                    {displayPoints.map((point) => (
                        <tr key={point?.[RunDataKey.RunId]}>
                            <td className={tdClasses}>
                                <ExternalLink
                                    href={`${routes.rdrpExplorer.path}?run=${
                                        point?.[RunDataKey.RunId]
                                    }`}
                                    className='text-blue-600'>
                                    {point?.[RunDataKey.RunId]}
                                    {externalLinkIcon}
                                </ExternalLink>
                            </td>
                            <td className={tdClasses}>
                                <ExternalLink
                                    href={`https://www.ncbi.nlm.nih.gov/biosample/?term=${
                                        point?.[RunDataKey.BiosampleId]
                                    }`}
                                    className='text-blue-600'>
                                    {point?.[RunDataKey.BiosampleId]}
                                    {externalLinkIcon}
                                </ExternalLink>
                            </td>
                            <td className={tdClasses}>
                                <ExternalLink
                                    href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${
                                        point?.[RunDataKey.TaxId]
                                    }`}
                                    className='text-blue-600'>
                                    {point?.[RunDataKey.ScientificName]}
                                    {externalLinkIcon}
                                </ExternalLink>
                            </td>
                            <td className={tdClasses}>{point?.[RunDataKey.ReleaseDate]}</td>
                            <td className={tdClasses}>
                                {point?.[RunDataKey.CoordinateY]}, {point?.[RunDataKey.CoordinateX]}
                            </td>
                            <td className={tdClasses}>{point?.[RunDataKey.FromText]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

    const downloadData = rowsToDisplay.map((point) => point?.[RunDataKey.RunId]).join('%0A')
    const downloadButton = (
        <>
            <LinkButton
                link={`data:text/plain;charset=utf-8,${downloadData}`}
                text='Download Matches'
                icon={downloadIcon}
                download='SerratusMatches.txt'
            />
        </>
    )

    return (
        <div className='mx-8 my-4'>
            {displayPoints.length}/{rowsToDisplay.length} results displayed.
            {rowsToDisplay.length !== 0 && downloadButton}
            {rowsToDisplay.length !== 0 && resultsTable}
        </div>
    )
}
