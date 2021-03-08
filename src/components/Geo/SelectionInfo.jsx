import React from "react";
import { ExternalLink, externalLinkIcon } from '../../CommonHelpers'

const SelectionInfo = ({ selectedPoints }) => {
    const noSelection = selectedPoints === undefined;
    const nPoints = selectedPoints ? selectedPoints.length : 0;
    let nPointsDisplayed = nPoints;

    const maxRows = 50;
    if (nPoints > maxRows) {
        selectedPoints = selectedPoints.slice(0, maxRows);
        nPointsDisplayed = maxRows;
    }

    const tdClasses = "border border-light-blue-500 px-4 py-2 text-light-blue-600 font-medium"

    const resultsTable = <>
        <table className="table-auto my-4">
            <tbody>
                <tr>
                    <th>SRA Run</th>
                    <th>BioSample</th>
                    <th>Release Date</th>
                    <th>Geocoded Text</th>
                </tr>
                {selectedPoints && selectedPoints.map((point) =>
                    <tr key={point.sra_id}>
                        <td className={tdClasses}><a href={`explorer?run=${point.sra_id}`} className="text-blue-600">{point.sra_id}</a></td>
                        <td className={tdClasses}><ExternalLink href={`https://www.ncbi.nlm.nih.gov/biosample/?term=${point.biosample_id}`} className="text-blue-600">{point.biosample_id}{externalLinkIcon}</ExternalLink></td>
                        <td className={tdClasses}>{point.release_date}</td>
                        <td className={tdClasses}>{point.from_text}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </>

    return <div className="mx-8 my-4">
        {noSelection
            ? <span>Use <b>Box/Lasso Select</b> to display details.</span>
            : <span>{nPointsDisplayed}/{nPoints} results displayed.</span>
        }
        {nPoints !== 0 && resultsTable}
    </div>
}

export default SelectionInfo;
