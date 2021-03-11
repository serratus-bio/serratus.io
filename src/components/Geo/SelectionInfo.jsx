import React from "react";
import { ExternalLink, externalLinkIcon } from '../../common/Helpers'

const SelectionInfo = ({ selectedPoints }) => {
    const noSelection = selectedPoints === undefined;
    const nPoints = selectedPoints ? selectedPoints.length : 0;
    const maxRows = 50;
    const displayPoints = (nPoints > maxRows) ? selectedPoints.slice(0, maxRows) : selectedPoints;

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
                {displayPoints && displayPoints.map((point) =>
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

    const runIds = selectedPoints && selectedPoints.map((point) => {
        return point.run_id;
    });
    const downloadData = runIds && runIds.join('\n');

    return <div className="mx-8 my-4">
        {!noSelection && <span>{displayPoints.length}/{nPoints} results displayed.</span>}
        {nPoints !== 0 && resultsTable}
        <a download href={`data:text/plain;charset=utf-8,${downloadData}`}>Download SRA Runs</a>
    </div>
}

export default SelectionInfo;
