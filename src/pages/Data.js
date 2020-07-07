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
        // data ? 
        //     <div>
        //         <text>HI</text>
        //     </div>
        //     :
        <div className="h-screen flex flex-col items-center bg-blue-500 justify-center">
        {data ? <div>data</div> : <div>no data</div>}
        {heatMap ? <img src={heatMap} className="h-auto w-auto"></img> : <div>{imageError}</div> }
            
            <input onChange={e => setSearchString(e.target.value)}></input>

            <button onClick={() => genSra()} className="h-10 w-24 bg-gray-500" title="get heat">get heat map</button>
            
       
        </div>
    )
}

export default Data

