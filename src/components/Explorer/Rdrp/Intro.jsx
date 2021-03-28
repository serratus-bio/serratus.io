import React from 'react';
import { ExternalLink } from 'common';

const Intro = () => {
    const [showInfo, setShowInfo] = React.useState(false);
    const [showExamples, setShowExamples] = React.useState(true);

    return <>
        <div className="text-3xl text-center">
            Explorer - RdRP
        </div>
        <img className="m-auto h-64" src="/rdrp_search.png" alt="RdRP Search overview" />
        <div id="info">
            <button className="text-xl block m-auto" onClick={() => setShowInfo(!showInfo)}>
                Search Info
            </button>
            <div className={showInfo ? "block" : "hidden"}>
                <div className="my-2 sm:ml-12">{info}</div>
            </div>
        </div>
        <div id="examples">
            <button className="text-xl block m-auto" onClick={() => setShowExamples(!showExamples)}>
                Examples
            </button>
            <div className={showExamples ? "block" : "hidden"}>
                <div className="my-2 sm:ml-12">{examples}</div>
            </div>
        </div>
    </>
}

export default Intro;

const info = <>
    <div className="font-bold mb-2">
        Sequence Reference: <ExternalLink href="https://github.com/ababaian/serratus/wiki/ref_rdrp1" className="text-blue-600">rdrp1</ExternalLink>
    </div>
    <div>
        An amino-acid collection of all available RNA dependent RNA Polymerase sequences (n = 14,941)
    </div>
    <div className="font-bold my-2">
        SRA Search
    </div>
    <ul className="list-disc list-inside">
        <li>5,686,715 libraries (Jan 2021)</li>
        <li>Transcriptome, meta-Transcriptome, metagenome, viromes and environmental</li>
        <li>Mammalian genome and exome</li>
    </ul>
</>;

const examples = <>
    Explore Serratus SRA run matches for a family name or GenBank accession.<br />
    <br />
    Family: <a className="text-blue-600" href="?family=Coronaviridae">Coronaviridae</a><br />
    GenBank: <a className="text-blue-600" href="?sequence=NC_001653">NC_001653</a><br />
    <br />
    Alternatively, find matches associated with a SRA run accession.<br />
    <br />
    Example 1: Frank the Bat (<a className="text-blue-600" href="?run=ERR2756788">ERR2756788</a>)<br />
    Example 2: Ginger the Cat (<a className="text-blue-600" href="?run=SRR7287110">SRR7287110</a>)<br />
    <img className="h-64" src="/Frank_Ginger.png" alt="Frank and Ginger, the Serratus mascots" />
    <i>The Serratus mascots: Frank and Ginger</i>
</>