import React from "react";
import DataSdk from '../SDK/DataSdk';
import QueryChart from '../components/QueryChart';
import ReportChart from '../components/ReportChart';
import QueryInfo from "../components/QueryIntro";
import LinkButton from "../components/LinkButton";
import { useLocation } from 'react-router-dom'

const dataSdk = new DataSdk();

const downloadIcon = (<svg className="inline fill-current w-4 h-4 ml-1 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>);
const externalLinkIcon = (<svg className="inline fill-current w-4 h-4 ml-1 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,21H5c-1.1,0-2-0.9-2-2V5c0-1.1,0.9-2,2-2h7v2H5v14h14v-7h2v7C21,20.1,20.1,21,19,21z" /><path d="M21 10L19 10 19 5 14 5 14 3 21 3z" /><path d="M6.7 8.5H22.3V10.5H6.7z" transform="rotate(-45.001 14.5 9.5)" /></svg>);

const queryTypeInfo = {
    family: {
        placeholderText: "e.g. Coronaviridae"
    },
    genbank: {
        placeholderText: "e.g. EU769558.1"
    },
    run: {
        placeholderText: "e.g. ERR2756788"
    }
}

const Query = (props) => {
    let currentGenbank = new URLSearchParams(props.location.search).get("genbank");
    let currentRun = new URLSearchParams(props.location.search).get("run");
    let queryTypeFromParam = null;
    let queryValueFromParam = null;
    if (currentGenbank) {
        queryTypeFromParam = "genbank";
        queryValueFromParam = currentGenbank;
    }
    else if (currentRun) {
        queryTypeFromParam = "run";
        queryValueFromParam = currentRun;
    }
    // TODO: mutually exclusive parameters

    // these values don't change until reload
    const [queryTypeStatic, setQueryTypeStatic] = React.useState(queryTypeFromParam);
    const [queryValueStatic, setQueryValueStatic] = React.useState(queryValueFromParam);
    const [pathNameStatic, setPathNameStatic] = React.useState(useLocation().pathname);

    if (!queryTypeFromParam) { queryTypeFromParam = "genbank" }  // set default
    const [searchType, setSearchType] = React.useState(queryTypeFromParam);
    const [searchValue, setSearchValue] = React.useState("");
    const [placeholderText, setPlaceholderText] = React.useState(queryTypeInfo[searchType].placeholderText);
    const [pageTitle, setPageTitle] = React.useState("");

    // clicked "Query" on navigation bar
    if (queryValueStatic && !queryValueFromParam) {
        loadQueryPage(null);
    }

    const pageLinksByType = {
        genbank: (
            <div className="flex flex-col justify-center items-center my-3">
                <LinkButton
                    link={`https://www.ncbi.nlm.nih.gov/nuccore/${queryValueStatic}`}
                    text="GenBank"
                    icon={externalLinkIcon}
                    newTab={true} />
            </div>
        ),
        run: (
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-between my-3">
                    <LinkButton
                        link={`https://www.ncbi.nlm.nih.gov/sra/?term=${queryValueStatic}`}
                        text="SRA"
                        icon={externalLinkIcon}
                        newTab={true} />
                    <LinkButton
                        link={`https://trace.ncbi.nlm.nih.gov/Traces/sra/?run=${queryValueStatic}`}
                        text="Trace"
                        icon={externalLinkIcon}
                        newTab={true} />
                    <LinkButton
                        link={`https://s3.amazonaws.com/lovelywater/bam/${queryValueStatic}.bam`}
                        text="BAM"
                        icon={downloadIcon}
                        download={true} />
                </div>
            </div>
        )
    }
    
    const chartByType = {
        genbank: <QueryChart accession={queryValueStatic}></QueryChart>,
        run: <ReportChart accession={queryValueStatic}></ReportChart>
    }

    function searchOnKeyUp(e) {
        if (e.keyCode == 13) {
            loadQueryPage(e.target.value);
        }
        else {
            setSearchValue(e.target.value);
        }
    }

    function searchButtonClick() {
        loadQueryPage(searchValue);
    }

    function loadQueryPage(searchValue) {
        if (searchValue && !searchType) {
            console.log("no query type selected");
            return;
        }
        let newUrl = searchValue ? `${pathNameStatic}?${searchType}=${searchValue}` : pathNameStatic;
        window.location.href = newUrl;
    }

    async function fetchTitle() {
        console.log("Fetching Entrez data...");
        let title = null;
        console.log(queryTypeStatic);
        switch (queryTypeStatic) {
            case "genbank":
                title = await dataSdk.tryGetGenBankTitle(queryValueStatic);
                break;
            case "run":
                title = await dataSdk.tryGetSraStudyName(queryValueStatic);
                break;
        }
        setPageTitle(title);
        console.log(title ? "Done fetching Entrez data." : "Could not load Entrez data.");
    }

    React.useEffect(() => {
        if (!queryValueStatic) {
            return;
        }
        console.log(`Loading query result page for ${queryValueStatic}.`);
        fetchTitle();
    }, [queryValueStatic]);

    let queryTypeChange = e => {
        let queryType = e.target.value;
        setPlaceholderText(queryTypeInfo[queryType].placeholderText);
        setSearchType(queryType);
    }

    return (
        <div className="flex absolute w-screen h-screen justify-center">
            <img src="/serratus.jpg" alt="serratus mountain" className="hidden sm:block opacity-75 sm:fixed" style={{ objectFit: 'cover', minWidth: '100vh', minHeight: '100vh' }} />
            <div className="flex flex-col justify-center items-center w-full z-10 rounded-lg p-1
                sm:shadow-2xl
                lg:w-3/4 lg:mt-6 lg:bg-blue-400 lg:bg-opacity-25 lg:border lg:border-gray-600">
                <div className="w-full lg:w-5/6 bg-gray-400 border rounded-lg border-gray-600 sm:shadow-xl p-1 z-20 m-1">
                    <div className="flex flex-col items-center z-10 mt-2">
                        <div className="items-center z-10">
                            <div>
                                <input type="radio" name="querytype" value="genbank" checked={searchType == "genbank"}
                                    onChange={queryTypeChange} />
                                GenBank
                                <input type="radio" name="querytype" value="run" checked={searchType == "run"}
                                    onChange={queryTypeChange} />
                                SRA Run
                            </div>
                            <input className="rounded border-2 border-gray-300 px-2 m-1 sm:w-64 focus:border-blue-300 focus:outline-none" type="text" placeholder={placeholderText} onKeyUp={searchOnKeyUp} />
                            <button onClick={searchButtonClick} className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4" type="submit">Go</button>
                        </div>
                    </div>
                    {queryValueStatic ? pageLinksByType[queryTypeStatic] : null}
                    <div className="w-full text-center text-xl">
                        {queryValueStatic ? <div>{queryValueStatic}<span className="italic">: {pageTitle}</span></div> : null}
                    </div>
                </div>
                <div className="w-full lg:w-5/6 flex flex-col flex-1 justify-center items-center bg-gray-400 border rounded-lg border-gray-600 shadow-xl m-1 sm:px-12">
                    <div className="w-full flex flex-col overflow-y-auto" style={{ height: 600 }} id="style-2">
                        {queryValueStatic ?
                            chartByType[queryTypeStatic] :
                            <QueryInfo></QueryInfo>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Query;
