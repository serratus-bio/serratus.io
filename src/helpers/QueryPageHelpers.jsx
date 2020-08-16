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

export const getPlaceholder = (type) => {
    let typePlaceholderMap = {
        family: "e.g. Coronaviridae",
        genbank: "e.g. EU769558.1",
        run: "e.g. ERR2756788"
    };
    return typePlaceholderMap[type];
}

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

export const getDataPromise = (type, value, page, itemsPerPage, identityRange) => {
    switch (type) {
        case "family":
            return dataSdk.fetchSraHitsByFamily(value, page, itemsPerPage, identityRange);
        case "genbank":
            return dataSdk.fetchSraHitsByAccession(value, page, itemsPerPage, identityRange);
        case "run":
            return dataSdk.fetchSraRun(value, page);
        default:
    }
}

export const InputOption = (props) => {
    return (
        <div className={props.className}>
            <input type="radio" name="querytype" value={props.value} checked={props.checked}
                onChange={props.onChange} />
            <span className="ml-1">{props.displayText}</span>
        </div>
    )
}

// filtering

export const parseRange = (rangeStr, bounds) => {
    // parse
    rangeStr = rangeStr.slice(1, rangeStr.length - 1);
    var [low, high] = rangeStr.split("-").map((s) => {
        var intVal = +s;
        if (isNaN(intVal)) {
            throw "Invalid query parameter value"
        }
        return intVal;
    });

    // constrict
    var [min, max] = bounds;
    if (low < min) low = min;
    if (high > max) high = max;
    if (low > max) low = max;
    if (high < min) high = min;

    return [low, high];
}

export const constructRangeStr = (begin, end) => {
    return `[${begin}-${end}]`;
}
