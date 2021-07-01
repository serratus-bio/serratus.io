import React from 'react'
import { createViewState, JBrowseLinearGenomeView } from '@jbrowse/react-linear-genome-view'

const bamBucket = 'lovelywater'
const faFile = 'https://lovelywater.s3.amazonaws.com/seq/cov3ma/cov3ma.fa'
const faiFile = 'https://lovelywater.s3.amazonaws.com/seq/cov3ma/cov3ma.fa.fai'

const assembly = {
    name: 'Cov3ma',
    sequence: {
        type: 'ReferenceSequenceTrack',
        trackId: 'Cov3ma-ReferenceSequenceTrack',
        adapter: {
            type: 'IndexedFastaAdapter',
            fastaLocation: {
                uri: faFile,
            },
            faiLocation: {
                uri: faiFile,
            },
        },
    },
}

export const Jbrowse = ({ location }) => {
    const urlParams = new URLSearchParams(location.search)
    const bam = urlParams.get('bam')
    const loc = urlParams.get('loc')

    const track = {
        type: 'AlignmentsTrack',
        trackId: bam,
        name: bam,
        assemblyNames: [assembly.name],
        adapter: {
            type: 'BamAdapter',
            bamLocation: {
                uri: `https://${bamBucket}.s3.amazonaws.com/bam/${bam}.bam`,
            },
            index: {
                indexType: 'BAI',
                location: {
                    uri: `https://${bamBucket}.s3.amazonaws.com/bam/${bam}.bam.bai`,
                },
            },
        },
        displays: [
            {
                type: 'LinearAlignmentsDisplay',
                displayId: `${bam}-LinearAlignmentsDisplay`,
                pileupDisplay: {
                    type: 'LinearPileupDisplay',
                    maxDisplayedBpPerPx: 4,
                    displayId: `${bam}-LinearPileupDisplay`,
                },
                snpCoverageDisplay: {
                    type: 'LinearSNPCoverageDisplay',
                    maxDisplayedBpPerPx: 4,
                    displayId: `${bam}-LinearSNPCoverageDisplay`,
                },
            },
        ],
    }

    const defaultSession = {
        name: 'Default session',
        view: {
            id: 'linearGenomeView',
            type: 'LinearGenomeView',
            tracks: [
                {
                    type: assembly.sequence.type,
                    configuration: assembly.sequence.trackId,
                    displays: [
                        {
                            type: 'LinearReferenceSequenceDisplay',
                            configuration: `${assembly.name}-${assembly.sequence.type}-LinearReferenceSequenceDisplay`,
                            height: 50,
                        },
                    ],
                },
                {
                    type: track.type,
                    configuration: track.trackId,
                    displays: [
                        {
                            type: 'LinearAlignmentsDisplay',
                            configuration: `${bam}-LinearAlignmentsDisplay`,
                            height: 300,
                        },
                    ],
                },
            ],
        },
    }

    const state = createViewState({
        assembly: assembly,
        tracks: [track],
        location: loc,
        defaultSession,
    })
    return <JBrowseLinearGenomeView viewState={state} />
}
