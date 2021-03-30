import React from "react"
import { LinkButton, ExternalLink, externalLinkIcon, downloadIcon } from 'common'
import { RunDataList } from './types'

type Props = {
    selectedPoints: RunDataList | undefined
}

const SelectionInfo = ({ selectedPoints }: Props) => {
    if (selectedPoints === undefined) return null

    const maxRows = 50
    const displayPoints = (selectedPoints.length > maxRows) ? selectedPoints.slice(0, maxRows) : selectedPoints

    const tdClasses = "border px-4 py-2"
    const resultsTable = <>
        <table className="table-auto my-4">
            <tbody>
                <tr>
                    <th>SRA Run</th>
                    <th>BioSample</th>
                    <th>Organism</th>
                    <th>Release Date</th>
                    <th>Lat, Lon</th>
                    <th>Inferred Location</th>
                </tr>
                {displayPoints.map(point =>
                    <tr key={point.run_id}>
                        <td className={tdClasses}><ExternalLink href={`/explorer-rdrp?run=${point.run_id}`} className="text-blue-600">{point.run_id}{externalLinkIcon}</ExternalLink></td>
                        <td className={tdClasses}><ExternalLink href={`https://www.ncbi.nlm.nih.gov/biosample/?term=${point.biosample_id}`} className="text-blue-600">{point.biosample_id}{externalLinkIcon}</ExternalLink></td>
                        <td className={tdClasses}><ExternalLink href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${point.tax_id}`} className="text-blue-600">{point.scientific_name}{externalLinkIcon}</ExternalLink></td>
                        <td className={tdClasses}>{point.release_date}</td>
                        <td className={tdClasses}>{point.coordinate_y}, {point.coordinate_x}</td>
                        <td className={tdClasses}>{point.from_text}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </>

    const downloadData = selectedPoints
        .map(point => point.run_id)
        .join('%0A')
    const downloadButton = <>
        <LinkButton
            link={`data:text/plain;charset=utf-8,${downloadData}`}
            text="Download Matches"
            icon={downloadIcon}
            download="SerratusMatches.txt"
        />
    </>

    return <div className="mx-8 my-4">
        {displayPoints.length}/{selectedPoints.length} results displayed.
        {selectedPoints.length !== 0 && downloadButton}
        {selectedPoints.length !== 0 && resultsTable}
    </div>
}

export default SelectionInfo
