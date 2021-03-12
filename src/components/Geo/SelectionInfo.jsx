import React from "react";
import { ExternalLink, externalLinkIcon, downloadIcon } from '../../common/Helpers'
import LinkButton from "../../common/LinkButton";

const SelectionInfo = ({ selectedPoints }) => {
    if (selectedPoints === undefined) return null;

    const maxRows = 50;
    const displayPoints = (selectedPoints.length > maxRows) ? selectedPoints.slice(0, maxRows) : selectedPoints;

    const tdClasses = "border border-light-blue-500 px-4 py-2 text-light-blue-600 font-medium"
    const resultsTable = <>
        <table className="table-auto my-4">
            <tbody>
                <tr>
                    <th>SRA Run</th>
                    <th>BioSample</th>
                    <th>Release Date</th>
                    <th>Lat, Lon</th>
                    <th>Inferred Location</th>
                </tr>
                {displayPoints.map(point =>
                    <tr key={point.run_id}>
                        <td className={tdClasses}>{point.run_id}</td>
                        <td className={tdClasses}><ExternalLink href={`https://www.ncbi.nlm.nih.gov/biosample/?term=${point.biosample_id}`} className="text-blue-600">{point.biosample_id}{externalLinkIcon}</ExternalLink></td>
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
        .join('\n');
    const downloadButton = <>
        <LinkButton
            link={`data:text/plain;charset=utf-8,${downloadData}`}
            text="Download Matches"
            icon={downloadIcon}
            download={true} />
    </>

    return <div className="mx-8 my-4">
        {displayPoints.length}/{selectedPoints.length} results displayed.
        {selectedPoints.length !== 0 && resultsTable}
        {selectedPoints.length !== 0 && downloadButton}
    </div>
}

export default SelectionInfo;
