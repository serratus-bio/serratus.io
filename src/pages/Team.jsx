import React from 'react'
import { Helmet } from 'react-helmet';
import {
    classesBoxBorder,
    ExternalLink,
    githubIcon
} from '../CommonHelpers';

import teamData from '../data/teamData.json';

const Team = () => {

    const headTags = (
        <Helmet>
            <title>Serratus | Team</title>
        </Helmet>
    )

    return (
        <div className="p-4 lg:px-24 min-h-screen sm:bg-gray-200">
            {headTags}
            <div className={`p-2 ${classesBoxBorder}`}>
                <div className="text-left md:text-center">
                    <div>Serratus is an Open-Science project. Our aim is to create a 100% reproducible study with 100% transparent and freely available data.</div>
                    <ExternalLink href="https://github.com/ababaian/serratus/blob/master/CONTRIBUTING.md" className="text-blue-600">We welcome all scientists and developers to contribute.</ExternalLink>
                </div>
            </div>
            <div className="sm:h-3"></div>
            <div className={`sm:px-3 ${classesBoxBorder}`}>
                {teamData.teams.map((team) => {
                    return (
                        <div key={team.name} className="my-3">
                            <h2 className="text-xl mb-1 text-center md:text-left">{team.name}</h2>
                            <div className="flex flex-col md:flex-row md:flex-wrap mx-2 md:ml-6">
                                {team.members.map((member) => {
                                    return (
                                        <div key={member.name} className="w-full md:w-1/2 lg:w-1/5 md:px-2 my-3">
                                            <h3 className="font-bold">{member.name}</h3>
                                            {member.affiliation ?
                                                <div className="text-sm whitespace-pre-line">{member.affiliation}</div> : null}
                                            {member.email ?
                                                <div className="text-sm">{member.email}</div> : null}
                                            {member.github ?
                                                <div>
                                                    <span className="mr-1">{githubIcon}</span>
                                                    <ExternalLink href={`https://github.com/${member.github}`} className="text-sm text-blue-600">{member.github}</ExternalLink>
                                                </div> : null}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                <div className="my-3">
                    <h2 className="text-xl mb-1 text-center md:text-left">Special Thanks to:</h2>
                    <div className="mx-2 md:ml-6">
                        <div>Nicole Pereyaslavsky, University of British Columbia.</div>
                        <div>Bioinformatics contributors: E. Erhan, J. Chu, I. Birol, K. Wellman, C. Xu, M. Huss, K. Ha, E. Nawrocki, R. McLaughlin, C. Morgan-Lang, C. Blumberg, and the J. Brister lab.</div>
                        <div>CIC Project Team: A. Rodrigues, S. McMillan, V. Wu, K. Chao, and. C. Kennett.</div>
                        <div>Virological discussion: J. Joy lab, G. Mordecai, J. Taylor, S. Roux, L. Bergner, R. Orton, and D. Streicker.</div>
                    </div>
                    <div className="my-3">
                        <div>Serratus is a <ExternalLink href="https://www.hackseq.com/" className="text-blue-600">hackseqRNA</ExternalLink> initiative. Project support provided kindly by the <ExternalLink href="https://cic.ubc.ca/projects/university-of-british-columbia-discovering-new-coronavirus-species-by-re-analyzing-all-public-rna-sequencing-data/" className="text-blue-600">UBC/AWS Cloud Innovation Center</ExternalLink>.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Team;
