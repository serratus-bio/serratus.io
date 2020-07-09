import React, { useEffect, useRef, useState } from 'react';
import { select } from 'd3';

const Visual = (props) => {
    const svgRef = useRef();
    const [data, setData] = useState([100, 25, 35, 45, 85]);
    
    useEffect(() => {
        const svg = select(svgRef.current)
        svg.selectAll("circle").data(data)
            .join("circle")
                .attr("r", value => value)
                .attr("cx", value => value * 2)
                .attr("cy", value => value * 2)
                .attr("stroke", "red")   
    }, [data]);

    return (
        <div>
            <svg ref={svgRef}></svg>
            <br/>
            <button className="p-2" onClick={() => setData(data.map(value => value + 5))}>
                Enlarge
            </button>
            <button className="p-2" onClick={() => setData(data.filter(value => value < 45))}>
                filter
            </button>
        </div>
    )
}


export default Visual