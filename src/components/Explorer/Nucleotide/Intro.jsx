import React from 'react';
import { ExternalLink } from 'common';

const Intro = () => {
    const [showInfo, setShowInfo] = React.useState(false);
    const [showExamples, setShowExamples] = React.useState(true);
    const [showMascot, setShowMascot] = React.useState(false);

    return <>
        <div className="text-3xl text-center text-maroon">
            Vertebrate Viral Pangenome (NT) Search
        </div>

        <div id="info" class="text-left" >
            <button className="text-xl m-auto" onClick={() => setShowInfo(!showInfo)}>
                {showInfo ? "▼" : "►"} Search Information
            </button>
            <div className={showInfo ? "block" : "hidden"}>
                <div className="my-2 sm:ml-12">{info}</div>
            </div>
        </div>

        <div id="examples" class="text-left" >
            <button className="text-xl m-auto" onClick={() => setShowExamples(!showExamples)}>
                {showExamples ? "▼" : "►"} Examples
            </button>
            <div className={showExamples ? "block" : "hidden"}>
                <div className="my-2 sm:ml-12">{examples}</div>
            </div>
        </div>

        <div id="mascot" class="text-center" >
            <button className="text-center m-auto" onClick={() => setShowMascot(!showMascot)}>
                <div align="center" id="Frank">
                    <img align="center" className="h-64" src="/Frank_Ginger.png" alt="Frank and Ginger, the Serratus mascots" />
                    <i>Serratus mascots: Frank and Ginger</i>
                </div>
            </button>
            <div className={showMascot ? "block" : "hidden"}>
                <div className="my-2 sm:ml-12">{mascot}</div>
            </div>
        </div>


    </>
}

export default Intro;

const info = <>

    <img className="m-auto h-64" src="/nt_search.png" alt="Nucleotide Search overview" />

    <div className="font-bold mb-2">
        Sequence Reference: <i>cov3ma</i>
        <ExternalLink href="https://github.com/ababaian/serratus/wiki/ref_cov3ma" className="text-blue-600"> (wiki) </ExternalLink>
        <ExternalLink href="https://s3.amazonaws.com/lovelywater/seq/cov3ma/cov3ma.fa" className="text-blue-600"> (cov3ma.fa) </ExternalLink>
    </div>
    <div>
    Short reads were aligned against a nucleotide pangenome.
    <ol className="list-decimal list-inside">
        <li>GenBank Coronaviridae sequences clustered at 99% identity (n=10,101)</li>
        <li>non-retrovirus Vertebrate RefSeq Viruses (n=2,849)</li>
        <li><ExternalLink href="https://card.mcmaster.ca/" className="text-blue-600">CARD</ExternalLink> Antimicrobial Resistance (AMR) genes clustered at 95%</li>
    </ol>
    </div>
    <div> Operational sensitivity: 85-99% genome-wide nucleotide identity. </div>
    <div className="font-bold my-2">
        SRA Search
        <ExternalLink href="https://github.com/ababaian/serratus/wiki/SRA-queries" className="text-blue-600"> (wiki v201210) </ExternalLink>
    </div>
    <ul className="list-disc list-inside">
        <li>3,837,755 libraries (May 2020)</li>
        <li>Transcriptome, Meta-Transcriptome, Metagenome and Viromes</li>
    </ul>
</>;

const examples = <>
    Explore Serratus by virus family name, GenBank accession (in sequence reference), or SRA run identifier.<br />
    <br />
    Family: <a className="text-blue-600" href="?family=Coronaviridae">Coronaviridae</a>, <a className="text-blue-600" href="?family=Circoviridae">Circoviridae</a>,  <a className="text-blue-600" href="?family=Reoviridae">Reoviridae</a>... <br />

   
    GenBank: <a className="text-blue-600" href="?sequence=NC_045512.2">SARS-CoV-2 (NC_045512.2)</a>, <a className="text-blue-600" href="?sequence=NC_001498.1">Ateline alphaherpesvirus 1 (NC_034446.1)</a>, <a className="text-blue-600" href="?sequence=NC_034446.1">Measles virus (NC_001498.1)</a>...<br />

    <br />
    SRA Run ID: <a className="text-blue-600" href="?run=ERR2756788">Frank the Bat (ERR2756788)</a> and  <a className="text-blue-600" href="?run=SRR7287110">Ginger the Cat (SRR7287110)</a><br />
</>

const mascot = <>
    <div className="text-gray-600"> Serratus is made possible through the promise of collective data-sharing. </div>
    <div  className="text-gray-600"> If you learn from these data, consider your role in releasing data freely and without restriction.</div>
    <br />
</>