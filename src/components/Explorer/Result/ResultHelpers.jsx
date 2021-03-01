import React from "react";
import LinkButton from './LinkButton';
import {
    ExternalLink,
    externalLinkIcon,
    downloadIcon,
    helpIcon,
} from '../../../CommonHelpers';
import {
    tryGetGenBankTitle,
    tryGetSraStudyName,
} from './EntrezApiCalls';
import {
    getMatchesDownloadUrl,
    fetchPagedMatches,
    fetchSraRun,
} from './SerratusApiCalls';

export const getPageLinks = (type, value) => {
    if (type === "family") {
        var link = `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=${value}`;
        var text = "Taxonomy Browser"
        if (value === "AMR") {
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
    if (type === "genbank") {
        return (
            <div>
                <LinkButton
                    link={`https://www.ncbi.nlm.nih.gov/nuccore/${value}`}
                    text="GenBank"
                    icon={externalLinkIcon}
                    newTab={true} />
            </div>
        )
    }
    if (type === "run") {
        return (
            <div>
                <LinkButton
                    link={`https://www.ncbi.nlm.nih.gov/sra/?term=${value}`}
                    text="SRA"
                    icon={externalLinkIcon}
                    newTab={true} />
                <LinkButton
                    link={`https://trace.ncbi.nlm.nih.gov/Traces/sra/?run=${value}`}
                    text="Trace"
                    icon={externalLinkIcon}
                    newTab={true} />
                <LinkButton
                    link={`${window.location.origin}/jbrowse?bam=${value}`}
                    text="JBrowse"
                    icon={externalLinkIcon}
                    newTab={true} />
                <LinkButton
                    link={`https://s3.amazonaws.com/lovelywater/bam/${value}.bam`}
                    text=".bam"
                    icon={downloadIcon}
                    download={true} />
                <LinkButton
                    link={`https://s3.amazonaws.com/lovelywater/summary2/${value}.summary`}
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

export const getTitle = async (type, value, valueCorrected) => {
    console.log("Fetching Entrez data...");
    let title = null;
    switch (type) {
        case "family":
            if (value === "AMR") {
                title = "The Comprehensive Antibiotic Resistance Database (CARD)";
            }
            break;
        case "genbank":
            if (value !== valueCorrected) {
                title = await tryGetGenBankTitle(valueCorrected);
                title = `[AMR] ${title}`;
            }
            else {
                title = await tryGetGenBankTitle(value);
            }
            break;
        case "run":
            title = await tryGetSraStudyName(value);
            break;
        default:
    }
    console.log(title ? "Done fetching Entrez data." : "Could not load Entrez data.");
    return title;
}

export const getDataPromise = (type, value, page, perPage, identityRange, coverageRange) => {
    if (type === "run") {
        return fetchSraRun(value);
    }
    return fetchPagedMatches(type, value, page, perPage, identityRange, coverageRange);
}

export const DownloadButton = (props) => {
    const {queryType, queryValue, identityLims, coverageLims} = props;
    const downloadUrl = getMatchesDownloadUrl(queryType, queryValue, identityLims, coverageLims);
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
