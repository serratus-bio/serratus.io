import React from "react";
import DataSdk from '../SDK/DataSdk';
import LinkButton from "../components/LinkButton";
import {
    downloadIcon,
    externalLinkIcon,
    helpIcon,
    ExternalLink
} from './common';

// definitions
export const queryTypes = ["family", "genbank", "run"];

// color palettes
export const viridisCssGradient = "linear-gradient(90deg, #440154, #482475, #414487, #355f8d, #2a788e, #21908d, #22a884, #42be71, #7ad151, #bddf26, #fce640)" // slight modification of https://bennettfeely.com/cssscales/#viridis


// functions

const dataSdk = new DataSdk();

export const getIdentitySliderLabel = (type) => {
    let typeMap = {
        family: "Average alignment identity (%)",
        genbank: "Alignment identity (%)"
    };
    return typeMap[type];
}

export const getCoverageSliderLabel = (type) => {
    let typeMap = {
        family: "Score (pangenome coverage)",
        genbank: "Coverage"
    };
    return typeMap[type];
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

export const getDataPromise = (type, value, page, itemsPerPage, identityRange, coverageRange) => {
    switch (type) {
        case "family":
            return dataSdk.fetchSraMatchesByFamily(value, page, itemsPerPage, identityRange, coverageRange);
        case "genbank":
            return dataSdk.fetchSraMatchesByAccession(value, page, itemsPerPage, identityRange, coverageRange);
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
            throw new Error("Invalid query parameter value");
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
