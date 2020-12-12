import React from 'react';

export default () => {
    return (
        <div className="text-center">
            Explore Serratus SRA run matches for a family name or GenBank accession.<br />
            Family: <a className="text-blue-600" href="?family=Coronaviridae">Coronaviridae</a><br />
            GenBank: <a className="text-blue-600" href="?genbank=EU769558.1">EU769558.1</a><br />
            <br />
            Alternatively, find matches associated with a SRA run accession.<br />
            <br />
            Example 1: Frank the Bat (<a className="text-blue-600" href="?run=ERR2756788">ERR2756788</a>)<br />
            Example 2: Ginger the Cat (<a className="text-blue-600" href="?run=SRR7287110">SRR7287110</a>)
            <img className="m-auto h-64" src="/Frank_Ginger.png" alt="Frank and Ginger, the Serratus mascots"></img>
            <i>Frank and Ginger, the Serratus mascots.</i>
        </div>
    )
}
