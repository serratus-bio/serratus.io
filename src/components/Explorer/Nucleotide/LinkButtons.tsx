import React from 'react'
import { LinkButton, ExternalLink, externalLinkIcon, downloadIcon, helpIcon } from 'common'
import { getAnalysisIndex } from '../Base/Result/SerratusApiCalls'

type Props = {
    searchLevel: string
    searchLevelValue: string
}

export const LinkButtons = ({ searchLevel, searchLevelValue }: Props) => {
    if (searchLevel === 'family') {
        return <FamilyLinkButtons family_name={searchLevelValue} />
    }
    if (searchLevel === 'sequence') {
        return <SequenceLinkButtons sequence_accession={searchLevelValue} />
    }
    if (searchLevel === 'run') {
        return <RunLinkButtons run_id={searchLevelValue} />
    }
    return <div />
}

function FamilyLinkButtons({ family_name }: { family_name: string }) {
    let link = `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=${family_name}`
    let text = 'Taxonomy Browser'
    if (family_name === 'AMR') {
        link = 'https://card.mcmaster.ca/'
        text = 'Database Website'
    }
    return <LinkButton link={link} text={text} icon={externalLinkIcon} newTab={true} />
}

function SequenceLinkButtons({ sequence_accession }: { sequence_accession: string }) {
    return (
        <LinkButton
            link={`https://www.ncbi.nlm.nih.gov/nuccore/${sequence_accession}`}
            text='GenBank'
            icon={externalLinkIcon}
            newTab={true}
        />
    )
}

function RunLinkButtons({ run_id }: { run_id: string }) {
    const [rdrpAvailable, setRdrpAvailable] = React.useState(false)

    React.useEffect(() => {
        async function setIndexButtons() {
            const analysisIndex = await getAnalysisIndex(run_id)
            setRdrpAvailable(analysisIndex.rsra)
        }
        setIndexButtons()
    }, [])

    return (
        <>
            <LinkButton
                link={`https://www.ncbi.nlm.nih.gov/sra/?term=${run_id}`}
                text='SRA'
                icon={externalLinkIcon}
                newTab={true}
            />
            <LinkButton
                link={`https://trace.ncbi.nlm.nih.gov/Traces/sra/?run=${run_id}`}
                text='Trace'
                icon={externalLinkIcon}
                newTab={true}
            />
            <LinkButton
                link={`/explorer-rdrp?run=${run_id}`}
                text='RdRP Explorer'
                show={rdrpAvailable}
            />
            <LinkButton
                link={`${window.location.origin}/jbrowse?bam=${run_id}`}
                text='JBrowse'
                icon={externalLinkIcon}
                newTab={true}
            />
            <LinkButton
                link={`https://s3.amazonaws.com/lovelywater/bam/${run_id}.bam`}
                text='.bam'
                icon={downloadIcon}
                download={true}
            />
            <LinkButton
                link={`https://s3.amazonaws.com/lovelywater/summary2/${run_id}.summary`}
                text='.summary'
                icon={downloadIcon}
                download={true}
            />
            <div className='inline-flex -ml-1'>
                <ExternalLink href='https://github.com/ababaian/serratus/wiki/.summary-Reports'>
                    {helpIcon}
                </ExternalLink>
            </div>
        </>
    )
}
