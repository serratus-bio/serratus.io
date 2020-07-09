import React from "react";
import DataSdk from '../SDK/DataSdk';

const Data = (props) => {
    var sra_accession = new URLSearchParams(props.location.search).get("accession");
    console.log(`SRA Accession: ${sra_accession}`);
    const [data, setData] = React.useState({});
    const [heatMap, setHeatMap] = React.useState();
    const [imageError, setImageError] = React.useState("");
    const [summaryJson, setSummaryJson] = React.useState({});
    const [entrezStudyName, setEntrezStudyName] = React.useState("Loading...");
    const dataSdk = new DataSdk();

    React.useEffect(() => {
        let ignore = false;
    
        async function fetchSerratusApiData() {
          const summaryJson = await dataSdk.fetchAccessionJSON(sra_accession);
          const heatMapData = await dataSdk.getSraHeatMapByName(sra_accession);
          let sraHeatMap = URL.createObjectURL(heatMapData)
          if (!ignore) {
            setSummaryJson(summaryJson);
            setHeatMap(sraHeatMap);
          }
        }

        async function fetchEntrezData() {
            let entrezStudyName = await dataSdk.getEntrezData(sra_accession);
            if (!ignore) {
                setEntrezStudyName(entrezStudyName);
            }
          }
    
        fetchSerratusApiData();
        fetchEntrezData();

        return () => { ignore = true; }
      }, []);

    return (
        <div class="flex flex-wrap m-6">
            <div class="w-full text-center mb-8">
                <div class="text-2xl">{sra_accession} Report Page</div>
            </div>
            <div id="external-links" class="flex w-full mb-3">
                <div class="w-1/4"></div>
                <div class="w-1/6">
                    <div><a class="text-blue-500" target="_blank" rel="noopener noreferrer" href={`https://www.ncbi.nlm.nih.gov/sra/?term=${sra_accession}`}>SRA Link</a></div>
                </div>
                <div class="w-1/6">
                    <div><a class="text-blue-500" target="_blank" rel="noopener noreferrer" href={`https://trace.ncbi.nlm.nih.gov/Traces/sra/?run=${sra_accession}`}>Trace Link</a></div>
                </div>
                <div class="w-1/3">
                    <div><a class="text-blue-500" href={`https://s3.amazonaws.com/lovelywater/bam/${sra_accession}.bam`} download>Download BAM File</a></div>
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
}

export default Data

