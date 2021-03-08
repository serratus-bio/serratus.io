import React from "react";

const SelectionInfo = ({ selectedPoints }) => {
    const originalPoints = selectedPoints;
    if (!selectedPoints || selectedPoints.length === 0) {
        return null;
    }

    const maxRows = 50;
    let truncated = false;
    if (selectedPoints.length > maxRows) {
        selectedPoints = selectedPoints.slice(0, maxRows);
        truncated = true;
    }

    const tdClasses = "border border-light-blue-500 px-4 py-2 text-light-blue-600 font-medium"

    return <div className="mx-8 my-4">
        {truncated && <span>{maxRows}/{originalPoints.length} results displayed.</span>}
        <table className="table-auto my-4">
            <tbody>
                <tr>
                    <th>SRA Run</th>
                    <th>Release Date</th>
                    <th>Geocoded Text</th>
                </tr>
                {selectedPoints.map((point) =>
                    <tr key={point.sra_id}>
                        <td className={tdClasses}><a href={`explorer?run=${point.sra_id}`} className="text-blue-600">{point.sra_id}</a></td>
                        <td className={tdClasses}>{point.release_date}</td>
                        <td className={tdClasses}>{point.from_text}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}

export default SelectionInfo;
