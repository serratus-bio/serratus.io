import React from "react";
import LinkButton from '../../../common/LinkButton';
import {
    ExternalLink,
    externalLinkIcon,
    downloadIcon,
    helpIcon,
} from '../../../common/Helpers';
import {
    tryGetGenBankTitle,
    tryGetSraStudyName,
} from './EntrezApiCalls';
import {
    getMatchesDownloadUrl,
    fetchPagedMatches,
    fetchSraRun,
} from './SerratusApiCalls';

export const getPageLinks = (searchLevel, searchLevelValue) => {
    if (searchLevel === "family") {
        var link = `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=${searchLevelValue}`;
        var text = "Taxonomy Browser"
        if (searchLevelValue === "AMR") {
            link = "https://card.mcmaster.ca/";
            text = "Database Website";
        }
        return (
            <div>
                <LinkButton
                    link={link}
                    text={text}
                    icon={externalLinkIcon}
                    newTab={true} />
            </div>
        )
    }
    if (searchLevel === "genbank") {
        return (
            <div>
                <LinkButton
                    link={`https://www.ncbi.nlm.nih.gov/nuccore/${searchLevelValue}`}
                    text="GenBank"
                    icon={externalLinkIcon}
                    newTab={true} />
            </div>
        )
    }
    if (searchLevel === "run") {
        return (
            <div>
                <LinkButton
                    link={`https://www.ncbi.nlm.nih.gov/sra/?term=${searchLevelValue}`}
                    text="SRA"
                    icon={externalLinkIcon}
                    newTab={true} />
                <LinkButton
                    link={`https://trace.ncbi.nlm.nih.gov/Traces/sra/?run=${searchLevelValue}`}
                    text="Trace"
                    icon={externalLinkIcon}
                    newTab={true} />
                <LinkButton
                    link={`${window.location.origin}/jbrowse?bam=${searchLevelValue}`}
                    text="JBrowse"
                    icon={externalLinkIcon}
                    newTab={true} />
                <LinkButton
                    link={`https://s3.amazonaws.com/lovelywater/bam/${searchLevelValue}.bam`}
                    text=".bam"
                    icon={downloadIcon}
                    download={true} />
                <LinkButton
                    link={`https://s3.amazonaws.com/lovelywater/summary2/${searchLevelValue}.summary`}
                    text=".summary"
                    icon={downloadIcon}
                    download={true} />
                <div className="inline-flex -ml-1">
                    <ExternalLink href="https://github.com/ababaian/serratus/wiki/.summary-Reports">{helpIcon}</ExternalLink>
                </div>
            </div>
        )
    }
}

export const getTitle = async (searchLevel, searchLevelValue, searchLevelValueCorrected) => {
    console.log("Fetching Entrez data...");
    let title = null;
    switch (searchLevel) {
        case "family":
            if (searchLevelValue === "AMR") {
                title = "The Comprehensive Antibiotic Resistance Database (CARD)";
            }
            break;
        case "genbank":
            if (searchLevelValue !== searchLevelValueCorrected) {
                title = await tryGetGenBankTitle(searchLevelValueCorrected);
                title = `[AMR] ${title}`;
            }
            else {
                title = await tryGetGenBankTitle(searchLevelValue);
            }
            break;
        case "run":
            title = await tryGetSraStudyName(searchLevelValue);
            break;
        default:
    }
    console.log(title ? "Done fetching Entrez data." : "Could not load Entrez data.");
    return title;
}

export const getDataPromise = (searchLevel, searchLevelValue, page, perPage, identityRange, coverageRange) => {
    if (searchLevel === "run") {
        return fetchSraRun(searchLevelValue);
    }
    return fetchPagedMatches(searchLevel, searchLevelValue, page, perPage, identityRange, coverageRange);
}

export const DownloadButton = ({searchLevel, searchLevelValue, identityLims, coverageLims}) => {
    const downloadUrl = getMatchesDownloadUrl(searchLevel, searchLevelValue, identityLims, coverageLims);
    return (
        <div className="flex justify-center">
            <LinkButton
                link={downloadUrl}
                text="Download Matches"
                icon={downloadIcon}
                download={true} />
        </div>
    )
}
