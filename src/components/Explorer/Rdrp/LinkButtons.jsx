import React from 'react'
import {
    LinkButton,
    ExternalLink,
    externalLinkIcon,
    downloadIcon,
    helpIcon,
} from 'common'

export default function LinkButtons({ searchLevel, searchLevelValue }) {
    if (searchLevel === 'family') {
        return <FamilyLinkButtons family={searchLevelValue} />
    }
    if (searchLevel === 'sequence') {
        return <SequenceLinkButtons sequence_accession={searchLevelValue} />
    }
    if (searchLevel === 'run') {
        return <RunLinkButtons run_id={searchLevelValue} />
    }
}

function FamilyLinkButtons({ family_name }) {
    let link = `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=${family_name}`
    let text = 'Taxonomy Browser'
    if (family_name === 'AMR') {
        link = 'https://card.mcmaster.ca/'
        text = 'Database Website'
    }
    return (
        <>
            <LinkButton
                link={link}
                text={text}
                icon={externalLinkIcon}
                newTab={true}
            />
        </>
    )
}

function SequenceLinkButtons({ sequence_accession }) {
    return (
        <>
            <LinkButton
                link={`https://www.ncbi.nlm.nih.gov/nuccore/${sequence_accession}`}
                text="GenBank"
                icon={externalLinkIcon}
                newTab={true}
            />
        </>
    )
}

function RunLinkButtons({ run_id }) {
    return (
        <>
            <LinkButton
                link={`https://www.ncbi.nlm.nih.gov/sra/?term=${run_id}`}
                text="SRA"
                icon={externalLinkIcon}
                newTab={true}
            />
            <LinkButton
                link={`https://trace.ncbi.nlm.nih.gov/Traces/sra/?run=${run_id}`}
                text="Trace"
                icon={externalLinkIcon}
                newTab={true}
            />
            <LinkButton
                link={`https://s3.amazonaws.com/lovelywater/rpro/${run_id}.pro.gz`}
                text=".pro"
                icon={downloadIcon}
                download={true}
            />
            <LinkButton
                link={`https://s3.amazonaws.com/lovelywater/rsummary/${run_id}.psummary`}
                text=".summary"
                icon={downloadIcon}
                download={true}
            />
            <div className="inline-flex -ml-1">
                <ExternalLink href="https://github.com/ababaian/serratus/wiki/.summary-Reports">
                    {helpIcon}
                </ExternalLink>
            </div>
        </>
    )
}
