import React from 'react';
import Axios from 'axios';
import DataSdk from '../SDK/DataSdk';

const  Data = (props) => {
    const [searchString, setSearchString] = React.useState("")
    const [data, setData] = React.useState({});
    const [heatMap, setHeatMap] = React.useState();

    const getData = async (searchString) => {
        const dataSdk = new DataSdk();
        const sraData = await dataSdk.getSraByName(searchString); 
        setData(sraData);  
        console.log(sraData); 
    }

    const getImage = async (searchString) => {
        const dataSdk = new DataSdk();
        const img = await dataSdk.getSraHeatMapByName(searchString);
        // .then(response => {
        //     let blob = new Blob(
        //       [response.data], 
        //       { type: response.headers['content-type'] }
        //     )
        //     let image = URL.createObjectURL(blob);
        let sraHeatMap = URL.createObjectURL(img)
        setHeatMap(sraHeatMap)
        console.log(sraHeatMap);
    }
    
    return (
        // data ? 
        //     <div>
        //         <text>HI</text>
        //     </div>
        //     :
        <div className="h-screen flex flex-col items-center bg-blue-500 justify-center">
        {heatMap ? <img src={heatMap} className="h-auto w-auto"></img> : <div>no image</div> }
            
            <input onChange={e => setSearchString(e.target.value)}></input>

            <button onClick={() => getImage(searchString)} className="h-10 w-24 bg-gray-500" title="get heat">get heat map</button>
            
       
        </div>
    )
}

export default Data

