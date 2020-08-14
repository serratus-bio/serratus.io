import React from 'react'
import { ExternalLink } from '../helpers/common';

export default () => {
    return (
        <div>
            <div className="my-4">
                <span>All Serratus data can be directly accessed following instructions <ExternalLink href="https://github.com/ababaian/serratus/wiki/Access-Data-Release" className="text-blue-600">here</ExternalLink>. Quick links:</span>
                <ul className="list-disc pl-6">
                    <li><ExternalLink href="https://github.com/ababaian/serratus/wiki/Access-Data-Release#naming-convention" className="text-blue-600">5.7 terabytes of viral alignments to SRA accessions</ExternalLink></li>
                    <li><ExternalLink href="https://github.com/ababaian/serratus/wiki/Access-Data-Release#genomes-and-contigs" className="text-blue-600">11,120 assemblies of CoV-like genomes</ExternalLink></li>
                    <li><ExternalLink href="https://github.com/ababaian/serratus/wiki/Access-Data-Release#genomes-and-contigs" className="text-blue-600">6 novel deltavirus genomes</ExternalLink></li>
                </ul>
            </div>
            <div>If this data assists your research, please consider citing us:</div>
            <span className="text-gray-600">Edgar, R. C. <i>et al</i>. Petabase-scale sequence alignment catalyses viral discovery. <i>bioRxiv</i> 2020.08.07.241729 (2020) </span>
            <ExternalLink href="https://doi.org/10.1101/2020.08.07.241729" className="text-blue-600">doi:10.1101/2020.08.07.241729</ExternalLink>
        </div>
    )
}
