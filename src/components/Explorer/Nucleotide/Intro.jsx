import React from 'react';
import { ExternalLink } from 'common';

const Intro = () => {
    const [showInfo, setShowInfo] = React.useState(false);
    const [showExamples, setShowExamples] = React.useState(true);

    return <>
        <div className="text-3xl text-center">
            Explorer - Nucleotide Vertebrate RefSeq
        </div>
        <img className="m-auto h-64" src="/nt_search.png" alt="Nucleotide Search overview" />
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
        Sequence Reference: <ExternalLink href="https://github.com/ababaian/serratus/wiki/ref_cov3ma" className="text-blue-600">cov3ma</ExternalLink>
    </div>
    <div>
    A nucleotide pangenome of:
    <ol className="list-decimal list-inside">
        <li>GenBank Coronaviridae sequences clustered at 99% identity (n=10,101)</li>
        <li>non-retrovirus Vertebrate RefSeq Viruses (n=2,849)</li>
        <li><ExternalLink href="https://card.mcmaster.ca/" className="text-blue-600">CARD</ExternalLink> Antimicrobial Resistance (AMR) genes clustered at 95%</li>
    </ol>
    </div>
    <div className="font-bold my-2">
        SRA Search
    </div>
    <ul className="list-disc list-inside">
        <li>3,837,755 libraries (May 2020)</li>
        <li>Transcriptome, Meta-Transcriptome, Metagenome and Viromes</li>
    </ul>
</>;

const examples = <>
    Explore Serratus SRA run matches for a family name or GenBank accession.<br />
    <br />
    Family: <a className="text-blue-600" href="?family=Coronaviridae">Coronaviridae</a><br />
    GenBank: <a className="text-blue-600" href="?sequence=NC_034446.1">NC_034446.1</a><br />
    <br />
    Alternatively, find matches associated with a SRA run accession.<br />
    <br />
    Example 1: Frank the Bat (<a className="text-blue-600" href="?run=ERR2756788">ERR2756788</a>)<br />
    Example 2: Ginger the Cat (<a className="text-blue-600" href="?run=SRR7287110">SRR7287110</a>)<br />
    <img className="h-64" src="/Frank_Ginger.png" alt="Frank and Ginger, the Serratus mascots" />
    <i>The Serratus mascots: Frank and Ginger</i>
</>