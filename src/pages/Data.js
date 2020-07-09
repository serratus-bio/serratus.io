import React from "react";
import DataSdk from '../SDK/DataSdk';

const Data = (props) => {
    var sra_accession = new URLSearchParams(props.location.search).get("accession");
    console.log(`SRA Accession: ${sra_accession}`);
    const [data, setData] = React.useState({});
    const [heatMap, setHeatMap] = React.useState();
    const [imageError, setImageError] = React.useState("");
    const [summaryJson, setSummaryJson] = React.useState({});
    const [entrezId, setEntrezId] = React.useState();
    const [entrezStudyName, setEntrezStudyName] = React.useState("");
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

        async function fetchNCBIApiData() {
            let response = await dataSdk.fetchEsearch(sra_accession);
            let parser = new DOMParser();
            let esearchResults = parser.parseFromString(response, 'text/xml');
            let entrezId = esearchResults
                .getElementsByTagName("eSearchResult")[0]
                .getElementsByTagName("IdList")[0]
                .getElementsByTagName("Id")[0]
                .textContent;
            console.log(entrezId);

            response = await dataSdk.fetchEsummary(entrezId);
            let esummaryResults = parser.parseFromString(response, 'text/xml');
            let expXmlText = esummaryResults
                .getElementsByTagName("eSummaryResult")[0]
                .getElementsByTagName("DocSum")[0]
                .getElementsByTagName("Item")[0]
                .textContent;
            expXmlText = '<?xml version="1.0" encoding="UTF-8" ?>' + expXmlText;
            let expXml = parser.parseFromString(expXmlText, 'text/xml');
            let entrezStudyName = expXml
            console.log(response);
            console.log(expXmlText);
            console.log(entrezStudyName);

            if (!ignore) {
                setEntrezId(entrezId);
            }
          }
    
        fetchSerratusApiData();
        fetchNCBIApiData()
        return () => { ignore = true; }
      }, []);

    const studyName = "<name>";

    return (
        <div class="flex flex-wrap">
            <div class="w-full text-center mb-8">
                <div class="text-2xl">{sra_accession} Report Page</div>
            </div>
            <div class="w-2/3"></div>
            <div class="w-1/6">
                <div><a class="text-blue-500" href={`https://www.ncbi.nlm.nih.gov/sra/?term=${sra_accession}`}>SRA Link</a></div>
            </div>
            <div class="w-1/6">
                <div><a class="text-blue-500" href={`https://trace.ncbi.nlm.nih.gov/Traces/sra/?run=${sra_accession}`}>Trace Link</a></div>
            </div>
            {entrezId ? entrezId : <span>Waiting on ESearch</span>}
            <div class="w-full">Study Name: {studyName}</div>
            <div class="w-full">Families: </div>
            <ul>
                {summaryJson.families ?
                    summaryJson.families.map(family => (
                        <li>{family.family}</li>
                    )) : <li>Loading...</li>
                }
            </ul>
            <img src={heatMap} className="p-6 m-6"></img>
        </div>
    )
}

export default Data

