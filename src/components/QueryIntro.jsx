import React from 'react';

const QueryInfo = () => {
    return (
        <div className="text-center">
            Explore Serratus SRA run hits for a GenBank accession.<br />
            Example: <a className="text-blue-600" href="?accession=EU769558.1">EU769558.1</a><br />
            <br />
            Alternatively, visit the <a className="text-blue-600" href="/report">Report lookup page</a> to access a report for a SRA run.
        </div>
    )
}

export default QueryInfo;
