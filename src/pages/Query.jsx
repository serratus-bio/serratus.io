import React from "react";
import DataSdk from '../SDK/DataSdk';
import QueryChart from '../components/QueryChart';
import QueryIntro from "../components/QueryIntro";
import LinkButton from "../components/LinkButton";
import { useLocation } from 'react-router-dom'

const dataSdk = new DataSdk();

const downloadIcon = (<svg className="inline fill-current w-4 h-4 ml-1 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>);
const externalLinkIcon = (<svg className="inline fill-current w-4 h-4 ml-1 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,21H5c-1.1,0-2-0.9-2-2V5c0-1.1,0.9-2,2-2h7v2H5v14h14v-7h2v7C21,20.1,20.1,21,19,21z" /><path d="M21 10L19 10 19 5 14 5 14 3 21 3z" /><path d="M6.7 8.5H22.3V10.5H6.7z" transform="rotate(-45.001 14.5 9.5)" /></svg>);

const queryTypes = ["family", "genbank", "run"];

const placeholderByQueryType = {
    family: "e.g. Coronaviridae",
    genbank: "e.g. EU769558.1",
    run: "e.g. ERR2756788"
}

const fetchTitle = async (type, value) => {
    console.log("Fetching Entrez data...");
    let title = null;
    switch (type) {
        case "genbank":
            title = await dataSdk.tryGetGenBankTitle(value);
            break;
        case "run":
            title = await dataSdk.tryGetSraStudyName(value);
            break;
        default:
    }
    console.log(title ? "Done fetching Entrez data." : "Could not load Entrez data.");
    return title;
}

const InputOption = (props) => {
    return (
        <div className="inline mx-2">
            <input type="radio" name="querytype" value={props.value} checked={props.checked}
                onChange={props.onChange} />
            <span>{props.displayText}</span>
        </div>
    )
}

const Query = (props) => {
    let queryTypeFromParam = null;
    let queryValueFromParam = null;
    var urlParams = new URLSearchParams(props.location.search);
    queryTypes.forEach(queryType => {
        var paramValue = urlParams.get(queryType);
        // TODO: mutually exclusive parameters
        if (paramValue) {
            queryTypeFromParam = queryType;
            queryValueFromParam = paramValue;
        }
    })

    // these values don't change until reload
    const queryTypeStatic = queryTypeFromParam;
    const queryValueStatic = queryValueFromParam;
    const pathNameStatic = useLocation().pathname;

    if (!queryTypeFromParam) { queryTypeFromParam = "family" }  // set default
    const [searchType, setSearchType] = React.useState(queryTypeFromParam);
    const [searchValue, setSearchValue] = React.useState("");
    const [placeholderText, setPlaceholderText] = React.useState(placeholderByQueryType[searchType]);
    const [pageTitle, setPageTitle] = React.useState();

    // clicked "Query" on navigation bar
    if (queryValueStatic && !queryValueFromParam) {
        loadQueryPage(null);
    }

    function searchOnKeyUp(e) {
        if (e.keyCode === 13) {
            loadQueryPage(e.target.value);
        }
        else {
            setSearchValue(e.target.value);
        }
    }

    function loadQueryPage(searchValue) {
        if (searchValue && !searchType) {
            console.log("no query type selected");
            return;
        }
        let newUrl = searchValue ? `${pathNameStatic}?${searchType}=${searchValue}` : pathNameStatic;
        window.location.href = newUrl;
    }

    function queryTypeChange(e) {
        let queryType = e.target.value;
        setPlaceholderText(placeholderByQueryType[queryType]);
        setSearchType(queryType);
    }

    React.useEffect(() => {
        if (!queryValueStatic) {
            return;
        }
        console.log(`Loading query result page for ${queryValueStatic}.`);
        fetchTitle(queryTypeStatic, queryValueStatic).then(setPageTitle);
    }, [queryTypeStatic, queryValueStatic]);

    const pageLinksByType = {
        family: (
            <div className="flex flex-col justify-center items-center my-2">
                <LinkButton
                    link={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=${queryValueStatic}`}
                    text="Taxonomy Browser"
                    icon={externalLinkIcon}
                    newTab={true} />
            </div>
        ),
        genbank: (
            <div className="flex flex-col justify-center items-center my-2">
                <LinkButton
                    link={`https://www.ncbi.nlm.nih.gov/nuccore/${queryValueStatic}`}
                    text="GenBank"
                    icon={externalLinkIcon}
                    newTab={true} />
            </div>
        ),
        run: (
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-between my-2">
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
                                <InputOption value="family" displayText="Family" checked={searchType === "family"} onChange={queryTypeChange} />
                                <InputOption value="genbank" displayText="GenBank" checked={searchType === "genbank"} onChange={queryTypeChange} />
                                <InputOption value="run" displayText="SRA Run" checked={searchType === "run"} onChange={queryTypeChange} />
                            </div>
                            <input className="rounded border-2 border-gray-300 px-2 m-1 sm:w-64 focus:border-blue-300 focus:outline-none" type="text" placeholder={placeholderText} onKeyUp={searchOnKeyUp} />
                            <button onClick={() => loadQueryPage(searchValue)} className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4" type="submit">Go</button>
                        </div>
                    </div>
                    <div className="w-full text-center">
                        {queryValueStatic ?
                            <div>
                                <div className="text-xl font-bold">{queryValueStatic}</div>
                                {pageTitle ?
                                    <div className="text-lg italic">{pageTitle}</div> : null}
                            </div> : null
                        }
                    </div>
                    {queryValueStatic ? pageLinksByType[queryTypeStatic] : null}
                </div>
                <div className="w-full lg:w-5/6 flex flex-col flex-1 justify-center items-center bg-gray-400 border rounded-lg border-gray-600 shadow-xl m-1 sm:px-12">
                    <div className="w-full flex flex-col overflow-y-auto" style={{ height: 600 }} id="style-2">
                        {queryValueStatic ?
                            <QueryChart type={queryTypeStatic} value={queryValueStatic} /> :
                            <QueryIntro />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Query;
