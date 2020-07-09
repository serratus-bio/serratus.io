import React from "react";
import DataSdk from '../SDK/DataSdk';

const Data = (props) => {
    var accessionFromParam = new URLSearchParams(props.location.search).get("accession");
    const [sraAccession, setAccession] = React.useState(accessionFromParam);
    const [inputAccession, setInputAccession] = React.useState("");
    const [heatMap, setHeatMap] = React.useState();
    const [summaryJson, setSummaryJson] = React.useState({});
    const [entrezStudyName, setEntrezStudyName] = React.useState("Loading...");
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
        console.log(`/Data?accession=${accession}`);
        window.location.href = `/Data?accession=${accession}`
    }

    let searchBox = (
        <div class="flex flex-col items-center">
            <div class="flex-row">
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

    return (
        // <div class="m-6">
        //     {searchBox}
        //     {sraAccession ? reportContent : <div></div> }
        // </div>
        <div>
            <div className="h-screen w-screen flex flex-col items-center justify-center">
        {/* <Visual></Visual> */}
            <img src="/serratus.jpg" className="invisible sm:visible opacity-75 sm:fixed" style={{objectFit: 'cover', minWidth: '100vh', minHeight: '100vh'}} />
                <div class="w-2/3 h-full mt-24 mb-24 flex flex-col justify-center items-center z-10 bg-white rounded-lg shadow-2xl">
                    <div className="w-4/5 bg-gray-500 h-full"></div>
                    <div className="w-4/5 bg-gray-600 h-full"></div>
                    <div className="w-4/5 bg-gray-700 h-full"></div>
                {/* <div class="flex flex-col justify-center items-center">
                    {data.sra 
                    ? 
                    <div>SRA: {data.sra}</div> 
                    : 
                    <div>SRA: </div>}
                    {heatMap ? 
                    <img src={heatMap} className="h-full w-full p-6 m-6"></img>
                    : 
                    <div>{imageError}</div> }
                    <div class="flex flex-col justify-center items-center">
                        <input class="p-2 border-black border-2 rounded-lg" onChange={e => setSearchString(e.target.value)}></input>
                        <button class="" onClick={() => genSra()} className="h-10 w-32 border-black border-2 rounded-lg" title="get heat">Search</button>
                    </div>
                    <a src={`https://www.ncbi.nlm.nih.gov/sra/?term=${data.sra}`}></a>
                </div> */}
                </div>
            </div>
        </div>
       
    )
}

export default Data

