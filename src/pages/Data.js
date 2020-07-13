import React from "react";
import DataSdk from '../SDK/DataSdk';
import Visual from "../components/Visual";
import Heatmap from '../components/Heatmap';

const Data = (props) => {
    var accessionFromParam = new URLSearchParams(props.location.search).get("accession");
    const [sraAccession, setAccession] = React.useState(accessionFromParam);
    const [inputAccession, setInputAccession] = React.useState("");
    const [heatMap, setHeatMap] = React.useState();
    const [summaryJson, setSummaryJson] = React.useState({});
    const [entrezStudyName, setEntrezStudyName] = React.useState("");
    const dataSdk = new DataSdk();

    async function fetchSerratusApiData(ignore) {
        console.log("Fetching Serratus API data...");
        let summaryJson = await dataSdk.fetchAccessionJSON(sraAccession);
        let heatMapData = await dataSdk.getSraHeatMapByName(sraAccession);
        let sraHeatMap = URL.createObjectURL(heatMapData)
        if (!ignore) {
          setSummaryJson(summaryJson);
          setHeatMap(sraHeatMap);
          console.log("Done fetching Serratus API data.");
        }
    }

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
        fetchSerratusApiData(ignore);
        fetchEntrezData(ignore);
        return () => { ignore = true; }
    }, []);

    const redirect = accession => e => {
        setAccession(accession)
        console.log(`/Data?accession=${accession}`);
        window.location.href = `/Data?accession=${accession}`
    }

    let searchBox = (
        <div class="flex flex-col items-center z-10 mt-2">
            <div class="flex-row z-10">
                <input class="rounded border-2 border-gray-300 px-2 m-1" type="text" placeholder="Enter SRA Accession ID" onChange={e => setInputAccession(e.target.value)} />
                <button onClick={redirect(inputAccession)} class="rounded bg-blue-500 text-white font-bold py-1 px-4" type="submit">Go</button>
            </div>
        </div>
    )

    let reportContent = (
        <div class="flex flex-wrap">
            <div class="w-full text-center mb-8">
                <div class="text-2xl">{sraAccession} Report Page</div>
            </div>
            <div id="external-links" class="flex w-full mb-3">
                <div class="w-1/4"></div>
                <div class="w-1/6">
                    <div><a class="text-blue-500" target="_blank" rel="noopener noreferrer" href={`https://www.ncbi.nlm.nih.gov/sra/?term=${sraAccession}`}>SRA Link</a></div>
                </div>
                <div class="w-1/6">
                    <div><a class="text-blue-500" target="_blank" rel="noopener noreferrer" href={`https://trace.ncbi.nlm.nih.gov/Traces/sra/?run=${sraAccession}`}>Trace Link</a></div>
                </div>
                <div class="w-1/3">
                    <div><a class="text-blue-500" href={`https://s3.amazonaws.com/lovelywater/bam/${sraAccession}.bam`} download>Download BAM File</a></div>
                </div>
            </div>
            <div class="w-full">Study: {entrezStudyName}</div>
            <div class="w-1/2">Families:
                <ul>
                    {summaryJson.families ?
                        summaryJson.families.map(family => (
                            <li key={family.family}>{family.family}</li>
                        )) : <li>Loading...</li>
                    }
                </ul>
            </div>
            <div class="w-1/2">
                <img src={heatMap} className="p-6"></img>
            </div>
        </div>
    )

    let pageLinks = (
        <div className="flex flex-col justify-center items-center">
            <div id="external-links" class="flex flex-row w-1/2 justify-between">
                <div><a class="text-blue-500" target="_blank" rel="noopener noreferrer" href={`https://www.ncbi.nlm.nih.gov/sra/?term=${sraAccession}`}>SRA Link</a></div>
                <div><a class="text-blue-500" target="_blank" rel="noopener noreferrer" href={`https://trace.ncbi.nlm.nih.gov/Traces/sra/?run=${sraAccession}`}>Trace Link</a></div>
                <div><a class="text-blue-500" href={`https://s3.amazonaws.com/lovelywater/bam/${sraAccession}.bam`} download>Download BAM File</a></div>
            </div>
        </div>
    )

    return (
        <div>
            <div className="h-screen w-screen flex flex-col items-center justify-center">
            <img src="/serratus.jpg" className="invisible sm:visible opacity-75 sm:fixed" style={{objectFit: 'cover', minWidth: '100vh', minHeight: '100vh'}} />
                <div class="w-3/4 h-full flex flex-col justify-center items-center z-10 bg-blue-400 border border-gray-600 rounded-lg shadow-2xl bg-opacity-25 mt-10 mb-32">
                    <div className="w-5/6 bg-gray-400 h-32 border rounded-lg border-gray-600 shadow-xl p-1 -mt-2 z-20 m-1">
                        {searchBox}
                        {sraAccession ? pageLinks : <div></div> }
                        <div class="w-full text-center text-xl">
                            {entrezStudyName ? <div className="text-xl italic">Study: {entrezStudyName}</div> : <div></div>}
                        </div>
                    </div>
                <div className="flex h-64 flex-col justify-end items-center w-5/6 bg-gray-400 border rounded-lg border-gray-600 shadow-xl m-1">
                    <div class="w-600 h-64 overflow-y-auto">
                        {sraAccession ? <Heatmap accession={sraAccession}></Heatmap> : <div></div>}
                    </div>
                </div>
                <div className="flex flex-col h-64 w-5/6 bg-gray-400 border rounded-lg border-gray-600 shadow-xl overflow-y-auto m-1">
                    <div className="text-center text-xl border-gray-800 border-1 p-1 italic">Families:</div>
                        <div className="overflow-y-auto">
                            <div className="h-full ">
                                {summaryJson.families ?
                                    summaryJson.families.map(family => (
                                    <div key={family.family} className="flex flex-row justify-between border rounded-md bg-gray-300 border-gray-700 p-2 italic m-1 cursor-pointer">
                                            <div>{family.family} </div>
                                            <div> Cvg: {family.cvg} </div>
                                            <div> Score: {family.score} </div>
                                            <div> PctId: {family.pctid} </div>
                                    </div>
                                    )) : <div>{sraAccession ? "Loading..." : ""}</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Data

