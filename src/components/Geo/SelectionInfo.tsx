import React from 'react'
import { LinkButton, ExternalLink, externalLinkIcon, downloadIcon } from 'common'
import { RunData } from './types'
import { routes } from 'common/routes'

type Props = {
    selectedRows: RunData[] | undefined
}

export const SelectionInfo = ({ selectedRows }: Props) => {
    if (selectedRows === undefined) return null
    else if (selectedRows && selectedRows.length > 0) {
        const maxRows = 50
        const displayRows =
            selectedRows.length > maxRows ? selectedRows.slice(0, maxRows) : selectedRows

        const tdClasses = 'border px-4 py-2'
        const resultsTable = (
            <table className='table-auto my-4'>
                <tbody>
                    <tr>
                        <th>SRA Run</th>
                        <th>BioSample</th>
                        <th>Organism</th>
                        <th>Release Date</th>
                        <th>Lat, Lon</th>
                        <th>Inferred Location</th>
                    </tr>
                    {displayRows.map((row) => (
                        <tr key={row.run_id}>
                            <td className={tdClasses}>
                                <ExternalLink
                                    href={`${routes.rdrpExplorer.path}?run=${row.run_id}`}
                                    className='text-blue-600'>
                                    {row.run_id}
                                    {externalLinkIcon}
                                </ExternalLink>
                            </td>
                            <td className={tdClasses}>
                                <ExternalLink
                                    href={`https://www.ncbi.nlm.nih.gov/biosample/?term=${row.biosample_id}`}
                                    className='text-blue-600'>
                                    {row.biosample_id}
                                    {externalLinkIcon}
                                </ExternalLink>
                            </td>
                            <td className={tdClasses}>
                                <ExternalLink
                                    href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${row.tax_id}`}
                                    className='text-blue-600'>
                                    {row.scientific_name}
                                    {externalLinkIcon}
                                </ExternalLink>
                            </td>
                            <td className={tdClasses}>{row.release_date}</td>
                            <td className={tdClasses}>
                                {row.coordinate_y}, {row.coordinate_x}
                            </td>
                            <td className={tdClasses}>{row.from_text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )

        const downloadData = selectedRows.map((row) => row.run_id).join('%0A')
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
                {displayRows.length}/{selectedRows.length} results displayed.
                {selectedRows.length !== 0 && downloadButton}
                {selectedRows.length !== 0 && resultsTable}
            </div>
        )
    } else return null
}
