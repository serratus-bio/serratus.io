import React from 'react'
import { LinkButton, ExternalLink, externalLinkIcon, downloadIcon, helpIcon } from 'common'
import { getAnalysisIndex } from '../Base/Result/SerratusApiCalls'
import { routes } from 'common/routes'

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
    const [microAvailable, setMicroAvailable] = React.useState(false)
    const [ntAvailable, setNtAvailable] = React.useState(false)

    React.useEffect(() => {
        async function setIndexButtons() {
            const analysisIndex = await getAnalysisIndex(run_id)
            setMicroAvailable(analysisIndex.micro)
            setNtAvailable(analysisIndex.nsra)
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
                link={`${routes.nucleotideExplorer.path}?run=${run_id}`}
                text='NT Explorer'
                show={ntAvailable}
            />
            <LinkButton
                link={`https://s3.amazonaws.com/lovelywater/rpro/${run_id}.pro.gz`}
                text='.pro'
                icon={downloadIcon}
                download={true}
            />
            <LinkButton
                link={`https://s3.amazonaws.com/lovelywater/rsummary/${run_id}.psummary`}
                text='.summary'
                icon={downloadIcon}
                download={true}
            />
            <LinkButton
                link={`https://s3.amazonaws.com/lovelywater/assembly/micro/rdrp1/${run_id}.rdrp1.mu.fa`}
                text='rdrp'
                icon={downloadIcon}
                download={true}
                show={microAvailable}
            />
            <div className='inline-flex -ml-1'>
                <ExternalLink href='https://github.com/ababaian/serratus/wiki/.summary-Reports'>
                    {helpIcon}
                </ExternalLink>
            </div>
        </>
    )
}
