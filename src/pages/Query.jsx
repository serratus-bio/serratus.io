import React from "react";
import DataSdk from '../SDK/DataSdk';
import QueryChart from '../components/QueryChart';
import QueryInfo from "../components/QueryIntro";
import LinkButton from "../components/LinkButton";
import { useLocation } from 'react-router-dom'

const dataSdk = new DataSdk();

const Query = (props) => {
    let currentAccession = new URLSearchParams(props.location.search).get("accession");
    const [pathName, setPathName] = React.useState(useLocation().pathname);
    const [genbankAccession, setAccession] = React.useState(currentAccession);
    const [inputAccession, setInputAccession] = React.useState("");
    const [entrezStudyName, setGenBankTitle] = React.useState("");

    // clicked "Report" on navigation bar
    if (genbankAccession && !currentAccession) {
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
        console.log("Fetching Entrez data...");
        let genBankTitle = await dataSdk.tryGetGenBankTitle(genbankAccession);
        setGenBankTitle(genBankTitle);
        console.log(genBankTitle ? "Done fetching Entrez data." : "Could not load Entrez data.");
    }

    React.useEffect(() => {
        if (!genbankAccession) {
            return;
        }
        console.log(`Loading query page for ${genbankAccession}.`);
        fetchEntrezData();
    }, [genbankAccession]);

    let externalLinkIcon = (<svg className="inline fill-current w-4 h-4 ml-1 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,21H5c-1.1,0-2-0.9-2-2V5c0-1.1,0.9-2,2-2h7v2H5v14h14v-7h2v7C21,20.1,20.1,21,19,21z" /><path d="M21 10L19 10 19 5 14 5 14 3 21 3z" /><path d="M6.7 8.5H22.3V10.5H6.7z" transform="rotate(-45.001 14.5 9.5)" /></svg>)

    let pageLinks = (
        <div className="flex flex-col justify-center items-center my-3">
            <LinkButton
                link={`https://www.ncbi.nlm.nih.gov/nuccore/${genbankAccession}`}
                text="GenBank"
                icon={externalLinkIcon}
                newTab={true} />
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
                            <input className="rounded border-2 border-gray-300 px-2 m-1 sm:w-64 focus:border-blue-300 focus:outline-none" type="text" placeholder="Search GenBank Accession" onKeyUp={searchOnKeyUp} />
                            <button onClick={searchButtonClick} className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4" type="submit">Go</button>
                        </div>
                    </div>
                    {genbankAccession ? pageLinks : null}
                    <div className="w-full text-center text-xl">
                        {entrezStudyName ? <div>{genbankAccession}: <span className="italic">{entrezStudyName}</span></div> : null}
                    </div>
                </div>
                <div className="w-full lg:w-5/6 flex flex-col flex-1 justify-center items-center bg-gray-400 border rounded-lg border-gray-600 shadow-xl m-1 sm:px-12">
                    <div className="w-full flex flex-col overflow-y-auto" style={{ height: 600 }} id="style-2">
                        {genbankAccession ?
                            <QueryChart accession={genbankAccession}></QueryChart> :
                            <QueryInfo></QueryInfo>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Query;
