import React from "react";
import DataSdk from '../SDK/DataSdk';
import Heatmap from '../components/Heatmap';
import { useLocation } from 'react-router-dom'

const Report = (props) => {
    var accessionFromParam = new URLSearchParams(props.location.search).get("accession");
    const [sraAccession, setAccession] = React.useState(accessionFromParam);
    const [inputAccession, setInputAccession] = React.useState("");
    const [entrezStudyName, setEntrezStudyName] = React.useState("");
    const pathName = useLocation().pathname;
    const dataSdk = new DataSdk();

    async function fetchEntrezData(ignore) {
        setEntrezStudyName("Loading...")
        console.log("Fetching Entrez data...");
        let entrezStudyName = await dataSdk.getEntrezData(sraAccession);
        if (!ignore) {
            setEntrezStudyName(entrezStudyName);
            console.log("Done fetching Entrez data.");
        }
    }

    React.useEffect(() => {
        if (!sraAccession) {
            return;
        }
        console.log(`Loading report page for ${sraAccession}.`);
        let ignore = false;
        fetchEntrezData(ignore);
        return () => { ignore = true; }
    }, []);

    const redirect = accession => e => {
        setAccession(accession)
        window.location.href = `${pathName}?accession=${accession}`
    }

    let searchBox = (
        <div className="flex flex-col items-center z-10 mt-2">
            <div className="flex-row z-10">
                <input className="rounded border-2 border-gray-300 px-2 m-1" type="text" placeholder="Enter SRA Accession ID" onChange={e => setInputAccession(e.target.value)} />
                <button onClick={redirect(inputAccession)} className="rounded bg-blue-500 text-white font-bold py-1 px-4" type="submit">Go</button>
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
        <div className="h-screen w-screen flex flex-col items-center justify-center ">
            <img src="/serratus.jpg" className="invisible sm:visible opacity-75 sm:fixed" style={{objectFit: 'cover', minWidth: '100vh', minHeight: '100vh'}} />
            <div class="w-3/4 h-full flex flex-col justify-center items-center z-10 bg-blue-400 border border-gray-600 rounded-lg shadow-2xl bg-opacity-25 p-1 mt-10 mb-32 ">
                <div className="w-5/6 bg-gray-400 border rounded-lg border-gray-600 shadow-xl p-1 z-20 m-1">
                    {searchBox}
                    {sraAccession ? pageLinks : <div></div> }
                        <div class="w-full text-center text-xl">
                            {entrezStudyName ? <div className="text-xl italic">Study: {entrezStudyName}</div> : <div></div>}
                        </div>
                </div>
                <div className="flex flex-col flex-1 justify-center items-center w-5/6 bg-gray-400 border rounded-lg border-gray-600 shadow-xl m-1 pl-24">
                    <div class="w-full flex flex-col overflow-y-auto" style={{height: 600}} id="style-2">
                        {sraAccession ? <Heatmap accession={sraAccession}></Heatmap> : <div></div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report;
