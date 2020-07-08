import React from 'react';
import Axios from 'axios';
import DataSdk from '../SDK/DataSdk';
import { get } from 'react-scroll/modules/mixins/scroller';

const  Data = (props) => {
    const [searchString, setSearchString] = React.useState("")
    const [data, setData] = React.useState({});
    const [heatMap, setHeatMap] = React.useState();
    const [imageError, setImageError] = React.useState("");

    const genSra = () => {
        getData(searchString)
        getImage(searchString)
    }

    const getData = async (searchString) => {
        const dataSdk = new DataSdk();
        const sraData = await dataSdk.getSraByName(searchString); 
        setData(sraData);  
        console.log(sraData); 
    }

    const getImage = async (searchString) => {
        const dataSdk = new DataSdk();
        try {
            const img = await dataSdk.getSraHeatMapByName(searchString);
            let sraHeatMap = URL.createObjectURL(img)
            setHeatMap(sraHeatMap)
            console.log(sraHeatMap);
        }
        catch {
            setImageError("No heat map for this SRA")
        }
    }
    
    return (
        <div className="h-screen w-screen flex flex-col items-center bg-blue-500 justify-center p-6">
            <div class="w-1/2 h-64 flex flex-col justify-center">

           
            <div class="flex flex-col justify-center items-center">
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
            </div>
            </div>
        </div>
    )
}

export default Data

