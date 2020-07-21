import React from 'react';

const QueryInfo = () => {
    return (
        <div className="text-center">
            Explore Serratus SRA run hits for a GenBank accession.<br />
            Example: <a className="text-blue-600" href="?genbank=EU769558.1">EU769558.1</a><br />
            <br />
            Alternatively, find Serratus analysis results of a given SRA run accession.<br />
            <br />
            Example 1: Frank the Bat (<a className="text-blue-600" href="?run=ERR2756788">ERR2756788</a>)<br />
            Example 2: Ginger the Cat (<a className="text-blue-600" href="?run=SRR7287110">SRR7287110</a>)
            <img className="m-auto" src="/Frank_Ginger.png" alt="Frank and Ginger, the Serratus mascots"></img>
            Frank and Ginger, the Serratus mascots.
        </div>
    )
}

export default QueryInfo;
