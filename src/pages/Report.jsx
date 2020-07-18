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
        setAccession(accession);
        let newUrl = accession ? `${pathName}?accession=${accession}` : pathName;
        window.location.href = newUrl;
    }

    async function fetchEntrezData() {
        setEntrezStudyName("Loading...")
        console.log("Fetching Entrez data...");
        let entrezStudyName = await dataSdk.tryGetEntrezData(sraAccession);
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

    let searchBox = (
        <div className="flex flex-col items-center z-10 mt-2">
            <div className="flex-row z-10">
                <input className="rounded border-2 border-gray-300 px-2 m-1" type="text" placeholder="Enter SRA Run Accession" onKeyUp={searchOnKeyUp} />
                <button onClick={searchButtonClick} className="rounded bg-blue-500 text-white font-bold py-1 px-4" type="submit">Go</button>
            </div>
        </div>
    )

    let pageLinks = (
        <div className="flex flex-col justify-center items-center">
            <div id="external-links" className="flex flex-row w-1/2 justify-between">
                <div><a className="text-blue-500" target="_blank" rel="noopener noreferrer" href={`https://www.ncbi.nlm.nih.gov/sra/?term=${sraAccession}`}>SRA Link</a></div>
                <div><a className="text-blue-500" target="_blank" rel="noopener noreferrer" href={`https://trace.ncbi.nlm.nih.gov/Traces/sra/?run=${sraAccession}`}>Trace Link</a></div>
                <div><a className="text-blue-500" href={`https://s3.amazonaws.com/lovelywater/bam/${sraAccession}.bam`} download>Download BAM File</a></div>
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
                    {searchBox}
                    {sraAccession ? pageLinks : <div></div>}
                    <div className="w-full text-center text-xl">
                        {entrezStudyName ? <div>{sraAccession}: <span className="italic">{entrezStudyName}</span></div> : <div></div>}
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
