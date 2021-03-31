import React from 'react'
import { ExternalLink } from 'common'

const Intro = () => {
    const [showInfo, setShowInfo] = React.useState(false)
    const [showExamples, setShowExamples] = React.useState(true)
    const [showMascot, setShowMascot] = React.useState(false)

    return (
        <>
            <div className="text-3xl text-center">
                RNA Dependent RNA Polymerase (RdRP) Search
            </div>

            <div id="info" class="text-left">
                <button
                    className="text-xl m-auto"
                    onClick={() => setShowInfo(!showInfo)}>
                    {showInfo ? '▼' : '►'} Search Information
                </button>
                <div className={showInfo ? 'block' : 'hidden'}>
                    <div className="my-2 sm:ml-12">{info}</div>
                </div>
            </div>

            <div id="examples" class="text-left">
                <button
                    className="text-xl m-auto"
                    onClick={() => setShowExamples(!showExamples)}>
                    {showExamples ? '▼' : '►'} Examples
                </button>
                <div className={showExamples ? 'block' : 'hidden'}>
                    <div className="my-2 sm:ml-12">{examples}</div>
                </div>
            </div>

            <div id="mascot" class="text-center">
                <button
                    className="text-center m-auto"
                    onClick={() => setShowMascot(!showMascot)}>
                    <div align="center" id="Frank">
                        <img
                            align="center"
                            className="h-64"
                            src="/Frank_Ginger.png"
                            alt="Frank and Ginger, the Serratus mascots"
                        />
                        <i>Serratus mascots: Frank and Ginger</i>
                    </div>
                </button>
                <div className={showMascot ? 'block' : 'hidden'}>
                    <div className="my-2 sm:ml-12">{mascot}</div>
                </div>
            </div>
        </>
    )
}

export default Intro

const info = (
    <>
        <img
            className="m-auto h-64"
            src="/rdrp_search.png"
            alt="RdRP Search overview"
        />

        <div className="font-bold mb-2">
            Sequence Reference: <i>rdrp1</i>
            <ExternalLink
                href="https://github.com/ababaian/serratus/wiki/ref_rdrp1"
                className="text-blue-600">
                {' '}
                (wiki){' '}
            </ExternalLink>
            <ExternalLink
                href="https://s3.amazonaws.com/lovelywater/seq/rdrp1/rdrp1.fa"
                className="text-blue-600">
                {' '}
                (rdrp1.fa){' '}
            </ExternalLink>
        </div>
        <div>
            Short-reads were translated-nucleotide alignment against an
            amino-acid collection of RNA dependent RNA Polymerase from all RNA
            viruses (n = 14,941) and deltavirus antigen.
        </div>
        <div> Operational sensitivity: 60-95% RdRP amino acid identity. </div>
        <div className="font-bold my-2">
            SRA Search
            <ExternalLink
                href="https://github.com/ababaian/serratus/wiki/SRA-queries"
                className="text-blue-600">
                {' '}
                (wiki){' '}
            </ExternalLink>
        </div>
        <ul className="list-disc list-inside">
            <li> 5,686,715 libraries (Jan 2021)</li>
            <li>
                All Transcriptome, Metatranscriptome, Metagenome, Virome, and
                Environmental sequencing
            </li>
            <li>Genome and Exome for non-human non-mouse mammals</li>
        </ul>
    </>
)

const examples = (
    <>
        Explore Serratus by virus family name, GenBank accession (in sequence
        reference), or SRA run identifier.
        <br />
        <br />
        Family:{' '}
        <a className="text-blue-600" href="?family=Coronaviridae">
            Coronaviridae
        </a>
        ,{' '}
        <a
            className="text-blue-600"
            href="?family=Qinviridae&identity=45-100&score=25-100">
            Qinviridae
        </a>
        ,{' '}
        <a className="text-blue-600" href="?family=Quenyaviridae">
            Quenyaviridae
        </a>
        ...
        <br />
        <br />
        GenBank:{' '}
        <a className="text-blue-600" href="?sequence=NC_001653">
            Hepatitis Delta Virus (NC_001653)
        </a>
        ,{' '}
        <a
            className="text-blue-600"
            href="?sequence=AAF26709&identity=45-100&score=15-100">
            Rubella (AAF26709)
        </a>
        ...
        <br />
        <br />
        SRA Run ID:{' '}
        <a className="text-blue-600" href="?run=ERR2756788">
            Frank the Bat (ERR2756788)
        </a>{' '}
        and{' '}
        <a className="text-blue-600" href="?run=SRR7287110">
            Ginger the Cat (SRR7287110)
        </a>
        <br />
    </>
)

const mascot = (
    <>
        <div className="text-gray-600">
            {' '}
            Serratus is made possible through the promise of collective
            data-sharing.{' '}
        </div>
        <div className="text-gray-600">
            {' '}
            If you learn from these data, consider your role in releasing data
            freely and without restriction.
        </div>
        <br />
    </>
)
