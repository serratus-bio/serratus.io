import React from "react";
import DataSdk from '../SDK/DataSdk';
import LinkButton from "../components/LinkButton";

const dataSdk = new DataSdk();

const downloadIcon = (<svg className="inline fill-current w-4 h-4 ml-1 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>);

const externalLinkIcon = (<svg className="inline fill-current w-4 h-4 ml-1 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,21H5c-1.1,0-2-0.9-2-2V5c0-1.1,0.9-2,2-2h7v2H5v14h14v-7h2v7C21,20.1,20.1,21,19,21z" /><path d="M21 10L19 10 19 5 14 5 14 3 21 3z" /><path d="M6.7 8.5H22.3V10.5H6.7z" transform="rotate(-45.001 14.5 9.5)" /></svg>);

const getPlaceholder = (type) => {
    let typePlaceholderMap = {
        family: "e.g. Coronaviridae",
        genbank: "e.g. EU769558.1",
        run: "e.g. ERR2756788"
    };
    return typePlaceholderMap[type];
}

const getPageLinks = (type, value) => {
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

const getDataPromise = (type, value) => {
    switch (type) {
        case "family":
            return dataSdk.fetchSraHitsByFamily(value);
        case "genbank":
            return dataSdk.fetchSraHitsByAccession(value);
        case "run":
            return dataSdk.fetchSraRun(value);
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
