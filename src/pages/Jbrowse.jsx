import React from 'react'

const bamBucket = 'lovelywater'
const faFile = 'https://lovelywater.s3.amazonaws.com/seq/cov3ma/cov3ma.fa'
const faiFile = 'https://lovelywater.s3.amazonaws.com/seq/cov3ma/cov3ma.fa.fai'

const getJbrowseConfig = (bam) => {
    return {
        containerID: 'GenomeBrowser',
        refSeqs: {
            url: faiFile,
        },
        tracks: [
            {
                key: 'Cov3ma Reference Sequence',
                label: 'Cov3ma Reference Sequence',
                urlTemplate: faFile,
            },
            {
                urlTemplate: `https://${bamBucket}.s3.amazonaws.com/bam/${bam}.bam`,
                storeClass: 'JBrowse/Store/SeqFeature/BAM',
                label: bam,
                type: 'JBrowse/View/Track/Alignments2',
                chunkSizeLimit: 40000000,
            },
        ],
        includes: null,
    }
}

const Jbrowse = (props) => {
    var urlParams = new URLSearchParams(props.location.search)
    var bam = urlParams.get('bam')
    var loc = urlParams.get('loc')

    // Instatiate JBrowse
    React.useEffect(() => {
        console.log('reload')
        const config = getJbrowseConfig(bam)
        window.addEventListener('load', () => {
            window.JBrowse = new window.Browser(config)
            window.JBrowse.navigateTo(loc)
            window.localStorage.setItem('GenomeBrowser-refseq-', loc)
            window.localStorage.setItem('GenomeBrowser-tracks-', `Cov3ma Reference Sequence,${bam}`)
            console.log(window.JBrowse)
        })
    }, [bam, loc])

    return (
        <div className='App'>
            <h1 className='text-center text-2xl'>SRA: {bam}</h1>
            <div
                style={{ width: '100%', height: 800 }}
                className='jbrowse'
                id='GenomeBrowser'
                data-config='"updateBrowserURL": true'>
                <div id='LoadingScreen'>
                    <h1>Loading...</h1>
                </div>
            </div>
        </div>
    )
}

export default Jbrowse
