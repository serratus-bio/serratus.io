import React from "react";
import DataSdk from '../SDK/DataSdk';
import ReportChart from '../components/ReportChart';
import ReportInfo from "../components/ReportIntro";
import { useLocation } from 'react-router-dom'

const dataSdk = new DataSdk();

const Report = (props) => {
    let currentAccession = new URLSearchParams(props.location.search).get("accession");
    const [pathName, setPathName] = React.useState(useLocation().pathname);
    const [sraAccession, setAccession] = React.useState(currentAccession);
    const [inputAccession, setInputAccession] = React.useState("");
    const [entrezStudyName, setEntrezStudyName] = React.useState("");

    // clicked "Report" on navigation bar
    if (sraAccession && !currentAccession) {
        loadAccessionPage(currentAccession);
    }

    function searchOnKeyUp(e) {
        if (e.keyCode == 13) {
            loadAccessionPage(e.target.value);
        }
        else {
            setInputAccession(e.target.value);
        }
    }

    function searchButtonClick() {
        loadAccessionPage(inputAccession);
    }

    function loadAccessionPage(accession) {
        let newUrl = accession ? `${pathName}?accession=${accession}` : pathName;
        window.location.href = newUrl;
    }

    async function fetchEntrezData() {
        setEntrezStudyName("Loading...")
        console.log("Fetching Entrez data...");
        let entrezStudyName = await dataSdk.tryGetSraStudyName(sraAccession);
        setEntrezStudyName(entrezStudyName);
        console.log(entrezStudyName ? "Done fetching Entrez data." : "Could not load Entrez data.");
    }

    React.useEffect(() => {
        if (!sraAccession) {
            return;
        }
        console.log(`Loading report page for ${sraAccession}.`);
        fetchEntrezData();
    }, [sraAccession]);

    const LinkButton = (props) => {
        let aAttrs = {};
        if (props.newTab) {
            aAttrs = {
                target: "_blank",
                rel: "noopener noreferrer"
            };
        }
        return (
            <button className="bg-gray-300 hover:bg-gray-500 mx-2 py-2 px-4 rounded inline-flex items-center">
                <a className="text-blue-500" {...aAttrs}
                    href={props.link} download={props.download}>
                    {props.text}
                    {props.icon}
                </a>
            </button>
        )
    }

    let downloadIcon = (<svg class="inline fill-current w-4 h-4 ml-1 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>)
    let externalLinkIcon = (<svg class="inline fill-current w-4 h-4 ml-1 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,21H5c-1.1,0-2-0.9-2-2V5c0-1.1,0.9-2,2-2h7v2H5v14h14v-7h2v7C21,20.1,20.1,21,19,21z" /><path d="M21 10L19 10 19 5 14 5 14 3 21 3z" /><path d="M6.7 8.5H22.3V10.5H6.7z" transform="rotate(-45.001 14.5 9.5)" /></svg>)

    let pageLinks = (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-between my-3">
                <LinkButton
                    link={`https://www.ncbi.nlm.nih.gov/sra/?term=${sraAccession}`}
                    text="SRA"
                    icon={externalLinkIcon}
                    newTab={true} />
                <LinkButton
                    link={`https://trace.ncbi.nlm.nih.gov/Traces/sra/?run=${sraAccession}`}
                    text="Trace"
                    icon={externalLinkIcon}
                    newTab={true} />
                <LinkButton
                    link={`https://s3.amazonaws.com/lovelywater/bam/${sraAccession}.bam`}
                    text="BAM"
                    icon={downloadIcon}
                    download={true} />
            </div>
        </div>
    )

    return (
        <div className="flex absolute w-screen h-screen justify-center">
            <img src="/serratus.jpg" alt="serratus mountain" className="hidden sm:block opacity-75 sm:fixed" style={{ objectFit: 'cover', minWidth: '100vh', minHeight: '100vh' }} />
            <div className="flex flex-col justify-center items-center w-full z-10 rounded-lg p-1
                sm:shadow-2xl
                lg:w-3/4 lg:mt-6 lg:bg-blue-400 lg:bg-opacity-25 lg:border lg:border-gray-600">
                <div className="w-full lg:w-5/6 bg-gray-400 border rounded-lg border-gray-600 sm:shadow-xl p-1 z-20 m-1">
                    <div className="flex flex-col items-center z-10 mt-2">
                        <div className="flex-row z-10">
                            <input className="rounded border-2 border-gray-300 px-2 m-1 sm:w-64 focus:border-blue-300 focus:outline-none" type="text" placeholder="Search SRA Run Accession" onKeyUp={searchOnKeyUp} />
                            <button onClick={searchButtonClick} className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4" type="submit">Go</button>
                        </div>
                    </div>
                    {sraAccession ? pageLinks : null}
                    <div className="w-full text-center text-xl">
                        {entrezStudyName ? <div>{sraAccession}: <span className="italic">{entrezStudyName}</span></div> : null}
                    </div>
                </div>
                <div className="w-full lg:w-5/6 flex flex-col flex-1 justify-center items-center bg-gray-400 border rounded-lg border-gray-600 shadow-xl m-1 sm:px-12">
                    <div className="w-full flex flex-col overflow-y-auto" style={{ height: 600 }} id="style-2">
                        {sraAccession ?
                            <ReportChart accession={sraAccession}></ReportChart> :
                            <ReportInfo></ReportInfo>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report;
