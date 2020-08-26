import React from "react";
import DataSdk from '../SDK/DataSdk';
import LinkButton from "../components/LinkButton";
import {
    downloadIcon,
    externalLinkIcon,
    helpIcon,
    ExternalLink
} from '../helpers/common';

const dataSdk = new DataSdk();

const getPlaceholder = (type) => {
    let typePlaceholderMap = {
        family: "e.g. Coronaviridae",
        genbank: "e.g. EU769558.1",
        run: "e.g. ERR2756788"
    };
    return typePlaceholderMap[type];
}

const getPageLinks = (type, value, loc) => {
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
                    link={`${window.location.origin}/jbrowse?bam=${value}&loc=${loc}`}
                    text="JBrowse"
                    icon={externalLinkIcon}
                    newTab={true} />
                <LinkButton
                    link={`https://s3.amazonaws.com/lovelywater/bam/${value}.bam`}
                    text="BAM"
                    icon={downloadIcon}
                    download={true} />
                <LinkButton
                    link={`https://s3.amazonaws.com/lovelywater/summary/${value}.summary`}
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

const getTitle = async (type, value, valueCorrected) => {
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
                title = await dataSdk.tryGetGenBankTitle(valueCorrected);
                title = `[AMR] ${title}`;
            }
            else {
                title = await dataSdk.tryGetGenBankTitle(value);
            }
            break;
        case "run":
            title = await dataSdk.tryGetSraStudyName(value);
            break;
        default:
    }
    console.log(title ? "Done fetching Entrez data." : "Could not load Entrez data.");
    return title;
}

const getDataPromise = (type, value, page, itemsPerPage) => {
    switch (type) {
        case "family":
            return dataSdk.fetchSraHitsByFamily(value, page, itemsPerPage);
        case "genbank":
            return dataSdk.fetchSraHitsByAccession(value, page, itemsPerPage);
        case "run":
            return dataSdk.fetchSraRun(value, page);
        default:
    }
}

const InputOption = (props) => {
    return (
        <div className={props.className}>
            <input type="radio" name="querytype" value={props.value} checked={props.checked}
                onChange={props.onChange} />
            <span className="ml-1">{props.displayText}</span>
        </div>
    )
}

export { getPlaceholder, getPageLinks, getTitle, getDataPromise, InputOption };
